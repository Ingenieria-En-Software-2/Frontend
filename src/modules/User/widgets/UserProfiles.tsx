import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";
import  { DeleteButton, EditButton } from "components/Buttons";


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
        label: "Editar",
        button: <EditButton />,
      },
      {
        id: "2",
        label: "Eliminar",
        button: <DeleteButton />,
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
    <DashboardWrapper>
      <DashboardLayoutBasic>
        {/* <h1>Perfiles de Usuario</h1> */}
        <DataTable title="Detalles de Usuario" columns={columns} rows={rows} />
      </DashboardLayoutBasic>
    </DashboardWrapper>
  );
};

export default UserProfiles;
