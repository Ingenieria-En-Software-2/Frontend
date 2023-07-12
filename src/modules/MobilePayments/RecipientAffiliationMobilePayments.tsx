import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
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

const { URL_CREATE_RECIPIENT_AFFILIATION } = SERVER_URLS;

const URL_RECIPIENT_AFFILIATION = `${import.meta.env.VITE_API_URL}/mobile_payment_recipient_affiliation`;
const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;
const URL_WALLETS = `${import.meta.env.VITE_API_URL}/user_wallets`;

type RecipientAffiliationFields = {
  identification_document: string;
  destination: string;
  phone: string;
  email: string;
  // origin: string;
  destination_wallet: string;
};


const RecipientAffiliationMobilePayments = () => {
  const [originAccounts, setOriginAccounts] = useState({});
  const [wallets, setWallets] = useState([]);
  const [formInputs, setFormInputs] = useState<RecipientAffiliationFields>({
    identification_document: "",
    destination: "",
    phone: "",
    email: "",
    // origin: "",
    destination_wallet: "",
  });
  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          Origin: `${URL_RECIPIENT_AFFILIATION}`,
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
      setWallets(response.data);
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
      const response = await axios.post(URL_RECIPIENT_AFFILIATION, formInputs, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      console.log(response.status);
      if (response.status == 200) {
        console.log(response.data.message);
        setModal(true);
        setModalText({ title: "Configuración de Pago Móvil Exitosa", text: response.data.message, button: "Volver" });
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setModal(true);
      setModalText({
        title: "Error al afiliar destinatario",
        text: error.response.data.message,
        button: "Volver",
      });
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_CREATE_RECIPIENT_AFFILIATION);
  };


  console.log(originAccounts);

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Afiliación de Destinatarios del Pago Móvil" />
            {/* Mobile Payment type */}
            <div className="main-container" style={{ height: "80%" }}>
              <Box sx={{ width: "80%" }}>
                <form onSubmit={handleSubmit}>

                  {/* Doc. de Identidad */}
                  <TextField
                    name="identification_document"
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Doc. de Identidad"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.identification_document}
                  />

                  {/* Destinatario */}
                  <TextField
                    name="destination"
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Destinatario"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.destination}
                  />

                  {/* Teléfono Celular */}
                  <TextField
                    name="phone"
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Teléfono Celular"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.phone}
                  />

                  {/* Mail */}
                  <TextField
                    name="email"
                    type="email"
                    variant="outlined"
                    color="primary"
                    label="Mail"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.email}
                  />

                  {/* Destination Wallet */}
                  <TextField
                    name="destination_wallet"
                    select
                    variant="outlined"
                    color="primary"
                    label="Wallet"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.destination_wallet}
                  >
                    {wallets.map((destination_wallet) => (
                      <MenuItem key={destination_wallet.id} value={destination_wallet.id}>
                        {destination_wallet.alias}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* Cuenta de destino
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
                      originAccounts.corriente.map((account) => {
                        if (account == formInputs.destination)
                          return <MenuItem disabled value={account}>{`Corriente ${account}`}</MenuItem>;
                        return <MenuItem value={account}>{`Corriente ${account}`}</MenuItem>;
                      })}

                    {originAccounts &&
                      originAccounts.ahorro &&
                      originAccounts.ahorro.map((account) => {
                        if (account == formInputs.destination)
                          return <MenuItem disabled value={account}>{`Ahorro ${account}`}</MenuItem>;
                        return <MenuItem value={account}>{`Ahorro ${account}`}</MenuItem>;
                      })}
                  </TextField> */}

                  {/* Monto Máximo
                  <TextField
                    name="maximum_payment_amount"
                    type="number"
                    variant="outlined"
                    color="primary"
                    label="Monto Máximo"
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                    onChange={(event) => handleFieldChange(event)}
                    value={formInputs.maximum_payment_amount}
                  /> */}

                  {/* Boton Enviar */}
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
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default RecipientAffiliationMobilePayments;

// id del usuario quien la realiza
// cuente de origen de donde parte
// cuenta de destino a donde va
// monto
// tipo de transaccion
// concepto
// moneda
