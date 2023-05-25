import { Button } from "@mui/material";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";

type ExceptionHandlerProps = {
  icon: React.ReactNode;
  title: string | null;
  description?: React.ReactNode;
  btnText?: string | null;
  setHide: Dispatch<SetStateAction<boolean>>;
};

export default function ExceptionContent({ icon, title, description, btnText, setHide }: ExceptionHandlerProps) {
  return (
    <>
      {icon}
      <h2 className={"m-0 font-bold text-4xl text-blue-600"}>{title}</h2>
      <p className={"mt-2"}>{description}</p>
      {btnText && (
        <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={() => setHide(true)}>
          {btnText}
        </Button>
      )}
    </>
  );
}
