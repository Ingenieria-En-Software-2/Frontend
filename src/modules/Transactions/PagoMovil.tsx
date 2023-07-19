import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography, Grid} from "@mui/material";
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

const { URL_PAGO_MOVIL } = SERVER_URLS;

const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions`;
const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;

type PagoMovilFields = {
  origin: string;
  destination_ci: string;
  destination_name: string;
  destination_phone: string;
  destination_wallet: string;
  amount: string;
  description: string;
  transaction_type:string;
  currency:string;
};

const PagoMovil = () => {
  const [originAccounts, setOriginAccounts] = useState({});
  const [formInputs, setFormInputs] = useState<PagoMovilFields>({
    origin: "", // TODO: Se hace un query para ver las cuentas del usuario logeado y elegir una de ellas
    destination_ci: "",
    destination_name: "",
    destination_wallet: "",
    destination_phone: "",
    transaction_type: "pago_movil",
    description: "",
    amount: "",
    currency:""
  });
  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });
  const navigate = useNavigate();
  const [currentAmount, setCurrentAmount] = useState("Selecciona una cuenta")

  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          //Origin: `${URL_TRANSACTIONS}`,
        },
      });
      setOriginAccounts(response.data);
    }
    getOriginAccounts();
  }, []);

  useEffect(() => {
    lookForCurrentAmont()
  }, [formInputs.origin]);

  const lookForCurrentAmont = async () => {
    try {
      const URL_AMOUNT = `${URL_ACCOUNTS}/${formInputs.origin}`;
      const res = await axios({
          method: 'put',
          url: URL_ACCOUNTS,
          params : { "account" : formInputs.origin },
          headers: {
              Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
          }
      });
      //console.log(res);
      setCurrentAmount(res.data.balance)
    } catch (error) {
      console.log(error);
    }
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_TRANSACTIONS, formInputs, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      //console.log(response.status);
      if (response.status == 200) {
        //console.log(response.data.message);
        setModal(true);
        setModalText({ title: "Pago Móvil realizado con éxito", text: response.data.message, button: "Volver" });
      }
      if (response.status == 201){
        setModal(true);
        setModalText({ title: "Pago Móvil Retenido", text: response.data.message, button: "Volver" });
      }
    } catch (error) {
      //console.log(error.response.data.message);
      setModal(true);
      setModalText({
        title: "Error al realizar el pago móvil",
        text: error.response.data.message,
        button: "Volver",
      });
    }
    // TODO: Mostrar que la transacción se realizó o mostrar mensajes de error en caso de que los haya.
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_PAGO_MOVIL);
  };


  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <div className="main-container" style={{ height: "80%" }}>
            <Box sx={{ width: "80%" }}>
              <Title title="Realizar Pago Móvil" />

              <form onSubmit={handleSubmit}>
                {/*Cuenta de destino */}

                <TextField
                  name="origin"
                  key = 'origin'
                  select
                  variant="outlined"
                  color="primary"
                  label="Cuenta Emisora"
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

                <Typography variant="h6" style={{color:'#0e7490'}}>
                Monto Disponible:
                  <Box component="span" sx={{ p: 2, border: '1px grey', backgroundColor : '#0e7490', color: 'white',
                  borderRadius: '16px', marginLeft: 10}}> 
                  {currentAmount} </Box>
                </Typography>;

                <TextField
                  name="destination_ci"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Documento de identidad"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='dest_ci'
                  value={formInputs.destination_ci}
                />

                <TextField
                  name="destination_name"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Destinatario"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='dest_name'
                  value={formInputs.destination_name}
                />

                <TextField
                  name="destination_phone"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Teléfono Celular"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='dest_phone'
                  value={formInputs.destination_phone}
                />

                <TextField
                  name="destination_wallet"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Wallet de destino"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='dest_wallet'
                  value={formInputs.destination_wallet}
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
                  key='currency'
                  value={formInputs.currency}
                />

                <TextField
                  name="amount"
                  type="number"
                  variant="outlined"
                  color="primary"
                  label="Monto a debitar"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='amount'
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
                  key='desc'
                  value={formInputs.description}
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
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default PagoMovil;
