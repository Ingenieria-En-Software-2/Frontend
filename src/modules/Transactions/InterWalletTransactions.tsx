import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
import { TRANSACTION_TYPE } from "./NewTransaction";
import internal from "stream";
import axios from "axios";
import Cookies from "js-cookie";
import { Console } from "console";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SERVER_URLS from "utils/serversUrls";
import { useNavigate } from "react-router-dom";

const { URL_NEW_TRANSACTIONS } = SERVER_URLS;

const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions`;
const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;
const URL_WALLETS = `${import.meta.env.VITE_API_URL}/wallet`;

type IWAccountsFields = {
  origin: string;
  email_destination: string;
  wallet: string;
  amount: string;
  transaction_type: string;
  description: string;
  currency: string;
  transaction_status_id: string;
};

/* TODO:
Hacer las verificaciones de los campos y mostrar los mensajes de error.
Enviar los datos al back e informar sobre las respuestas al usuario 
*/

const InterWalletAccountsTransactions = () => {
  const [originAccounts, setOriginAccounts] = useState({});
  const [wallets, setWallets] = useState([]);
  const [formInputs, setFormInputs] = useState<IWAccountsFields>({
    origin: "",
    destination: "",
    wallet: "",
    amount: "",
    transaction_type: "inter_wallet",
    description: "",
    currency: "", // TODO: Se hace un query para ver las monedas disponibles
    transaction_status_id: "2",
  });
  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          Origin: `${URL_TRANSACTIONS}`,
        },
      });
      setOriginAccounts(response.data);
    }

    async function getWallets() {
      const response = await axios.get(URL_WALLETS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      console.log(response.data.wallets);
      const index = response.data.wallets.findIndex((d) => d.description === "Caribbean Wallet");
      response.data.wallets.splice(index, 1);
      //const other_wallets = response.data.wallets.splice(index, 1)
      setWallets(response.data.wallets);
    }

    getOriginAccounts();
    getWallets();
  }, []);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formInputs);
    try {
      const response = await axios.post(URL_TRANSACTIONS, formInputs, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data.message);
        setModal(true);
        setModalText({ title: "Transferencia Exitosa", text: response.data.message, button: "Volver" });
      }
      if (response.status == 201) {
        setModal(true);
        setModalText({ title: "Transferencia Retenida", text: response.data.message, button: "Volver" });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setModal(true);
      setModalText({
        title: "Error al realizar la transferencia",
        text: error.response.data.message,
        button: "Volver",
      });
    }
    // TODO: Mostrar que la transacción se realizó o mostrar mensajes de error en caso de que los haya.
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_NEW_TRANSACTIONS);
  };

  //console.log(originAccounts);

  return (
    <>
      <div className="main-container" style={{ height: "80%" }}>
        <Box sx={{ width: "80%" }}>
          <form onSubmit={handleSubmit}>
            {/*Cuenta de destino */}

            <TextField
              name="origin"
              select
              variant="outlined"
              color="primary"
              label="Cuenta de origen"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.origin}
            >
              {originAccounts &&
                originAccounts.corriente &&
                originAccounts.corriente.map((account) => (
                  <MenuItem value={account}>{`Corriente ${account}`}</MenuItem>
                ))}
              {originAccounts &&
                originAccounts.ahorro &&
                originAccounts.ahorro.map((account) => <MenuItem value={account}>{`Ahorro ${account}`}</MenuItem>)}
            </TextField>

            <TextField
              name="destination"
              type="email"
              variant="outlined"
              color="primary"
              label="Correo electrónico"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.destination}
            />

            <TextField
              name="wallet"
              select
              variant="outlined"
              color="primary"
              label="Wallet"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.wallet}
            >
              {wallets.map((wallet) => (
                <MenuItem key={wallet.id} value={wallet.id}>
                  {wallet.description}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="amount"
              type="number"
              variant="outlined"
              color="primary"
              label="Monto"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.amount}
            />

            <TextField
              name="description"
              type="text"
              variant="outlined"
              color="primary"
              label="Concepto"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.description}
            />

            <TextField
              name="currency"
              type="text"
              variant="outlined"
              color="primary"
              label="Moneda"
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={(event) => handleFieldChange(event)}
              value={formInputs.currency}
            />
            <Button variant="outlined" color="primary" type="submit" fullWidth>
              Enviar
            </Button>
          </form>
        </Box>
      </div>
      {/* dialog de exito de registro*/}
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
    </>
  );
};

export default InterWalletAccountsTransactions;
