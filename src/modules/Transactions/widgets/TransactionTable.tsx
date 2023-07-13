import React from "react";
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
} from "@mui/material";

import { InfoAlert } from "../../../components/Alerts";

import { CloseIcon, CheckIcon } from "../../../components/ux/Icons";

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
  buttons? : boolean;
  parentCallback : any;
  searchBy? : any,
  mode : string
}

// ====================== CONSULT FORM ======================
const months = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const quarters = [
  { value: 1, label: "Primer Trimestre" },
  { value: 2, label: "Segundo Trimestre" },
  { value: 3, label: "Tercer Trimestre" },
  { value: 4, label: "Cuarto Trimestre" },
];

/**
 * Get transactions of today
 * @param rows
 * @returns transactions of today
 */
function getTransactionsToday(rows: any) {
  const today = new Date();
  const todayTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    return (
      rowDate.getDate() === today.getDate() &&
      rowDate.getMonth() === today.getMonth() &&
      rowDate.getFullYear() === today.getFullYear()
    );
  });
  return todayTransactions;
}

function getTransactionsWeek(rows: any) {
  const today = new Date();
  const weekTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    return (
      rowDate.getDate() >= today.getDate() - 7 &&
      rowDate.getMonth() === today.getMonth() &&
      rowDate.getFullYear() === today.getFullYear()
    );
  });
  return weekTransactions;
}

/**
 * Get transactions of a month
 * @param rows
 * @param month
 * @returns transactions of a month
 */
function getTransactionsByMonth(rows: any, month: number) {
  const monthTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    // Need to add 1 to getMonth() because it starts from 0
    return rowDate.getMonth() + 1 == month;
  });
  return monthTransactions;
}

/**
 * Get transactions of a quarter
 * @param rows
 * @param quarter
 * @returns transactions of a quarter
 */
function getTransactionsByQuarter(rows: any, quarter: number) {
  const quarterTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    return Math.floor((rowDate.getMonth() + 3) / 3) == quarter;
  });
  return quarterTransactions;
}

/**
 * Get transactions of a year
 * @param rows
 * @param year
 * @returns transactions of a year
 */
function getTransactionsByYear(rows: any, year: number) {
  const yearTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    return rowDate.getFullYear() == year;
  });
  return yearTransactions;
}

/**
 * Get transactions of a date
 * @param rows
 * @param date
 * @returns transactions of a date
 */
function getTransactionsByDate(rows: any, d: string) {
  // Add a day to date
  const date = new Date(d);
  date.setDate(date.getDate() + 1);

  const dateTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    // Chech day month and year
    return (
      rowDate.getDate() === date.getDate() &&
      rowDate.getMonth() === date.getMonth() &&
      rowDate.getFullYear() === date.getFullYear()
    );
  });
  return dateTransactions;
}

/**
 * Get transactions of a period
 * @param rows
 * @param initDate
 * @param endDate
 * @returns transactions of a period
 */
function getTransactionsByPeriod(rows: any, initDate: string, endDate: string) {
  const init = new Date(initDate);
  init.setDate(init.getDate() + 1);
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);

  const periodTransactions = rows.filter((row: any) => {
    const rowDate = new Date(row.transaction_date);
    return rowDate >= init && rowDate <= end;
  });
  return periodTransactions;
}

/**
 * Input form to consult transactions given a consult type
 * @param consultInfo
 * @param setConsultInfo
 * @returns
 */
