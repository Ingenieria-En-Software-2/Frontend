import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import { EditButton, DeleteButton } from "components/Buttons";
import Title from "components/Title";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { 
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from "services/dbApi";

// ------------------ Formularios ------------------
const formLabels: Array<Column> = [{ id: "description", label: "Descripción" }];

/**
 * Form to insert a new role in the database
 * @returns 
 */
function AddUserRole() {
  // Guarda los inputs del formulario
  const [inputs, setInputs] = useState<{ description: string }>({ description: "" });
  const [createRole, { data, error, isLoading }] = useCreateRoleMutation();

  // Add rol to database
  const handleAdd = () => {
    // TO-DO: Verify inputs
    console.log("agregando...", inputs);
    
    createRole(inputs);

    // TO-DO: error and loading pages
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
   };

  return (
    <FormControl sx={{ my: 2 }}>
      {formLabels.map((formLabel) => (
        <TextField
          autoFocus
          required
          autoComplete='off'
          sx={{ my: 2 }}
          id={formLabel.id}
          label={formLabel.label}
          value={inputs[formLabel.id as keyof typeof inputs]}
          onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setInputs({ ...inputs, [formLabel.id]: e.target.value }
          )}
        />
      ))}
      <Button type='submit' sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleAdd}>
        Enviar
      </Button>
    </FormControl>
  );
}

/**
 * Form to edit a role in the database
 * @param param0 
 * @returns 
 */
function EditUserRole({role}: any) {
  console.log("role", role);
  const [inputs, setInputs] = useState<{ description: string }>({ description: role.description });
  const [updateRole, { data, error, isLoading }] = useUpdateRoleMutation();

  const handleEdit = () => {
    console.log("editando...", role);
    console.log("inputs", inputs);

    // TO-DO: error and loading pages
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>{error.message}</div>;

    // updateRole(inputs);

  };

  return (
    <FormControl sx={{ my: 2 }}>
      {formLabels.map((formLabel) => (
        <TextField
          key={formLabel.id}
          autoFocus
          required
          autoComplete='off'
          sx={{ my: 2 }}
          id={formLabel.id}
          label={formLabel.label}
          defaultValue={inputs[formLabel.id as keyof typeof inputs]}
          onChange={(
              e: React.ChangeEvent<HTMLInputElement>
            ) => setInputs({ ...inputs, [formLabel.id]: e.target.value }
          )}
          value={inputs[formLabel.id as keyof typeof inputs]}
        />
      ))}
      <Button type='submit' sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleEdit}>
        Enviar
      </Button>
    </FormControl>
  );
}

/**
 * Dialog to confirm the deletion of a role
 * @param param0 
 * @returns 
 */
function DeleteUserRole({role}: any) {
  const [deleteRole, { data, error, isLoading }] = useDeleteRoleMutation();

  const handleDelete = () => {
    // TO-DO: error and loading pages
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>{error.message}</div>;

    deleteRole(role.id);
  };

  return (
    <Box sx={{ my: 2 }}>
      <Box>¿Estás seguro de eliminar el rol "{role.description}"?</Box>
      <Button type='submit' sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleDelete}>
        Eliminar
      </Button>
    </Box>
  );
}

/**
 * Actions buttons for each row
 * @param row 
 * @returns 
 */
function ActionsPerRole(row: any) {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {/* Edit button */}
      <React.Fragment>
        {EditButton("Editar rol", <EditUserRole role={row} />)}
      </React.Fragment>
      
      {/* Delete button */}
      <React.Fragment>
        {DeleteButton("Eliminar rol", <DeleteUserRole role={row} />)}
      </React.Fragment>
    </Grid>
  )
}

// ------------------ Vista Principal ------------------
const UserRoles = () => {
  const columns: Array<Column> = [
    { id: "id", label: "ID", align: "center" },
    { id: "description", label: "Descripción" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  // Get roles from database
  const [rows, setRows] = useState([]);
  const { data, error, isLoading } =  useGetRolesQuery();

  // Add actions to the rows
  useEffect(() => {
    if (data) {
      console.log(data);
      const rowsWithActions = data.items.map((row: any) => {
        const rowWithActions = { ...row };
        rowWithActions.actions = ActionsPerRole(row);
        return rowWithActions;
      });
      setRows(rowsWithActions);
    }
  }, [data]);

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
