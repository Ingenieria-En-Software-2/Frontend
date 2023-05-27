import Dialog from "modules/Layout/widgets/Dialogs/Dialog";
import * as React from "react";
import { useEffect } from "react";

import ExceptionContent from "./ExceptionContent";

type ExceptionHandlerProps = {
  onClose?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  open: boolean;
  icon: React.ReactNode;
  title: string | null;
  description?: React.ReactNode;
  btnText?: string | null;
};

export default function ExceptionHandlerModal({
  open,
  icon,
  title,
  description,
  btnText,
  onClose,
}: ExceptionHandlerProps) {
  const [hide, setHide] = React.useState<boolean>(false);

  useEffect(() => {
    if (!hide) return;
    let timer = setTimeout(() => {
      setHide(false);
      onClose?.();
    }, 250);
    return () => clearTimeout(timer);
  }, [hide]);

  return (
    <Dialog open={open} onClose={() => setHide(true)}>
      <div className={"p-12 flex flex-col items-center"}>
        <ExceptionContent icon={icon} title={title} setHide={setHide} description={description} btnText={btnText} />
      </div>
    </Dialog>
  );
}
