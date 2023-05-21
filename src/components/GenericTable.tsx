import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "username", label: "Usuario", align: "center" },
  { id: "names", label: "Nombres" },
  { id: "surnames", label: "Apellidos" },
  { id: "role", label: "Rol", align: "center" },
  { id: "usertype", label: "Tipo de Usuario", align: "center" },
  { id: "actions", label: "Acciones", align: "center" },
];

function createData(username: string, names: string, surnames: string, role: string, usertype: string) {
  const actions = "(Dropdown)";
  return { username, names, surnames, role, usertype, actions };
}

const rows = [
  createData("admin", "Admin", "One", "Analista de Cuentas", "Interno"),
  createData("user", "User", "Two", "Analista de Cuentas", "Externo"),
  createData("user2", "User", "Three", "Cuentahabiente", "Mixto"),
  createData("user3", "User", "Four", "Analista de Cuentas", "Interno"),
  createData("user4", "User", "Five", "Cuentahabiente", "Externo"),
];

/**
 * GenericTable component
 * 
 * @description This component is used to display a table with just data.
 * 
 * @param {readonly Column[]} columns The columns of the table.
 * @param {Data[]} rows The rows of the table.
 * @param {any} headerStyle The style of the header of the table.
 * 
 * @returns {JSX.Element} The GenericTable component
 */
export default function GenericTable(columns: readonly Column[], rows: any[]): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  const headerStyle = {
    backgroundColor: "#3f51b5",
    color: "#fff",
  };

  const begin = page * rowsPerPage;
  const end = begin + rowsPerPage;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={6} align="center" sx={headerStyle}>
              Detalle de los usuarios
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" sx={headerStyle}>
              Usuario
            </TableCell>
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
            <TableRow
              hover
              key={row.username}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:nth-of-type(odd)": { backgroundColor: "#f0f0ff" },
              }}
            >
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
