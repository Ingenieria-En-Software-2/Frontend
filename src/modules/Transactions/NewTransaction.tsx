import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
import BetweenAccountsTransactions from "./BetweenAccountsTransactions";

export const TRANSACTION_TYPE = Object.freeze({
  BETWEEN_ACCOUNTS: "b_a",
  TO_THIRD_PARTIES_IN_WALLET: "to_3rds",
  INTER_WALLET: "inter_wallet",

});

function ShowForm ({type}){
  if (type===TRANSACTION_TYPE.BETWEEN_ACCOUNTS){
    return (<BetweenAccountsTransactions/>)
  }

  return (<Box sx={{ width: "100%" }}><Title title={type} /></Box>)
}

const NewTransaction = () => {
  const [transaction_type, setTransaction_type] = useState(TRANSACTION_TYPE.BETWEEN_ACCOUNTS)

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <Title title="Realizar transacción" />
            {/* Transfer type */}
            <TextField
              name="transaction_type"
              select
              variant="outlined"
              color="primary"
              label="Tipo de transacción a realizar"
              fullWidth
              required
              sx={{ width: "60%", mb : 4 }}
              onChange={event => { setTransaction_type(event.target.value); }}
              value={transaction_type}
            >
              <MenuItem value={TRANSACTION_TYPE.BETWEEN_ACCOUNTS}>
                Entre cuentas
              </MenuItem>
              <MenuItem value={TRANSACTION_TYPE.TO_THIRD_PARTIES_IN_WALLET}>
                Terceros en el Wallet
              </MenuItem>
              <MenuItem value={TRANSACTION_TYPE.INTER_WALLET}>
                Inter Wallet
              </MenuItem>
            </TextField>
            {<ShowForm type={transaction_type}/>}
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  )
}


export default NewTransaction;


// id del usuario quien la realiza
// cuente de origen de donde parte
// cuenta de destino a donde va 
// monto 
// tipo de transaccion 
// concepto
// moneda
