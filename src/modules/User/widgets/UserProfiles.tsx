import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import Title from "components/Title";
import { EditButton, DeleteButton } from "components/Buttons";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { 
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
} from "services/dbApi";

// ------------------ Formularios ------------------
const textInputs: Array<Column> = [
  { id: "username", label: "Usuario" },
  { id: "names", label: "Nombres" },
  { id: "surnames", label: "Apellidos" },
];

const userTypes = [
  { id: 1, description: "Interno" },
  { id: 2, description: "Externo" },
];

/**
 * Form to insert a new user in the database
 * @returns 
 */
function AddUser({roles}: any) {
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
    usertype: userTypes[0].description,
    role: roles[0].id,
  });

  // Add user to database
  const [createUser, { dataUser, errorUser, isLoadingUser }] = useCreateUserMutation();
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

  return (
    <FormControl sx={{ my: 2 }}>
      <Grid container spacing={2}>
        {textInputs.map((formLabel) => (
          <Grid item xs={6}>
            <TextField 
              autoFocus 
              required 
              autoComplete="off"
              sx={{ my: 1, width: "100%" }}
              id={formLabel.id} 
              label={formLabel.label} 
              value={inputs[formLabel.id as keyof typeof inputs]}
              onChange={(
                  e: React.ChangeEvent<HTMLInputElement>
                ) => setInputs({ ...inputs, [formLabel.id]: e.target.value }
              )}
            />
          </Grid>
        ))}
        {/* User Types */}
        <Grid item xs={6}>
          <TextField
            id="usertype"
            select
            label="Tipo de Usuario"
            sx={{ my: 1, width: "100%" }}
            SelectProps={{
              native: true,
            }}
            value={inputs.usertype}
            onChange={(e) => setInputs({ ...inputs, usertype: e.target.value })}
          >
            {userTypes.map((option) => ( 
              <option key={option.id} value={option.description}>
                {option.description}
              </option>
            ))}
          </TextField>
          </Grid>
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

/**
 * Form to edit a user profile in the database
 * @param param0 
 * @returns 
 */
function EditUser({user, roles}: any) {
  const [inputs, setInputs] = useState<{
    username: string;
    names: string;
    surnames: string;
    usertype: string;
    role: number;
  }>({
    username: user.login,
    names: user.name,
    surnames: user.lastname,
    usertype: user.user_type,
    role: user.role_id,
  });

  // Update user in database
  const [updateUser, { data, error, isLoading }] = useUpdateUserMutation();
  const handleEdit = () => {
    console.log("editando...", inputs);
    updateUser({
      id: user.id,
      login: inputs.username,
      password: "test",
      name: inputs.names,
      lastname: inputs.surnames,
      user_type: inputs.usertype,
      role_id: inputs.role,
    });
  };

  return (
    <FormControl sx={{ my: 2 }}>
      <Grid container spacing={2}>
      {textInputs.map((formLabel) => (
        <Grid item xs={6}> 
          <TextField
            key={formLabel.id}
            autoFocus
            required
            autoComplete="off"
            sx={{ my: 1, width: "100%" }}
            id={formLabel.id}
            label={formLabel.label}
            defaultValue={inputs[formLabel.id as keyof typeof inputs]}
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) => setInputs({ ...inputs, [formLabel.id]: e.target.value }
            )}
          />
        </Grid>
      ))}
      {/* User Types */}
      <Grid item xs={6}>
        <TextField
          id="usertype"
          select
          label="Tipo de Usuario"
          sx={{ my: 1, width: "100%" }}
          SelectProps={{
            native: true,
          }}
          value={inputs.usertype}
          onChange={(e) => setInputs({ ...inputs, usertype: e.target.value })}
        >
          {userTypes.map((option) => ( 
            <option key={option.id} value={option.description}>
              {option.description}
            </option>
          ))}
        </TextField>
        </Grid>
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
      <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleEdit}>
        Enviar
      </Button>
    </FormControl>
  );
}


/**
 * Dialog to confirm the deletion of a user
 * @param param0 
 * @returns 
 */
function DeleteUser({user}: any) {
  const [deleteUser, { data, error, isLoading }] = useDeleteUserMutation();
  const handleDelete = () => {
    deleteUser(user.id);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box>¿Estás seguro de eliminar al usuario "{user.login}"?</Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleDelete}>
          Eliminar
        </Button>
      </Box>
    </Box>
  );
}

/**
 * Actions buttons for each row
 * @param row 
 * @returns 
 */
function ActionsPerUserProfile(row: any, roles: any) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* Edit button */}
      <React.Fragment>
        {EditButton("Editar usuario", <EditUser user={row} roles={roles} />)}
      </React.Fragment>
      
      {/* Delete button */}
      <React.Fragment>
        {DeleteButton("Eliminar usuario", <DeleteUser user={row} />)}
      </React.Fragment>
    </Grid>
  )
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

  // Get roles from database
  const [roles, setRoles] = useState([]); 
  const { data: dataRoles, error: errorRoles, isLoading: isLoadingRoles } =  useGetRolesQuery();
    
  // Get users from database
  const [rows, setRows] = useState([]);
  const { data, error, isLoading } =  useGetUsersQuery(undefined);

  useEffect(() => {
    if (dataRoles) {
      setRoles(dataRoles.items);
      console.log("Roles cargados", dataRoles.items);
    }

    if (data && dataRoles) {
      const rowsWithActions = data.items.map((row: any) => {
        const role_description = roles.find((role: any) => role.id === row.role_id)?.description;
        const rowWithActions = {
          id: row.id,
          username: row.login,
          names: row.name,
          surnames: row.lastname,
          role: role_description,
          role_id: row.role_id,
          usertype: row.user_type,
          actions: ActionsPerUserProfile(row, roles),
        };
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [data, dataRoles]);

  // If it is loading, display a loading message
  if (isLoadingRoles || isLoading) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <DashboardWrapper /* className="main-container" */>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Perfiles de Usuarios" />
            <DataTable title="Detalles de Usuario" columns={columns} rows={rows} addForm={<AddUser roles={roles}/>} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default UserProfiles;
