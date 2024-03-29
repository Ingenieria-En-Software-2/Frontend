import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { AddIcon, EditIcon, DeleteIcon } from "components/ux/Icons";

const buttonStyle = {
  ml: 1,
  borderRadius: "4px",
  border: "none",
  height: "40px",
  maxWidth: "40px",
  minWidth: "40px",
  backgroundColor: "#e0f2fe",
  "&:hover": { border: "1px solid #93c5fd", backgroundColor: "#93c5fd" },
};

const iconStyle = "text-gray-700 hover:text-gray-500";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: JSX.Element;
};

function Modal({ open, handleClose, title, content }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

type ModalButtonProps = {
  title: string;
  content: JSX.Element;
  icon: JSX.Element;
};

function ModalButton({ title, content, icon }: ModalButtonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyle}>
        {icon}
      </Button>
      <Modal open={open} handleClose={handleClose} title={title} content={content} />
    </Box>
  );
}

function AddButton(title: string, content: JSX.Element) {
  return <ModalButton title={title} content={content} icon={<AddIcon className={iconStyle} />} />;
}

function EditButton(title: string, content: JSX.Element) {
  return <ModalButton title={title} content={content} icon={<EditIcon className={iconStyle} />} />;
}

function DeleteButton(title: string, content: JSX.Element) {
  return <ModalButton title={title} content={content} icon={<DeleteIcon className={iconStyle} />} />;
}

export { AddButton, EditButton, DeleteButton, Modal, buttonStyle, iconStyle };
