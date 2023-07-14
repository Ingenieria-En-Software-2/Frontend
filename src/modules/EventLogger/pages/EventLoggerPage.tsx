import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Box } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import EventLoggerTable from "../widgets/EventLoggerTable";

const columns: Array<Column> = [
  { id: "id", label: "ID", align: "center" },
  { id: "occurrence_time", label: "Fecha, Hora", align: "center" },
  { id: "description", label: "Descripción", align: "center" }
];

const EventLoggerPage = () => {
  // Get transactions from API
  // const { data, error: errorTransactions } = useGetTransactionsByUserQuery();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // Get transactions from API
  useEffect(() => {
    async function getEvents() {
      const URL_LOG_EVENT = `${import.meta.env.VITE_API_URL}/log_event`;
      const response = await axios.get(URL_LOG_EVENT, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });

      if (response.data) {
        const items = response.data.items;
        setRows(items);

        if (response.data.items.length === 0) {
          setError("No se encontraron eventos");
        }
      }
    }
    getEvents();
  }, []);

  // const dummyRows = [
  //   {
  //     id: "1",
  //     occurrence_time: "2021-03-01 10:00:00",
  //     description: "Depósito de dinero",
  //   },
  //   {
  //     id: "2",
  //     occurrence_time: "2023-07-08 10:00:00",
  //     description: "Depósito de dinero",
  //   },
  //   {
  //     id: "3",
  //     occurrence_time: "2023-10-02 10:00:00",
  //     description: "Depósito de dinero",
  //   },
  //   {
  //     id: "4",
  //     occurrence_time: "2021-09-01 10:00:00",
  //     description: "Depósito de dinero",
  //   },
  //   {
  //     id: "5",
  //     occurrence_time: "2021-10-01 10:00:00",
  //     description: "Depósito de dinero",
  //   },
  // ];

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Logger de Eventos" />
            <EventLoggerTable columns={columns} rows={rows} error={error} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default EventLoggerPage;