import React, { useState, useEffect } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import { EditButton, DeleteButton, ActionsButtons } from "components/Buttons";
import Title from "components/Title";

import Box from "@mui/material/Box";
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
const formLabels = [{ id: "description", label: "Descripción" }];

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

function EditUserRole(role: any) {
  // const [inputs, setInputs] = useState<{ description: string }>({ description: role.description });
  // const [updateRole, { data, error, isLoading }] = useUpdateRoleMutation();

  const handleEdit = () => {
    console.log("editando...", role);

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
          // defaultValue={inputs[formLabel.id as keyof typeof inputs]}
          // onChange={handleInputChange}
          // value={inputs[formLabel.id as keyof typeof inputs]}
        />
      ))}
      <Button type='submit' sx={{ mt: 2, backgroundColor: "#e0e7ff" }} onClick={handleEdit}>
        Enviar
      </Button>
    </FormControl>
  );
}

function DeleteUserRole(role: any) {
  // const [deleteRole, { data, error, isLoading }] = useDeleteRoleMutation();

  const handleDelete = () => {
    console.log("eliminando...", role);

    // TO-DO: error and loading pages
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>{error.message}</div>;

    // deleteRole(role.id);
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

// ------------------ Vista Principal ------------------
const UserRoles = () => {
  const columns: Array<Column> = [
    { id: "id", label: "ID", align: "center" },
    { id: "description", label: "Descripción" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  // Actions to be displayed in the table
  const actions = [
    {
      id: "1",
      title: "Editar rol",
      button: EditButton,
      form: EditUserRole,
    },
    {
      id: "2",
      title: "Eliminar rol",
      button: DeleteButton,
      form: DeleteUserRole,
    },
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
        rowWithActions.actions = ActionsButtons(row, actions);
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
