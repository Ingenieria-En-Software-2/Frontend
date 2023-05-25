import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import Title from "components/Title";
import { EditButton, DeleteButton, ActionsButtons } from "components/Buttons";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { 
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetRoleByIdQuery,
} from "services/dbApi";

// ------------------ Formularios ------------------
const formLabels: Array<Column> = [
  { id: "username", label: "Usuario" },
  { id: "names", label: "Nombres" },
  { id: "surnames", label: "Apellidos" },
  { id: "usertype", label: "Tipo de Usuario" },
];

function AddUser() {
  const [inputs, setInputs] = useState<{
    username: string;
    names: string;
    surnames: string;
    usertype: string;
    role: number;
  }>({
    username: "",
    names: "",
    surnames: "",
    usertype: "",
    role: 1,
  });
  const [createUser, { dataUser, errorUser, isLoadingUser }] = useCreateUserMutation();

  // Add user to database
  const handleAdd = () => {
    console.log("agregando...", inputs);
    createUser({
      login: inputs.username,
      password: "test",
      name: inputs.names,
      lastname: inputs.surnames,
      user_type: inputs.usertype,
      role_id: inputs.role,
    });
  };

  // Get roles from database
  const { data, error, isLoading } =  useGetRolesQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const roles = data.items;

  return (
    <FormControl sx={{ my: 2 }}>
      <Grid container>
        {formLabels.map((formLabel) => (
          <Grid item xs={6}> 
            <TextField 
              autoFocus 
              required 
              id={formLabel.id} 
              label={formLabel.label} 
              sx={{ my: 1 }} 
              value={inputs[formLabel.id as keyof typeof inputs]}
              onChange={(
                  e: React.ChangeEvent<HTMLInputElement>
                ) => setInputs({ ...inputs, [formLabel.id]: e.target.value }
              )}
            />
          </Grid>
        ))}
      </Grid>
      <TextField
        id="role"
        select
        label="Rol"
        sx={{ my: 2 }}
        SelectProps={{
          native: true,
        }}
        value={inputs.role}
        onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
      >
        {roles.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
      </TextField>
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

  // const { data, error, isLoading } =  useGetRolesQuery();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  // const roles = data.items;

  return (
    <FormControl sx={{ my: 2 }}>
      <Grid container>
      {formLabels.map((formLabel) => (
        <Grid item xs={6}> 
          <TextField
            key={formLabel.id}
            autoFocus
            required
            id={formLabel.id}
            label={formLabel.label}
            defaultValue={user[formLabel.id]}
            sx={{ my: 2 }}
          />
        </Grid>
      ))}
      </Grid>
      {/* <TextField
        id="role"
        select
        label="Rol"
        sx={{ my: 2 }}
        SelectProps={{
          native: true,
        }}
      >
        {roles.map((option) => (
          <option key={option.id} value={option.id} selected={option.id === user.role}>
            {option.description}
          </option>
        ))}
      </TextField> */}
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

  // Actions to be displayed in the table
  const actions = [
    {
      id: "1",
      title: "Editar usuario",
      button: EditButton,
      form: EditUser,
    },
    {
      id: "2",
      title: "Eliminar usuario",
      button: DeleteButton,
      form: DeleteUser,

    },
  ];

  const [rows, setRows] = useState([]);
  const { data, error, isLoading } =  useGetUsersQuery(undefined);

  // Add actions to the rows
  useEffect(() => {
    if (data) {
      const rowsWithActions = data.items.map((row: any) => {
        const rowWithActions = {
          id: row.id,
          username: row.login,
          names: row.name,
          surnames: row.lastname,
          role: row.role_id,
          usertype: row.user_type,
          actions: ActionsButtons(row, actions)
        };
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [data]);

  // If there is an error, display a message
  if (error) return <div>Error: {error.message}</div>;

  // If it is loading, display a loading message
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <DashboardWrapper /* className="main-container" */>
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
