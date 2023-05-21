import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(username: string, names: string, surnames: string, role: string, usertype: string) {
  const actions = "(Dropdown)";
  return { username, names, surnames, role, usertype, actions };
}

const rows = [createData("admin", "Admin", "One", "Analista de Cuentas", "Interno"), createData("user", "User", "Two", "Analista de Cuentas", "Externo"), createData("user2", "User", "Three", "Cuentahabiente", "Mixto"), createData("user3", "User", "Four", "Analista de Cuentas", "Interno"), createData("user4", "User", "Five", "Cuentahabiente", "Externo")];

export default function GenericTable() {
  const headerStyle = {
    backgroundColor: "#3f51b5",
    color: "#fff",
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        {/* Blue  */}
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Usuario</TableCell>
            <TableCell sx={headerStyle}>Nombres</TableCell>
            <TableCell sx={headerStyle}>Apellidos</TableCell>
            <TableCell sx={headerStyle} align="center">
              Rol
            </TableCell>
            <TableCell sx={headerStyle} align="center">
              Tipo de Usuario
            </TableCell>
            <TableCell sx={headerStyle} align="center">
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            // Alternate row color
            <TableRow key={row.username} sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
              <TableCell align="center" component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell>{row.names}</TableCell>
              <TableCell>{row.surnames}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center">{row.usertype}</TableCell>
              <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
