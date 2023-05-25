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

export default function ExceptionHandler({ open, icon, title, description, btnText, onClose }: ExceptionHandlerProps) {
  const [hide, setHide] = React.useState<boolean>(false);

  useEffect(() => {
    if (!hide) return;
    let timer = setTimeout(() => {
      setHide(false);
      onClose?.();
    }, 250);
    return () => clearTimeout(timer);
  }, [hide]);

  return open ? (
    <div className={`${"absolute top-0 left-0 w-full h-full bg-white rounded-2xl z-[9999] animate-sweetAppear"} ${hide ? "pointer-events-none	animate-sweetDisappear" : ""}`}>
      <div className={`${"absolute w-full h-full flex flex-col items-center justify-center"}`}>
        <ExceptionContent icon={icon} title={title} setHide={setHide} description={description} btnText={btnText} />
      </div>
    </div>
  ) : (
    <></>
  );
}
