import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { SearchIcon } from "../../../components/ux/Icons";
import { InfoAlert } from "../../../components/Alerts";

export interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
  format?: (value: number) => string;
}

interface Props {
  title?: string;
  columns: ReadonlyArray<Column>;
  rows: ReadonlyArray<{ id: string; [key: string]: string | number | JSX.Element }>;
  error?: string;
}

/**
 * DataTable component
 *
 * @description This component is used to display a table with just data.
 *
 * @param {string} title (Optional) The title of the table (default: "")
 * @param {readonly Column[]} columns The columns of the table.
 * @param {Data[]} rows The rows of the table.
 * @param {JSX.Element} addForm The form to add a new row.
 * @param {string} error (Optional) The error message to display.
 *
 * @returns {JSX.Element} The DataTable component
 */
export default function DataTable({ title = "", columns, rows, error }: Props): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [visibleRows, setVisibleRows] = React.useState(rows);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  console.log(rows)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  const headerStyle = {
    backgroundColor: "#0e7490",
    color: "#fff",
    fontSize: "1.2rem",
  };

  const begin = page * rowsPerPage;
  const end = begin + rowsPerPage;

  React.useEffect(() => {
    setVisibleRows(rows.slice(begin, end));

    return () => {
      setVisibleRows([]);
    };
  }, [rows, begin, end]);

  // Search Bar
  const requestSearch = (searchedVal: string) => {
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some((key) => {
        return row[key].toString().toLowerCase().includes(searchedVal.toLowerCase());
      });
    });
    setVisibleRows(filteredRows);
  };

  return (
    <Box>
      {/* Search Bar */}
      <Grid container direction="row" justifyContent="flex-end" alignItems="center" sx={{ my: 2 }}>
        <Box>
          <TextField
            variant="outlined"
            size="small"
            autoComplete="off"
            sx={{ width: "auto", height: "auto", backgroundColor: "#e0f2fe" }}
            placeholder="Filtrar"
            type="search"
            onInput={(e) => requestSearch((e.target as HTMLInputElement).value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>
      </Grid>
      {(error && <InfoAlert message={error} />) || (
        <>
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 440,
              "&::-webkit-scrollbar": {
                width: 5,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f9ff",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0e7490",
                borderRadius: 5,
              },
            }}
          >
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                {/* Title */}
                {title && (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center" sx={headerStyle}>
                      {title}
                    </TableCell>
                  </TableRow>
                )}

                {/* Column names */}
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth, ...headerStyle }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row) => (
                  // Alternate row color
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:nth-of-type(odd)": { backgroundColor: "#f0f9ff" },
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ fontSize: "1.1rem" }}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[15, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
          />
        </>
      )}
    </Box>
  );
}