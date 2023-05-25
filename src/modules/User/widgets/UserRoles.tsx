import { useState } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import { EditButton, DeleteButton } from "components/Buttons";
import Title from "components/Title";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

// ------------------ Formularios ------------------
const formLabels = [{ id: "description", label: "Descripción" }];

function AddUserRole() {
  // Guarda los inputs del formulario
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });

  const handleInputChange = (event: any) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.id]: event.target.value,
    }));
  };

  // Agrega el rol
  const handleAdd = () => {
    console.log("agregando...", inputs);
  };

  return (
    <FormControl sx={{ my: 2 }}>
      {formLabels.map((formLabel) => (
        <TextField
          autoFocus
          required
          id={formLabel.id}
          label={formLabel.label}
          sx={{ my: 2 }}
          onChange={handleInputChange}
          value={inputs[formLabel.id as keyof typeof inputs]}
        />
      ))}
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleAdd}>
        Enviar
      </Button>
    </FormControl>
  );
}

function EditUserRole(role: any) {
  // Guarda los inputs del formulario
  const [inputs, setInputs] = useState({ description: role.description });

  // Actualiza el estado de los inputs
  const handleInputChange = (event: any) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.id]: event.target.value,
    }));
  };

  const handleEdit = () => {
    console.log("editando...", inputs);
  };

  return (
    <FormControl sx={{ my: 2 }}>
      {formLabels.map((formLabel) => (
        <TextField
          key={formLabel.id}
          autoFocus
          required
          id={formLabel.id}
          label={formLabel.label}
          defaultValue={inputs[formLabel.id as keyof typeof inputs]}
          sx={{ my: 2 }}
          onChange={handleInputChange}
          value={inputs[formLabel.id as keyof typeof inputs]}
        />
      ))}
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleEdit}>
        Enviar
      </Button>
    </FormControl>
  );
}

function DeleteUserRole(role: any) {
  const handleDelete = () => {
    console.log("eliminando...", role);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box>¿Estás seguro de eliminar el rol "{role.description}"?</Box>
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleDelete}>
        Eliminar
      </Button>
    </Box>
  );
}

// ------------------ Vista Principal ------------------
const UserRoles = () => {
  const columns: Array<Column> = [
    { id: "id", label: "ID", align: "center" },
    { id: "description", label: "Descripción" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  // Lista de acciones con el botón y el formulario
  const actions = [
    {
      id: "1",
      label: "Editar rol",
      button: EditButton,
      form: EditUserRole,
    },
    {
      id: "2",
      label: "Eliminar rol",
      button: DeleteButton,
      form: DeleteUserRole,
    },
  ];

  function createData(id: string, description: string) {
    return { id, description, actions };
  }

  const rows = [
    createData("1", "Gerente General"),
    createData("2", "Gerente de Operaciones"),
    createData("3", "Sub-Gerente de Cuentas"),
    createData("4", "Analista de Cuentas"),
    createData("5", "Administrador de Sistemas"),
    createData("6", "Cuentahabiente"),
  ];

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Roles de Usuarios" />
            <DataTable columns={columns} rows={rows} addForm={<AddUserRole />} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default UserRoles;
