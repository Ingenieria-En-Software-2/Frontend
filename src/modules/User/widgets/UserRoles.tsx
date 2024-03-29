import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import Title from "components/Title";
import { Modal, iconStyle, buttonStyle } from "components/Buttons";
import { AddIcon, EditIcon, DeleteIcon } from "components/ux/Icons";
import { InfoAlert } from "components/Alerts";

import { Role } from "services/types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { useGetRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from "services/dbApi";

// ------------------ Formularios ------------------
const formLabels: Array<Column> = [{ id: "description", label: "Descripción" }];

type AddProps = {
  roles: Array<Role>;
};

/**
 * Modal Form to insert a new role in the database
 * @returns
 */
function AddUserRole({ roles }: AddProps) {
  const title = "Agregar rol";
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });
  const [formErrorMessages, setFormErrorMessages] = useState<Array<React.ReactElement>>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);

    // Clean inputs and error messages
    setInputs({ description: "" });
    setFormErrorMessages([]);
  };

  // Add rol to database
  const [createRole, { error, isLoading }] = useCreateRoleMutation();
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verify if role is unique
    if (roles.some((role) => role.description === inputs.description)) {
      setFormErrorMessages([<InfoAlert message="El rol con esa descripción ya existe" />]);
      return;
    }

    createRole(inputs);

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
          <FormControl sx={{ my: 2 }} component="form" onSubmit={handleAdd}>
            {/* Error Messages */}
            {formErrorMessages.map((message) => (
              <Box>{message}</Box>
            ))}
            {formLabels.map((formLabel) => (
              <TextField
                autoFocus
                required
                autoComplete="off"
                sx={{ my: 2, width: "100%" }}
                id={formLabel.id}
                key={formLabel.id}
                label={formLabel.label}
                value={inputs[formLabel.id as keyof typeof inputs]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, [formLabel.id]: e.target.value })
                }
              />
            ))}
            <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0f2fe" }}>
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

type EditProps = {
  role: Role;
  roles: Array<Role>;
};

/**
 * Modal Form to edit a role in the database
 * @param param0
 * @returns
 */
function EditUserRole({ role, roles }: EditProps) {
  const title = `Editar rol "${role.description}"`;
  // TO-CHECK There's a bug if you don't use the same name for the state and the input
  // after a edit
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });
  const [formErrorMessages, setFormErrorMessages] = useState<Array<React.ReactElement>>([]);

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setFormErrorMessages([]);
  };

  const [updateRole, { error, isLoading }] = useUpdateRoleMutation();
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verify if role is unique
    if (roles.some((role) => role.description === inputs.description)) {
      setFormErrorMessages([<InfoAlert message="El rol con esa descripción ya existe" />]);
      return;
    }

    updateRole({ id: role.id, description: inputs.description });

    // TO-DO: error and loading pages
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{"message" in error && error.message}</div>;

    // Update inputs
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
          <FormControl sx={{ my: 2 }} component="form" onSubmit={handleEdit}>
            {/* Error Messages */}
            {formErrorMessages.map((message) => (
              <Box sx={{ color: "red" }}>{message}</Box>
            ))}
            {formLabels.map((formLabel) => (
              <TextField
                key={formLabel.id}
                autoFocus
                required
                autoComplete="off"
                sx={{ my: 2, width: "100%" }}
                id={formLabel.id}
                label={formLabel.label}
                defaultValue={inputs[formLabel.id as keyof typeof inputs]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, [formLabel.id]: e.target.value })
                }
                value={inputs[formLabel.id as keyof typeof inputs]}
              />
            ))}
            <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0f2fe" }}>
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

type Props = {
  role: Role;
};

/**
 * Dialog to confirm the deletion of a role
 * @param param0
 * @returns
 */
function DeleteUserRole({ role }: Props) {
  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = `Eliminar rol "${role.description}"`;

  const [deleteRole, { error, isLoading }] = useDeleteRoleMutation();

  const handleDelete = () => {
    deleteRole(role.id);

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
            <Box>¿Estás seguro de eliminar el rol "{role.description}"?</Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0f2fe" }} onClick={handleDelete}>
                Eliminar
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
}

type Actions = {
  actions: JSX.Element;
};

type Row = {
  id: number;
  description: string;
  actions: Actions;
};

/**
 * Actions buttons with modal forms for each row
 * @param row
 * @returns
 */
function ActionsPerRole(row: Row, roles: Role[]) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* Edit button */}
      <EditUserRole role={row} roles={roles} />

      {/* Delete button */}
      <DeleteUserRole role={row} />
    </Grid>
  );
}

// ------------------ Vista Principal ------------------
const UserRoles = () => {
  const columns: Array<Column> = [
    { id: "id", label: "ID", align: "center" },
    { id: "description", label: "Descripción" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  // Get roles from database
  const [rows, setRows]: any = useState([]);
  const { data, error, isLoading } = useGetRolesQuery(undefined);
  const [roles, setRoles]: any = useState([]);

  // Add actions to the rows
  useEffect(() => {
    if (data) {
      setRoles(data.items);
      // ID dummy for the actions column (It's not DB ID)
      let id = 1;
      const rowsWithActions = data.items.map((row: any) => {
        const rowWithActions = { ...row, id: id++ };
        rowWithActions.actions = ActionsPerRole(row, roles);
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [data]);

  // If it is loading, display a loading message
  if (isLoading) return <div>Loading...</div>;

  const errorMessage = error ? "No existen roles de usuarios" : "";

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Roles de Usuarios" />
            <DataTable columns={columns} rows={rows} addForm={<AddUserRole roles={roles} />} error={errorMessage} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default UserRoles;
