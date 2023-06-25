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

const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions`

type BetweenAccountsFields = {
  origin : string;
  destination : string;
  amount : string;
  transaction_type : string;  
  description : string;
  currency : string;
  transaction_status_id : string; 
}

/* TODO:
Hacer las verificaciones de los campos y mostrar los mensajes de error.
Enviar los datos al back e informar sobre las respuestas al usuario 
*/




const BetweenAccountsTransactions = () => {
  const [formInputs, setFormInputs] = useState<BetweenAccountsFields>(
    {      
      origin: "", // TODO: Se hace un query para ver las cuentas del usuario logeado y elegir una de ellas
      destination: "",
      amount: "",
      transaction_type: "b_a", 
      description: "",
      currency: "", // TODO: Se hace un query para ver las monedas disponibles
      transaction_status_id: "2",   
    }    
  );

  const handleFieldChange =
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { name, value } = event.target;
   setFormInputs({...formInputs, [name]: value,});
  };

  const  handleSubmit = async (e:any) => {
    e.preventDefault()
    console.log(formInputs)
    const response = await axios.post(
      URL_TRANSACTIONS, formInputs, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('auth.auth_token')}`}
        }
      );

  }
  

  return (
    <div className="main-container">
    <Box sx={{ width: "80%" }}>
      <form onSubmit={ handleSubmit}>
        
        {/*Cuenta de destino */}
        
          <TextField
                  name="origin"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Cuenta de origen"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.origin}
                /> 

          <TextField
                  name="destination"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Cuenta de destino"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.destination}
                /> 

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
          <Button 
                variant="outlined" 
                color="primary" 
                type="submit"
                fullWidth>
            Enviar
          </Button>
          </form>
      </Box>
    </div>
  )
}


export default BetweenAccountsTransactions;