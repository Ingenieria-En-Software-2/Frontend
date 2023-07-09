import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Box } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import TransactionTable from "../widgets/TransactionTable";
import { Column } from "../widgets/TransactionTable";
import InfoUser from "../widgets/InfoUser";

// import { useGetTransactionsByUserQuery } from "services/dbApi";

// interface IRows {
//   id: string;
//   [key: string]: string | number | JSX.Element;
// }

const columns: Array<Column> = [
  { id: "id", label: "Transaction ID", align: "center" },
  { id: "transaction_date", label: "Fecha, Hora", align: "center" },
  { id: "transaction_type", label: "Tipo de Transacción", align: "center" },
  { id: "description", label: "Concepto", align: "center" },
  { id: "amount", label: "Monto ($)", align: "center" },
];

const SavingsPage = () => {
  // Get transactions from API
  // const { data, error: errorTransactions } = useGetTransactionsByUserQuery();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (data) {
  //     console.log("data", data);
  //     setRows(
  //       data.items.map((item, index) => ({
  //         id: index.toString(),
  //         transaction_id: item.id,
  //         transaction_date: item.transaction_date,
  //         transaction_type: item.transaction_type,
  //         transaction_description: item.description,
  //         amount: item.amount,
  //       }))
  //     );
  //     if (data.items.length === 0) {
  //       setError("No se encontraron transacciones de cuenta corriente");
  //     }
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (errorTransactions) {
  //     console.log("errorTransactions", errorTransactions);
  //     setError("Ocurrió un error al cargar las transacciones");
  //   }
  // }, [errorTransactions]);

  // Get transactions from API
  useEffect(() => {
    async function getTransactions() {
      const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions`;
      const response = await axios.get(URL_TRANSACTIONS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });

      if (response.data) {
        const items = response.data.items;
        setRows(items);

        if (response.data.items.length === 0) {
          setError("No se encontraron transacciones de cuenta corriente");
        }
      }
    }
    getTransactions();
  }, []);

  const dummyRows = [
    {
      id: "1",
      transaction_date: "2021-03-01 10:00:00",
      transaction_type: "Depósito",
      description: "Depósito de dinero",
      amount: 100,
    },
    {
      id: "2",
      transaction_date: "2023-07-08 10:00:00",
      transaction_type: "Depósito",
      description: "Depósito de dinero",
      amount: 100,
    },
    {
      id: "3",
      transaction_date: "2023-10-02 10:00:00",
      transaction_type: "Depósito",
      description: "Depósito de dinero",
      amount: 100,
    },
    {
      id: "4",
      transaction_date: "2021-09-01 10:00:00",
      transaction_type: "Depósito",
      description: "Depósito de dinero",
      amount: 100,
    },
    {
      id: "5",
      transaction_date: "2021-10-01 10:00:00",
      transaction_type: "Depósito",
      description: "Depósito de dinero",
      amount: 100,
    },
  ];

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <InfoUser user={{ name: "User", document: "C-123456789" }} />
            <Title title="Cuenta de Ahorros" />
            <TransactionTable title="Detalle de transacciones" columns={columns} rows={dummyRows} error={error} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default SavingsPage;
