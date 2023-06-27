import { Box } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import TransactionTable from "../widgets/TransactionTable";
import { Column } from "../widgets/TransactionTable";
import InfoUser from "../widgets/InfoUser";

const columns: Array<Column> = [
  { id: "transaction_id", label: "Transaction ID", align: "center" },
  { id: "transaction_date", label: "Fecha", align: "center" },
  { id: "transaction_type", label: "Tipo de Transacción", align: "center" },
  { id: "transaction_description", label: "Concepto", align: "center" },
  { id: "amount", label: "Monto ($)", align: "center" },
];

const rows = [
  {
    id: "1",
    transaction_id: 1,
    transaction_date: "2021-10-01",
    transaction_type: "Depósito",
    transaction_description: "Depósito de nómina",
    amount: 1000,
  },
  {
    id: "2",
    transaction_id: 2,
    transaction_date: "2021-10-02",
    transaction_type: "Retiro",
    transaction_description: "Retiro de efectivo",
    amount: 500,
  },
];

const CheckingPage = () => {
  // Get transactions from API

  const error = rows.length === 0;
  const errorMessage = error ? "No se encontraron transacciones de cuenta corriente" : "";
  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <InfoUser user={{ name: "User", document: "C-123456789" }} />
            <Title title="Cuenta Corriente" />
            <TransactionTable title="Detalle de transacciones" columns={columns} rows={rows} error={errorMessage} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default CheckingPage;