function ConsultForm({ consultInfo, setConsultInfo, changesDone}: any) {
  switch (consultInfo.consult) {
    // By month: Indicate a month
    case "4":
      return (
        // Selector month
        <TextField
          id="month"
          label="Mes"
          size="small"
          select
          fullWidth
          value={consultInfo.month}
          sx={{ width: 150, height: "auto", backgroundColor: "#f0f9ff" }}
          onChange={(event) => {
            setConsultInfo({ ...consultInfo, month: event.target.value });
          }}
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value} onClick={(event) => {changesDone(["month",option.value]);}}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    // By quarter: Indicate a quarter
    case "5":
      return (
        // Selector quarter
        <TextField
          id="quarter"
          label="Trimestre"
          size="small"
          select
          value={consultInfo.quarter}
          sx={{ width: 180, height: "auto", backgroundColor: "#f0f9ff" }}
          onChange={(event) => {
            setConsultInfo({ ...consultInfo, quarter: event.target.value });
          }}
        >
          {quarters.map((option) => (
            <MenuItem key={option.value} value={option.value} onClick={(event) => {changesDone(["quarter",option.value])}}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    // By year: Indicate a year
    case "6":
      return (
        // Input year
        <TextField
          id="year"
          label="Año"
          size="small"
          type="number"
          value={consultInfo.year}
          sx={{ width: 150, height: "auto", backgroundColor: "#f0f9ff" }}
          onChange={(event) => {
            setConsultInfo({ ...consultInfo, year: event.target.value });
            changesDone(["year",event.target.value]);
          }}
        />
      );
    // By date: Indicate a date
    case "7":
      return (
        // Input date year, month, day
        <TextField
          id="date"
          label="Fecha"
          size="small"
          type="date"
          value={consultInfo.date}
          // center text

          sx={{ width: 150, height: "auto", backgroundColor: "#f0f9ff" }}
          onChange={(event) => {
            setConsultInfo({ ...consultInfo, date: event.target.value });
            changesDone(["date",event.target.value]);
          }}
          InputLabelProps={{ shrink: true }}
        />
      );
    // By period: Indicate two dates
    case "8":
      return (
        // Two selectors date side to side
        <div>
          <TextField
            id="initDate"
            label="Fecha inicial"
            size="small"
            type="date"
            value={consultInfo.initDate}
            sx={{ width: 150, height: "auto", backgroundColor: "#f0f9ff" }}
            onChange={(event) => {
              setConsultInfo({ ...consultInfo, initDate: event.target.value });
              changesDone(["period",consultInfo.initDate, consultInfo.endDate]);
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="endDate"
            label="Fecha final"
            size="small"
            type="date"
            value={consultInfo.endDate}
            sx={{ width: 150, height: "auto", backgroundColor: "#f0f9ff", marginLeft: 2 }}
            onChange={(event) => {
              setConsultInfo({ ...consultInfo, endDate: event.target.value });
              changesDone(["period",consultInfo.initDate, consultInfo.endDate]);
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      );
    default:
      return null;
  }
}

// ====================== TRANSACTION TABLE ======================
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
export default function DataTable({ title = "", columns, rows, error, buttons = false, parentCallback, searchBy,mode}: Props): JSX.Element {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [visibleRows, setVisibleRows] = React.useState(rows);

  const [consultInfo, setConsultInfo] = React.useState({
    consult: "1",
    month: 1,
    quarter: 1,
    year: 2023,
    date: "",
    initDate: "",
    endDate: "",
  });

  const consultOptions = [
    { value: "1", label: "Todas las transacciones" },
    { value: "2", label: "Transacciones de hoy" },
    { value: "3", label: "Transacciones de la semana" },
    { value: "4", label: "Transacciones dado mes" },
    { value: "5", label: "Transacciones dado trimestre" },
    { value: "6", label: "Transacciones dado año" },
    { value: "7", label: "Transacciones dado fecha" },
    { value: "8", label: "Transacciones dado periodo" },
  ];

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

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

  const consultActions: { [key: string]: () => void } = {
    "1": () => setVisibleRows(rows),
    "2": () => setVisibleRows(getTransactionsToday(rows)),
    "3": () => setVisibleRows(getTransactionsWeek(rows)),
    "4": () => setVisibleRows(getTransactionsByMonth(rows, consultInfo.month)),
    "5": () => setVisibleRows(getTransactionsByQuarter(rows, consultInfo.quarter)),
    "6": () => setVisibleRows(getTransactionsByYear(rows, consultInfo.year)),
    "7": () => setVisibleRows(getTransactionsByDate(rows, consultInfo.date)),
    "8": () => setVisibleRows(getTransactionsByPeriod(rows, consultInfo.initDate, consultInfo.endDate)),
  };

  React.useEffect(() => {
    consultActions[consultInfo.consult]();
  }, [consultInfo]);

  const onTrigger = (e : event) => {
        parentCallback([e.currentTarget.id,e.currentTarget.title]);
    };

  const handleChangesDone = (changedData) => {
    searchBy(changedData);
  }

  const passTypeSearch = (data) => {
    if (data==1){
      return "all"
    }
    if (data==2){
      return "today"
    }
    if (data==3){
      return "week"
    }
    if (data==4){
      return "month"
    }
    if (data==5){
      return "quarter"
    }
    if (data==6){
      return "year"
    }
    if (data==7){
      return "date"
    }
    if (data==8){
      return "period"
    }
  }

  return (
    <Box>
      <Grid container direction="row" justifyContent="flex-end" alignItems="center" sx={{ my: 2 }}>
        {/* Form to request data to consult */}
        <Box>
          <ConsultForm changesDone={handleChangesDone} consultInfo={consultInfo} setConsultInfo={setConsultInfo} />
        </Box>
        {/* Selector to consultOptions */}
        <Box sx={{ ml: 2 }}>
          <TextField
            name="state"
            select
            variant="outlined"
            size="small"
            color="primary"
            fullWidth
            required
            sx={{ width: 220, height: "auto", backgroundColor: "#f0f9ff" }}
            onChange={(event) => {
              setConsultInfo({ ...consultInfo, consult: event.target.value });
            }}
            value={consultInfo.consult}
          >
            {consultOptions.map((state) => (
              <MenuItem key={state.value} value={state.value} onClick={(event) => {mode(passTypeSearch(state.value));}}>
                {state.label}
              </MenuItem>
            ))}
          </TextField>
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
                    <TableCell colSpan={buttons ? columns.length+1 : columns.length} align="center" sx={headerStyle}>
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

                  {buttons &&
                  <TableCell sx={headerStyle}> Opciones </TableCell>
                  }
                  
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

                    {buttons &&
                      <TableCell>
                        <button id={row.id} onClick={onTrigger} className="p-1 text-green-700 fa-2x" title="Aprobar" style={{backgroundColor : "transparent"}}>
                           <CheckIcon/>
                        </button>
                        <button id={row.id} onClick={onTrigger} className="p-1 text-red-700 fa-2x left-10" title="Reversar" style={{backgroundColor : "transparent"}}>
                           <CloseIcon />
                        </button>
                      </TableCell>
                    }                

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
