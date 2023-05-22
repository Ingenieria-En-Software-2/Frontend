import * as React from "react";
import Button from "@mui/material/Button";
import AlertDialog from "./AlertDialog";
import { AddIcon, EditIcon, DeleteIcon } from "components/ux/Icons";

const buttonStyle = {
  ml: 1,
  borderRadius: "4px",
  border: "none",
  height: "40px",
  maxWidth: "40px",
  minWidth: "40px",
  backgroundColor: "#e0e7ff",
  "&:hover": { border: "1px solid #a5b4fc", backgroundColor: "#a5b4fc" },
};

const iconStyle = "text-gray-700 hover:text-gray-500";

function AddButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyle}>
        <AddIcon className={iconStyle} />
      </Button>
      <AlertDialog open={open} handleClose={handleClose} title="Agregar" content="TO-DO FORMULARIO DE AGREGACIÓN" />
    </div>
  );
}

function DeleteButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyle}>
        <DeleteIcon className={iconStyle} />
      </Button>
      <AlertDialog
        open={open}
        handleClose={handleClose}
        title="Eliminar"
        content="¿Está seguro que desea eliminar este registro?"
      />
    </div>
  );
}

function EditButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={buttonStyle}>
        <EditIcon className={iconStyle} />
      </Button>
      <AlertDialog open={open} handleClose={handleClose} title="Editar" content="TO-DO FORMULARIO DE EDICIÓN" />
    </div>
  );
}

export { AddButton, DeleteButton, EditButton };
