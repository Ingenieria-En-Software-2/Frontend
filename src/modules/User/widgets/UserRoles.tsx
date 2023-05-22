import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import { DeleteButton, EditButton } from "components/Buttons";
import Title from "components/Title";
import Box from "@mui/material/Box";

const UserRoles = () => {
  const columns: Array<Column> = [
    { id: "id", label: "ID", align: "center" },
    { id: "description", label: "Descripción" },
    { id: "actions", label: "Acciones", align: "center" },
  ];

  function createData(id: string, description: string) {
    // Lista de acciones donde guarda el icono y la función a ejecutar
    const actions = [
      {
        id: "1",
        label: "Editar",
        button: <EditButton />,
      },
      {
        id: "2",
        label: "Eliminar",
        button: <DeleteButton />,
      },
    ];

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
    <DashboardWrapper>
      <DashboardLayoutBasic>
        <Box sx={{ width: "100%" }}>
          <Title title="Roles de Usuarios" />
          <DataTable title="" columns={columns} rows={rows} />
        </Box>
      </DashboardLayoutBasic>
    </DashboardWrapper>
  );
};

export default UserRoles;
