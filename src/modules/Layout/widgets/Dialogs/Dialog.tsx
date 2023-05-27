import { Dialog, DialogProps } from "@mui/material";

interface CustomDialogProps extends DialogProps {
  children?: React.ReactNode | string;
}

const CustomDialog = ({ children, ...props }: CustomDialogProps) => {
  return (
    <>
      <Dialog
        className={
          "max-w-xl max-h-4xl rounded-2xl bg-white shadow text-center flex w-full relative overflow-hidden justify-center items-center flex-1"
        }
        {...props}
      >
        {children}
      </Dialog>
    </>
  );
};

export default CustomDialog;
