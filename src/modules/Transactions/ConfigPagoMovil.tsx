import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, MenuItem, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
import axios from "axios";
import Cookies from "js-cookie";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SERVER_URLS from "utils/serversUrls";
import { useNavigate } from "react-router-dom";

const { URL_CONFIG_PAGO_MOVIL } = SERVER_URLS;

const URL_MOBILE_PAYMENT = `${import.meta.env.VITE_API_URL}/mobile-payment`;
const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;

type ConfigPagoMovilFields = {
  mail: string;
  document: string;
  receiver_name: string;
  phone_number: string;
  account_id: string;
  max_amount: string;
};

const PagoMovil = () => {
  const navigate = useNavigate();

  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });

  const [originAccounts, setOriginAccounts] = useState({});
  const [formInputs, setFormInputs] = useState<ConfigPagoMovilFields>({
    mail: "",
    document: "",
    receiver_name: "",
    phone_number: "",
    account_id: "",
    max_amount: ""
  });

  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      setOriginAccounts(response.data);
    }
    getOriginAccounts();

    async function getCurrentConfig() {
      const response = await axios.get(URL_MOBILE_PAYMENT, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });

      console.log(response.data);
      /* Posiblemente explote */
      if (!response.data.error) setFormInputs(response.data);
    }
    getCurrentConfig();
  }, []);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_MOBILE_PAYMENT, formInputs, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      if (response.status == 200) {
        setModal(true);
        setModalText({ title: "Configuración de Pago Móvil realizada con éxito", text: response.data.message, button: "Volver" });
      }
    } catch (error) {
      setModal(true);
      setModalText({
        title: "Error al modificar la configuración del pago móvil",
        text: error.response.data.message,
        button: "Volver",
      });
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_CONFIG_PAGO_MOVIL);
  };


  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <div className="main-container" style={{ height: "80%" }}>
            <Box sx={{ width: "80%" }}>
              <Title title="Configuración de Pago Móvil" />

              <form onSubmit={handleSubmit}>
                {/*Cuenta de destino */}

                <TextField
                  name="mail"
                  type="mail"
                  variant="outlined"
                  color="primary"
                  label="Correo electrónico asociado al pago movil"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='mail'
                  value={formInputs.mail}
                />

                <TextField
                  name="document"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Documento de identidad"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='document'
                  value={formInputs.document}
                />

                <TextField
                  name="receiver_name"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Destinatario"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='receiver_name'
                  value={formInputs.receiver_name}
                />

                <TextField
                  name="phone_number"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Teléfono Celular"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='phone_number'
                  value={formInputs.phone_number}
                />

                <TextField
                  name="account_id"
                  key='account_id'
                  select
                  variant="outlined"
                  color="primary"
                  label="Cuenta Afiliada"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.account_id}
                >
                  {originAccounts &&
                    originAccounts.corriente &&
                    originAccounts.corriente.map((account) => (
                      <MenuItem value={account}>{`Corriente ${account}`}</MenuItem>
                  ))}
                  {originAccounts &&
                    originAccounts.ahorro &&
                    originAccounts.ahorro.map((account) => (
                    <MenuItem value={account}>{`Ahorro ${account}`}</MenuItem>
                  ))}
                </TextField>

                <TextField
                  name="max_amount"
                  type="number"
                  variant="outlined"
                  color="primary"
                  label="Máximo Monto permitido"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  key='max_amount'
                  value={formInputs.max_amount}
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
