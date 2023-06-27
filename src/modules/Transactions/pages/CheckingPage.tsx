import { Box } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import TransactionTable from "../widgets/TransactionTable";
import { Column } from "../widgets/TransactionTable";
import InfoUser from "../widgets/InfoUser";

import { useGetTransactionsByUserQuery } from "services/dbApi";
import { useEffect, useState } from "react";

interface IRows {
  id: string;
  [key: string]: string | number | JSX.Element;
}

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
  const { data, error: errorTransactions } = useGetTransactionsByUserQuery();
  const [rows, setRows] = useState<IRows[]>([]);
  const [error, setError] = useState("");

  // const error = rows.length === 0;
  const errorMessage = error ? "No se encontraron transacciones de cuenta corriente" : "";

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setRows(
        data.items.map((item, index) => ({
          id: index.toString(),
          transaction_id: item.id,
          transaction_date: item.transaction_date,
          transaction_type: item.transaction_type,
          transaction_description: item.description,
          amount: item.amount,
        }))
      );
      if (data.items.length === 0) {
        setError("No se encontraron transacciones de cuenta corriente");
      }
    }
  }, [data]);

  useEffect(() => {
    if (errorTransactions) {
      console.log("errorTransactions", errorTransactions);
      setError("Ocurrió un error al cargar las transacciones");
    }
  }, [errorTransactions]);

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
