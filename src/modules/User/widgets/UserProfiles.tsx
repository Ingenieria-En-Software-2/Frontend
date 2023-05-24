import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import { DeleteButton, EditButton } from "components/Buttons";
import Title from "components/Title";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

// ------------------ Formularios ------------------
const formLabels: Array<Column> = [
  { id: "username", label: "Usuario" },
  { id: "names", label: "Nombres" },
  { id: "surnames", label: "Apellidos" },
  { id: "role", label: "Rol" },
  { id: "usertype", label: "Tipo de Usuario" },
];

function AddUser() {
  const handleAdd = () => {
    console.log("agregando...");
  };

  return (
    <FormControl sx={{ my: 2 }}>
      {formLabels.map((formLabel) => (
        <TextField autoFocus required id={formLabel.id} label={formLabel.label} sx={{ my: 2 }} />
      ))}
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleAdd}>
        Enviar
      </Button>
    </FormControl>
  );
}

function EditUser(user: any) {
  const handleEdit = () => {
    console.log("editando...", user);
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
          defaultValue={user[formLabel.id]}
          sx={{ my: 2 }}
        />
      ))}
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleEdit}>
        Enviar
      </Button>
    </FormControl>
  );
}

function DeleteUser(user: any) {
  const handleDelete = () => {
    console.log("eliminando...", user);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box>¿Estás seguro de eliminar al usuario "{user.username}"?</Box>
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleDelete}>
        Eliminar
      </Button>
    </Box>
  );
}

// ------------------ Vista Principal ------------------
const UserProfiles = () => {
  const columns: Array<Column> = [
    { id: "username", label: "Usuario", align: "center" },
    { id: "names", label: "Nombres" },
    { id: "surnames", label: "Apellidos" },
    { id: "role", label: "Rol", align: "center" },
    { id: "usertype", label: "Tipo de Usuario", align: "center" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  function createData(username: string, names: string, surnames: string, role: string, usertype: string) {
    // Lista de acciones donde guarda el icono y la función a ejecutar
    const actions = [
      {
        id: "1",
        label: "Editar usuario",
        button: EditButton,
        form: EditUser,
      },
      {
        id: "2",
        label: "Eliminar usuario",
        button: DeleteButton,
        form: DeleteUser,
      },
    ];

    return { username, names, surnames, role, usertype, actions };
  }

  const rows = [
    createData("admin", "Admin", "One", "Analista de Cuentas", "Interno"),
    createData("user", "User", "Two", "Analista de Cuentas", "Externo"),
    createData("user2", "User", "Three", "Cuentahabiente", "Mixto"),
    createData("user3", "User", "Four", "Analista de Cuentas", "Interno"),
    createData("user4", "User", "Five", "Cuentahabiente", "Externo"),
  ];

  return (
    <div className="main-container">
      <DashboardWrapper className="main-container">
          <DashboardLayoutBasic>
            <Box sx={{ width: "100%" }}>
              <Title title="Perfiles de Usuarios" />
              <DataTable title="Detalles de Usuario" columns={columns} rows={rows} addForm={<AddUser />} />
            </Box>
          </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default UserProfiles;
