import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import Title from "components/Title";
import { Modal, iconStyle, buttonStyle } from "components/Buttons";
import { AddIcon, EditIcon, DeleteIcon } from "components/ux/Icons";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { useGetRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from "services/dbApi";

// ------------------ Formularios ------------------
const formLabels: Array<Column> = [{ id: "description", label: "Descripción" }];

/**
 * Modal Form to insert a new role in the database
 * @returns
 */
function AddUserRole() {
  // Guarda los inputs del formulario
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });
  const [createRole, { error, isLoading }] = useCreateRoleMutation();
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = "Agregar rol";

  // Add rol to database
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TO-DO: Verify inputs

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
            {formLabels.map((formLabel) => (
              <TextField
                autoFocus
                required
                autoComplete="off"
                sx={{ my: 2 }}
                id={formLabel.id}
                label={formLabel.label}
                value={inputs[formLabel.id as keyof typeof inputs]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, [formLabel.id]: e.target.value })
                }
              />
            ))}
            <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0e7ff" }}>
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

/**
 * Modal Form to edit a role in the database
 * @param param0
 * @returns
 */
function EditUserRole({ role }: any) {
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });
  const [updateRole, { error, isLoading }] = useUpdateRoleMutation();

  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = `Editar rol "${role.description}"`;

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verify role is unique

    updateRole({ id: role.id, description: inputs.description });

    // TO-DO: error and loading pages
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{"message" in error && error.message}</div>;

    // TO-CHECK: Clean inputs
    setInputs({ description: "" });
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
            {formLabels.map((formLabel) => (
              <TextField
                key={formLabel.id}
                autoFocus
                required
                autoComplete="off"
                sx={{ my: 2 }}
                id={formLabel.id}
                label={formLabel.label}
                defaultValue={inputs[formLabel.id as keyof typeof inputs]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, [formLabel.id]: e.target.value })
                }
                value={inputs[formLabel.id as keyof typeof inputs]}
              />
            ))}
            <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0e7ff" }}>
              Enviar
            </Button>
          </FormControl>
        }
      />
    </Box>
  );
}

/**
 * Dialog to confirm the deletion of a role
 * @param param0
 * @returns
 */
function DeleteUserRole({ role }: any) {
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
              <Button type="submit" sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleDelete}>
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
 * Actions buttons with modal forms for each row
 * @param row
 * @returns
 */
function ActionsPerRole(row: any) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* Edit button */}
      <EditUserRole role={row} />

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
  const { data, isLoading } = useGetRolesQuery(undefined);

  // Add actions to the rows
  useEffect(() => {
    if (data) {
      // ID dummy for the actions column (It's not DB ID)
      let id = 1;

      const rowsWithActions = data.items.map((row: any) => {
        const rowWithActions = { ...row, id: id++ };
        rowWithActions.actions = ActionsPerRole(row);
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [rows, data]);

  // If it is loading, display a loading message
  if (isLoading) return <div>Loading...</div>;

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
