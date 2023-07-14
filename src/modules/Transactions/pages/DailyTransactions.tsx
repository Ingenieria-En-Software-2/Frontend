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

import { Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SERVER_URLS from "utils/serversUrls";

const { URL_DAILY_TRANSACTIONS } = SERVER_URLS;

import { useNavigate } from "react-router-dom";

// import { useGetTransactionsByUserQuery } from "services/dbApi";

// interface IRows {
//   id: string;
//   [key: string]: string | number | JSX.Element;
// }

const columns: Array<Column> = [
  { id: "id", label: "ID Transacción", align: "center" },
  { id: "ci", label: "Documento de identidad", align: "center" },
  { id: "name", label: "Cuentahabiente", align: "center" },
  { id: "date", label: "Fecha", align: "center" },
  { id: "hour", label: "Hora", align: "center" },
  { id: "transaction_type", label: "Tipo de Transacción", align: "center" },
  { id: "description", label: "Concepto", align: "center" },
  { id: "amount", label: "Monto ($)", align: "center" },
];

const DailyTransactions = () => {
  // Get transactions from API
  // const { data, error: errorTransactions } = useGetTransactionsByUserQuery();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [g, setG] = useState("all");
  const [input , setInput] = useState("all");
  const [rowTransactions, setRowTrans] = useState([]);
  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });
  const navigate = useNavigate();

  // Get transactions from API
  useEffect(() => {
    getTransactions();
  }, [g,input]);

  async function getTransactions() {
    const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions/${g}/${input}/0`;

    try {
      const response = await axios.get(URL_TRANSACTIONS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      //console.log(response);
      //console.log(response.data.transactions);
      //console.log(response.status);
      //console.log(response.data.transactions[0]["origin"]);
      let newArr = [];
      for (var val of response.data.transactions) {
        const cell = {
                        id: val["transaction_id"],
                        ci: val["ci"],
                        name: val["user_name_origin"],
                        date: val["transaction_date"],
                        hour: val["transaction_hour"],
                        transaction_type: val["transaction_type"],
                        description : val["description"],
                        amount :val["amount"],
                      }
        newArr.push(cell);
      }
      setRowTrans(newArr);
      //console.log(rowTransactions);
      
      
    } catch (error) {
      setRowTrans([])
      console.log(error);
      /*setModal(true);
      setModalText({
        title: "Ups!",
        text: error.response.data.message,
        button: "Volver",
      });*/
    }
  }

  const reverseTransaction = async (transaction_id) => {
    const URL_REVERSE = `${import.meta.env.VITE_API_URL}/user_transactions/${transaction_id}`;
    try {
      const res = await axios({
          method: 'put',
          url: URL_REVERSE,
          headers: {
              Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
          }
      });
      if (res.data.status == 200){
        setModal(true);
        setModalText({ title: "Se ha revertido la transferencia", text: res.data.message, button: "Volver" });
      }
    } catch (error) {
      setModal(true);
      setModalText({
        title: "Error al revertir la transferencia",
        text: error.response.data.message,
        button: "Volver",
      });
    }

  }

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_DAILY_TRANSACTIONS);
  };

  const handleCallback = (childData) => {
        if (childData[1] == "Aprobar"){
          console.log("Se aprueba")
        }
        else{
          console.log("Se reversa")
          reverseTransaction(childData[0]);
        }
    }

  const handleSearchBy = (data) => {
    if (g == "period"){
      const concatenation = data[0].concat(" ").concat(data[1])
      setInput(concatenation);
    }
    else{
      setInput(data[0]);
    }
  }

  const handleMode = (data) => {
    setG(data);
  }

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <InfoUser user={{ name: "User", document: "C-123456789" }} />
            <Title title="Transacciones del día" />
            <TransactionTable parentCallback={handleCallback} searchBy={handleSearchBy} mode={handleMode}
            title="Detalle de transacciones" columns={columns} rows={rowTransactions} error={error} buttons={true}/>
          </Box>

          <div>
            <Dialog open={modalOn} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{modalText.title}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">{modalText.text}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>{modalText.button}</Button>
              </DialogActions>
            </Dialog>
          </div>

        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default DailyTransactions;
