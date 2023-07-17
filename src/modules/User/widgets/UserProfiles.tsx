import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import Title from "components/Title";
import { Modal, iconStyle, buttonStyle } from "components/Buttons";
import { AddIcon, EditIcon, DeleteIcon } from "components/ux/Icons";
import { InfoAlert } from "components/Alerts";

import { Role, User } from "services/types";

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


import axios from "axios";
import Cookies from "js-cookie";


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

type AddProps = {
  roles: Array<Role>;
  users: Array<User>;
};

/**
 * Modal Form to insert a new user in the database
 * @returns
 */
function AddUser({ roles, users }: AddProps) {
  const title = "Agregar usuario";
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
    role: roles.length > 0 ? roles[0].id : -1,
  });
  const [formErrorMessages, setFormErrorMessages] = useState<Array<React.ReactElement>>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);

    // Clean inputs and error messages
    setInputs({
      username: "",
      names: "",
      surnames: "",
      usertype: userTypes[0].description,
      role: roles.length > 0 ? roles[0].id : -1,
    });

    setFormErrorMessages([]);
  };

  // Add user to database
  const [createUser, { error, isLoading }] = useCreateUserMutation();

  const handleAddChanged = async (e) => {
    e.preventDefault();

    // Verify if username is unique
    if (users.some((user) => user.login === inputs.username)) {
      setFormErrorMessages([<InfoAlert message="El nombre de usuario ya existe" />]);
      return;
    }

    const URL_USER_ADD_BACKEND = `${import.meta.env.VITE_AUTH_URL}/register`
    try {
        const response = await axios({
            method: 'post',
            url: URL_USER_ADD_BACKEND,
            data: {
                    'login': inputs.username,
                    'password': "Ab123456#",
                    'name': inputs.names,
                    'lastname': inputs.surnames,
                    'person_type' : 'legal',
                    'user_type': inputs.usertype,
                    'role_id': inputs.role,
                  },
            headers: {
                Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
            }
        });
        console.log(response);
        return response
      } catch (error) {
        console.log(error)
      }

    handleCloseModal();

  }

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verify if username is unique
    if (users.some((user) => user.login === inputs.username)) {
      setFormErrorMessages([<InfoAlert message="El nombre de usuario ya existe" />]);
      return;
    }

    createUser({
      login: inputs.username,
      password: "test",
      name: inputs.names,
      lastname: inputs.surnames,
      user_type: inputs.usertype,
      role_id: inputs.role,
    });

    // TO-DO: error and loading pages
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{"message" in error && error.message}</div>;

    // Close modal
    handleCloseModal();
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenModal} sx={buttonStyle}>
        <AddIcon className={iconStyle} />
      </Button>
      <Modal
        open={open}
        handleClose={handleCloseModal}
        title={title}
        content={
          <FormControl sx={{ my: 2 }} component="form" onSubmit={handleAddChanged}>
            {/* Error Messages */}
            {formErrorMessages.map((message) => (
              <Box>{message}</Box>
            ))}
            <Grid container spacing={2}>
              {textInputs.map((formLabel) => (
                <Grid item xs={6} key={formLabel.id}>
                  <TextField
                    autoFocus
                    required
                    autoComplete="off"
                    sx={{ my: 1, width: "100%" }}
                    id={formLabel.id}
                    label={formLabel.label}
                    value={inputs[formLabel.id as keyof typeof inputs]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputs({ ...inputs, [formLabel.id]: e.target.value })
                    }
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
              onChange={(e) => setInputs({ ...inputs, role: e.target.value as unknown as number })}
            >
              {roles.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </TextField>
            <Button sx={{ mt: 2, backgroundColor: "#e0f2fe" }} type="submit">
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

type EditProps = {
  user: User;
  roles: Array<Role>;
  users: Array<User>;
};

/**
 * Modal Form to edit a user profile in the database
 * @param param0
 * @returns
 */
function EditUser({ user, roles, users }: EditProps) {
  const title = `Editar usuario "${user.login}"`;
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
  const [formErrorMessages, setFormErrorMessages] = useState<Array<React.ReactElement>>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => {
    setOpen(false);
    setFormErrorMessages([]);
  };

  // Update user in database (not same id)
  const [updateUser] = useUpdateUserMutation();

  const handleEditChanged = async (e) => {
    e.preventDefault();

    // Verify if username is unique
    if (users.some((u) => u.login === inputs.username && user.login !== inputs.username)) {
      setFormErrorMessages([<InfoAlert message="El nombre de usuario ya existe" />]);
      return;
    }

    const URL_USER_ADD_BACKEND = `${import.meta.env.VITE_AUTH_URL}/register`
    try {
      const response = await axios({
          method: 'get',
          url: URL_USER_ADD_BACKEND,
          params: {
                  'login': inputs.username,
                  'password': "Ab123456#",
                  'name': inputs.names,
                  'lastname': inputs.surnames,
                  'person_type' : 'legal',
                  'user_type': inputs.usertype,
                  'role_id': inputs.role,
                },
          headers: {
              Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
          }
      });
      console.log(response);
    } catch (error) {
      console.log(error)
    }
    // Update inputs
    setInputs({
      username: inputs.username,
      names: inputs.names,
      surnames: inputs.surnames,
      usertype: inputs.usertype,
      role: inputs.role,
    });
    handleCloseModal();
  }

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verify if username is unique
    if (users.some((u) => u.login === inputs.username && user.login !== inputs.username)) {
      setFormErrorMessages([<InfoAlert message="El nombre de usuario ya existe" />]);
      return;
    }

    updateUser({
      id: user.id,
      login: inputs.username,
      password: "test",
      name: inputs.names,
      lastname: inputs.surnames,
      user_type: inputs.usertype,
      role_id: inputs.role,
    });

    // Update inputs
    setInputs({
      username: inputs.username,
      names: inputs.names,
      surnames: inputs.surnames,
      usertype: inputs.usertype,
      role: inputs.role,
    });

    handleCloseModal();
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenModal} sx={buttonStyle}>
        <EditIcon className={iconStyle} />
      </Button>
      <Modal
        open={open}
        handleClose={handleCloseModal}
        title={title}
        content={
          <FormControl sx={{ my: 2 }} component="form" onSubmit={handleEditChanged}>
            {/* Error Messages */}
            {formErrorMessages.map((message) => (
              <Box>{message}</Box>
            ))}
            <Grid container spacing={2}>
              {textInputs.map((formLabel) => (
                <Grid item xs={6} key={formLabel.id}>
                  <TextField
                    key={formLabel.id}
                    autoFocus
                    required
                    autoComplete="off"
                    sx={{ my: 1, width: "100%" }}
                    id={formLabel.id}
                    label={formLabel.label}
                    defaultValue={inputs[formLabel.id as keyof typeof inputs]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputs({ ...inputs, [formLabel.id]: e.target.value })
                    }
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
              onChange={(e) => setInputs({ ...inputs, role: e.target.value as unknown as number })}
            >
              {roles.map((option: any) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </TextField>
            <Button sx={{ mt: 2, backgroundColor: "#e0f2fe" }} type="submit">
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

type DeleteProps = {
  user: User;
};

/**
 * Dialog to confirm the deletion of a user
 * @param param0
 * @returns
 */
function DeleteUser({ user }: DeleteProps) {
  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = `Eliminar usuario "${user.login}"`;

  const [deleteUser, { error, isLoading }] = useDeleteUserMutation();

  const handleDeleteChanged = async () => {
    const URL_USER_ADD_BACKEND = `${import.meta.env.VITE_AUTH_URL}/register`
    try {
      const response = await axios({
          method: 'put',
          url: URL_USER_ADD_BACKEND,
          params: {
                  'id': user.id,
                },
          headers: {
              Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
          }
      });
      console.log(response);
    } catch (error) {
      console.log(error)
    }

    handleCloseModal();
  }

  const handleDelete = () => {
    deleteUser(user.id);

    // TO-DO: error and loading pages
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{"message" in error && error.message}</div>;

    // Close modal
    handleCloseModal();
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenModal} sx={buttonStyle}>
        <DeleteIcon className={iconStyle} />
      </Button>
      <Modal
        open={open}
        handleClose={handleCloseModal}
        title={title}
        content={
          <Box sx={{ my: 2 }}>
            <Box>¿Estás seguro de eliminar al usuario "{user.login}"?</Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button sx={{ mt: 2, backgroundColor: "#e0f2fe" }} onClick={handleDeleteChanged}>
                Eliminar
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
}

/**
 * Actions buttons for each row
 * @param row
 * @returns
 */
function ActionsPerUserProfile(row: any, roles: Array<Role>, users: Array<User>) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* Edit button */}
      <EditUser user={row} roles={roles} users={users} />

      {/* Delete button */}
      <DeleteUser user={row} />
    </Grid>
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

  // Get roles from database
  const [roles, setRoles]: any = useState([]);
  const { data: dataRoles, isLoading: isLoadingRoles } = useGetRolesQuery(undefined);

  // Get users from database
  const [rows, setRows]: any = useState([]);
  const [users, setUsers]: any = useState([]);
  const { data, error, isLoading } = useGetUsersQuery(undefined);

  useEffect(() => {
    if (dataRoles) setRoles(dataRoles.items);

    if (data && dataRoles) {
      setUsers(data.items);
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
          actions: ActionsPerUserProfile(row, roles, users),
        };
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [data, dataRoles, roles]);

  // If it is loading, display a loading message
  if (isLoadingRoles || isLoading) return <div>Loading...</div>;

  const errorMessage = error ? "No existen usuarios" : "";

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Perfiles de Usuarios" />
            <DataTable
              title="Detalles de Usuario"
              columns={columns}
              rows={rows}
              addForm={<AddUser roles={roles} users={users} />}
              error={errorMessage}
            />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default UserProfiles;
