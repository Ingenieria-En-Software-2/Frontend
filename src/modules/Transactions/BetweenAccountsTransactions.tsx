import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
import { TRANSACTION_TYPE } from "./NewTransaction";
import internal from "stream";

type BetweenAccountsFields = {
  user_id : string;
  origin_account : string;
  destination_account : string;
  amount : string;
  transaction_type : string;  
  transaction_description : string;
  currency_id : string;
  transaction_status_id : string; 
}

/* TODO:
Hacer las verificaciones de los campos y mostrar los mensajes de error.
Enviar los datos al back e informar sobre las respuestas al usuario 
*/



const BetweenAccountsTransactions = () => {
  const [formInputs, setFormInputs] = useState<BetweenAccountsFields>(
    {
      user_id: "", // TODO: Se debe conseguir del usuario logeado actualmente
      origin_account: "", // TODO: Se hace un query para ver las cuentas del usuario logeado y elegir una de ellas
      destination_account: "",
      amount: "",
      transaction_type: "", 
      transaction_description: "",
      currency_id: "", // TODO: Se hace un query para ver las monedas disponibles
      transaction_status_id: "",   //Creo que esto no debe ponerse aqui   
    }    
  );

  const handleFieldChange =
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   const { name, value } = event.target;
   setFormInputs({...formInputs, [name]: value,});
  };
  

  return (
    <div className="main-container">
    <Box sx={{ width: "80%" }}>
      <form onSubmit={ console.log(formInputs)}>
        
        {/*Cuenta de destino */}
        
          <TextField
                  name="origin_account"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Cuenta de origen"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.origin_account}
                /> 

          <TextField
                  name="destination_account"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Cuenta de destino"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.destination_account}
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
                  name="transaction_description"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Concepto"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.transaction_description}
                /> 

          <TextField
                  name="currency_id"
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Moneda"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  onChange={(event) => handleFieldChange(event)}
                  value={formInputs.currency_id}
                />
          <Button 
                variant="outlined" 
                color="primary" 
                type="button"
                fullWidth>
            Enviar
          </Button>
          </form>
      </Box>
    </div>
  )
}


export default BetweenAccountsTransactions;