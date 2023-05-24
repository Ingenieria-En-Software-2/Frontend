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
      <h2>{title}</h2>
      <p>{description}</p>
      {btnText && (
        <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={() => setHide(true)}>
          {btnText}
        </Button>
      )}
    </>
  );
}
