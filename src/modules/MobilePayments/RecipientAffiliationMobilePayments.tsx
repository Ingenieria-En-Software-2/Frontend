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
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const { URL_CREATE_RECIPIENT_AFFILIATION } = SERVER_URLS;

const URL_RECIPIENT_AFFILIATION = `${import.meta.env.VITE_BACKEND_URL}/user/user_affiliates`;
const URL_WALLETS = `${import.meta.env.VITE_BACKEND_URL}/api/user_wallets`;

type RecipientAffiliationFields = {
  identification_document: string;
  destination: string;
  phone: string;
  email: string;
  destination_wallet: string;
};


const RecipientAffiliationMobilePayments = () => {
  // Sample recipient affiliates
  // const sampleRecipientAffiliates = [
  //   {
  //     id: 1,
  //     identification_document: '12345678',
  //     destination: 'John Doe',
  //     phone: '1234567890',
  //     email: 'john.doe@example.com',
  //     destination_wallet: 'Wallet 1',
  //   },
  //   {
  //     id: 2,
  //     identification_document: '23456789',
  //     destination: 'Jane Doe',
  //     phone: '2345678901',
  //     email: 'jane.doe@example.com',
  //     destination_wallet: 'Wallet 2',
  //   },
  // ];  

  const [wallets, setWallets] = useState([]);
  const [recipientAffiliates, setRecipientAffiliates] = useState([]);
  const [formInputs, setFormInputs] = useState<RecipientAffiliationFields>({
    identification_document: "",
    destination: "",
    phone: "",
    email: "",
    destination_wallet: "",
  });  
  const [modalOn, setModal] = useState(false);
  const [modalText, setModalText] = useState({ title: "", text: "", button: "" });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getWallets() {
      const response = await axios.get(URL_WALLETS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          Origin: `${URL_RECIPIENT_AFFILIATION}`,
        },
      });
      setWallets(response.data);
    }

    async function getRecipientAffiliates() {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/affiliates_list`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          Origin: `${URL_RECIPIENT_AFFILIATION}`,
        },
      });
      setRecipientAffiliates(Object.values(response.data)[2]);
    }

    getWallets();
    getRecipientAffiliates();
  }, []);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(formInputs);
    try {
      const opts = {
        method: "POST",
        headers: {
          "Authorization": 'Bearer ' + `${Cookies.get("auth.auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identification_document: formInputs.identification_document,
          name: formInputs.destination,
          phone: formInputs.phone,
          email: formInputs.email,
          wallet: formInputs.destination_wallet
        })
      };
  
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/user_affiliates`, opts)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            setModal(true);
            setModalText({
              title: "Configuración de Pago Móvil Exitosa",
              text: "El destinatario ha sido afiliado exitosamente",
              button: "Volver" });
            return resp.json();
          }
          if (resp.status === 401) {
            setModal(true);
            setModalText({
              title: "Error al afiliar destinatario",
              text: "Ha ocurrido un error al afiliar el destinatario",
              button: "Volver"});
            return resp.json();
          }
        });
    } catch (error) {
      console.log(error);
      setModal(true);
      setModalText({
        title: "Error al afiliar destinatario",
        text: "Ha ocurrido un error al afiliar el destinatario",
        button: "Volver",
      });
    }
  };

  const handleCloseModal = () => {
    setModal(false);
    navigate(URL_CREATE_RECIPIENT_AFFILIATION);
  };

  const handleFieldEdit = (event: React.ChangeEvent<HTMLInputElement>, id: number, field: string) => {
    // Find the index of the recipient affiliate with the given ID
    const index = recipientAffiliates.findIndex((affiliate) => affiliate.id === id);
  
    // Create a new array with the updated recipient affiliate
    const newRecipientAffiliates = [...recipientAffiliates];
    newRecipientAffiliates[index] = {
      ...newRecipientAffiliates[index],
      [field]: event.target.value,
    };
  
    // Update the state with the new array
    setRecipientAffiliates(newRecipientAffiliates);
  };
    
  // Edit the recipient affiliate with the given ID
  const handleEdit = (id: number) => {
    setEditingId(id);
  };
    
  const handleSave = async (id: number) => {
    try {
      // Find the updated recipient affiliate with the given ID
      const updatedAffiliate = recipientAffiliates.find((affiliate) => affiliate.id === id);
  
      // Replace with the URL of your edit recipient affiliate endpoint
      const url = `${URL_RECIPIENT_AFFILIATION}/${id}`;
  
      // Use the updated data from the recipientAffiliates state variable
      const data = {
        identification_document: updatedAffiliate.identification_document,
        destination: updatedAffiliate.destination,
        phone: updatedAffiliate.phone,
        email: updatedAffiliate.email,
        destination_wallet: updatedAffiliate.destination_wallet,
      };
  
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
  
      // Handle successful response
      console.log(response.data);
  
      // Reset editingId to exit edit mode
      setEditingId(null);
    } catch (error) {
      // Handle error response
      console.error(error);
    }
  };
      
  // Delete the recipient affiliate with the given ID
  const handleDelete = async (id: number) => {
    try {
      // Replace with the URL of your delete recipient affiliate endpoint
      const url = `${URL_RECIPIENT_AFFILIATION}/${id}`;
  
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
  
      // Handle successful response
      console.log(response.data);
  
      // Remove the deleted recipient affiliate from the state
      setRecipientAffiliates((prev) => prev.filter((affiliate) => affiliate.id !== id));
    } catch (error) {
      // Handle error response
      console.error(error);
    }
  };
  

  console.log(wallets);
  console.log(recipientAffiliates);

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: "100%" }}>
              <Title title="Afiliación de Destinatarios del Pago Móvil" />
                <form onSubmit={handleSubmit}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        {/* Doc. de Identidad */}
                        <TableCell sx={{ flex: "1" }}>
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
                        </TableCell>

                        {/* Destinatario */}
                        <TableCell sx={{ flex: "1" }}>
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
                        </TableCell>

                        {/* Teléfono Celular */}
                        <TableCell sx={{ flex: "1" }}>
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
                        </TableCell>

                        {/* Mail */}
                        <TableCell sx={{ flex: "1" }}>
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
                        </TableCell>

                        {/* Destination Wallet */}
                        <TableCell sx={{ flex: "1" }}>
                          <TextField
                            name="destination_wallet"
                            select
                            variant="outlined"
                            color="primary"
                            label="Wallet"
                            fullWidth
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
                        </TableCell>
                        <TableCell sx={{ flex: "1" }}>
                          {/* Boton Enviar */}
                          <Button variant="outlined" color="primary" type="submit" fullWidth>
                            Enviar
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </form>

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
            <Box sx={{ width: "100%" }}>
              <Title title="Detalle de Destinatarios" />
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#0e7490'}}>
                    <TableCell sx={{ color: 'white' }}>Documento de Identidad</TableCell>
                    <TableCell sx={{ color: 'white' }}>Destinatario</TableCell>
                    <TableCell sx={{ color: 'white' }}>Teléfono Celular</TableCell>
                    <TableCell sx={{ color: 'white' }}>Mail</TableCell>
                    <TableCell sx={{ color: 'white' }}>Wallet Destino</TableCell>
                    <TableCell sx={{ color: 'white' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipientAffiliates.map((affiliate) => (
                    <TableRow key={affiliate.id}>
                      {editingId === affiliate.id ? (
                        <TableCell>
                          <TextField
                            value={affiliate.identification_document}
                            onChange={(event) => handleFieldEdit(event, affiliate.id, 'identification_document')}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{affiliate.identification_document}</TableCell>
                      )}                      
                      {editingId === affiliate.id ? (
                        <TableCell>
                          <TextField
                            value={affiliate.destination}
                            onChange={(event) => handleFieldEdit(event, affiliate.id, 'destination')}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{affiliate.destination}</TableCell>
                      )}           
                      {editingId === affiliate.id ? (
                        <TableCell>
                          <TextField
                            value={affiliate.phone}
                            onChange={(event) => handleFieldEdit(event, affiliate.id, 'phone')}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{affiliate.phone}</TableCell>
                      )}    
                      {editingId === affiliate.id ? (
                        <TableCell>
                          <TextField
                            value={affiliate.email}
                            onChange={(event) => handleFieldEdit(event, affiliate.id, 'email')}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{affiliate.email}</TableCell>
                      )}        
                      {editingId === affiliate.id ? (
                        <TableCell>
                          <TextField
                            value={affiliate.destination_wallet}
                            onChange={(event) => handleFieldEdit(event, affiliate.id, 'destination_wallet')}
                          />
                        </TableCell>
                      ) : (
                        <TableCell>{affiliate.destination_wallet}</TableCell>
                      )}                      
                      <TableCell>
                        {editingId === affiliate.id ? (
                          <Button onClick={() => handleSave(affiliate.id)}>Guardar</Button>
                        ) : (
                          <Button onClick={() => handleEdit(affiliate.id)}>Editar</Button>
                        )}
                        <Button onClick={() => handleDelete(affiliate.id)}>Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default RecipientAffiliationMobilePayments;