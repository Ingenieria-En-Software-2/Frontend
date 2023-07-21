import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { Box, Button } from "@mui/material";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

import Title from "../../../components/Title";
import { SearchInfoIcon, DeleteIcon } from "components/ux/Icons";
import { Modal, iconStyle, buttonStyle } from "components/Buttons";
import DataTable from "components/DataTable";
import { Column } from "components/DataTable";

const columns: Array<Column> = [
  { id: "id", label: "ID", align: "center" },
  { id: "occurrence_time", label: "Fecha, Hora", align: "center" },
  { id: "description", label: "Evento", align: "center" },
  // { id: "module", label: "Módulo", align: "center" },
  { id: "actions", label: "Acciones", align: "center" },
];

// Modal showing the event details
const EventDetailsModal = ({ event }: any) => {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = `Detalles del evento`;

  console.log("Event: ", event);

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpenModal} sx={buttonStyle}>
        <SearchInfoIcon className={iconStyle} />
      </Button>
      <Modal
        open={open}
        handleClose={handleCloseModal}
        title={title}
        content={
          <Box sx={{ my: 2, width: "500px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontWeight: "bold" }}>ID:</Box>
              <Box>{event.id}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontWeight: "bold" }}>Fecha</Box>
              <Box>{event.occurrence_time.split(",")[0]}</Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontWeight: "bold" }}>Hora:</Box>
              <Box>{event.occurrence_time.split(",")[1]}</Box>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontWeight: "bold" }}>Módulo:</Box>
              <Box>{event.module}</Box>
            </Box> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontWeight: "bold" }}>Evento:</Box>
              <Box>{event.description}</Box>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};

/**
 * Dialog to confirm the deletion of a user
 * @param param0
 * @returns
 */
function DeleteEvent({ event, setReload }: any) {
  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const title = `Eliminar evento`;

  const handleDelete = async () => {
    // Delete event, add sucess or error message
    const URL_LOG_EVENT = `${import.meta.env.VITE_API_URL}/log_event/${event.id}`;
    axios
      .delete(URL_LOG_EVENT, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      })
      .then((response) => {
        if (response.status.toString().startsWith("2")) {
          setReload(true);
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

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
            <Box>¿Estás seguro de eliminar al evento "{event.description}"?</Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button sx={{ mt: 2, backgroundColor: "#e0f2fe" }} onClick={handleDelete}>
                Eliminar
              </Button>
            </Box>
          </Box>
        }
      />
    </Box>
  );
}

const EventLoggerPage = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  // Get events from API
  useEffect(() => {
    async function getEvents() {
      const URL_LOG_EVENT = `${import.meta.env.VITE_API_URL}/log_event`;
      try {
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
            const formattedDate = `${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            return {
              id: item.id,
              occurrence_time: formattedDate,
              description: item.description,
            };
          });

          // Add module and actions columns
          rows.forEach((row: any) => {
            // row.module = "Usuarios";
            row.actions = (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <EventDetailsModal event={row} />
                <DeleteEvent event={row} setReload={setReload} />
              </Box>
            );
          });

          setRows(rows);
          setReload(false);

          if (response.data.items.length === 0) {
            setError("No se encontraron eventos");
          }
        }
      } catch (error) {
        setError("No se encontraron eventos");
      }
    }
    getEvents();
  }, [reload]);

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Logger de Eventos" />
            <DataTable columns={columns} rows={rows} addForm={<></>} error={error} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default EventLoggerPage;
