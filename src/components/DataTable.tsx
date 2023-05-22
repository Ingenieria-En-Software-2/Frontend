import * as React from "react";

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

import { SearchIcon } from "components/ux/Icons";
import { AddButton } from "components/Buttons";

export interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
  format?: (value: number) => string;
}

interface Props {
  title: string;
  columns: ReadonlyArray<Column>;
  rows: ReadonlyArray<any>;
}

/**
 * DataTable component
 *
 * @description This component is used to display a table with just data.
 *
 * @param {string} title The title of the table.
 * @param {readonly Column[]} columns The columns of the table.
 * @param {Data[]} rows The rows of the table.
 *
 * @returns {JSX.Element} The DataTable component
 */
export default function DataTable({ title, columns, rows }: Props): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [visibleRows, setVisibleRows] = React.useState(rows);

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
            label="Filtrar"
            variant="outlined"
            size="small"
            sx={{ width: "auto", height: "auto", backgroundColor: "#e0e7ff" }}
            placeholder="Search"
            type="search"
            onInput={(e) => requestSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Box>

        {/* Add Button */}
        <AddButton />
      </Grid>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {/* Title */}
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={headerStyle}>
                {title}
              </TableCell>
            </TableRow>

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
                key={row.id ? row.id : Object.values(row).join("")}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(odd)": { backgroundColor: "#f0f0ff" },
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {/* Actions */}
                      {typeof value === "object" ? (
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                          {value.map((action) => action.button)}
                        </Grid>
                      ) : (
                        value
                      )}
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
    </Box>
  );
}
