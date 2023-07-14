import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Box } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import EventLoggerTable from "../widgets/EventLoggerTable";

interface Column {
  id: "id" | "occurrence_time" | "description";
  label: string;
  align?: "center" | "right";
}

const columns: Array<Column> = [
  { id: "id", label: "ID", align: "center" },
  { id: "occurrence_time", label: "Fecha, Hora", align: "center" },
  { id: "description", label: "Descripción", align: "center" }
];

const EventLoggerPage = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  // Get events from API
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

        // Date is like: 2023-07-14T19:26:08.102535, convert to 2023-07-14, 19:26:08
        const rows = items.map((item: any) => {
          const date = new Date(item.occurrence_time);
          const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return {
            id: item.id,
            occurrence_time: formattedDate,
            description: item.description,
          };
        });

        setRows(rows);

        if (response.data.items.length === 0) {
          setError("No se encontraron eventos");
        }
      }
    }
    getEvents();
  }, []);

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