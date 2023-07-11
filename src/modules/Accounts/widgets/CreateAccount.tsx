import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import Title from "components/Title";
import { AccountFormInputs } from "../types/account";
import { InfoAlert } from "../../../components/Alerts";

import { Box, Stack, MenuItem, TextField, Button, Modal } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;

interface AccountTableProps {
  checkingAccounts: string[];
  savingAccounts: string[];
}

const AccountTable = ({ checkingAccounts, savingAccounts }: AccountTableProps) => {
  const headerStyle = {
    backgroundColor: "#4e8391",
    color: "#fff",
    fontSize: "1rem",
  };

  return (
    <Box>
      <Title title="Cuentas" />

      {/* No accounts */}
      {(!checkingAccounts || checkingAccounts.length === 0) && (!savingAccounts || savingAccounts.length === 0) ? (
        <InfoAlert message="No tienes cuentas registradas" />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={headerStyle}>
                  Tipo
                </TableCell>
                <TableCell align="center" sx={headerStyle}>
                  Número de cuenta
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {checkingAccounts &&
                checkingAccounts.length > 0 &&
                checkingAccounts.map((account) => (
                  <TableRow key={account}>
                    <TableCell align="center">Corriente</TableCell>
                    <TableCell align="center">{account}</TableCell>
                  </TableRow>
                ))}
              {savingAccounts &&
                savingAccounts.length > 0 &&
                savingAccounts.map((account) => (
                  <TableRow key={account}>
                    <TableCell align="center">Ahorro</TableCell>
                    <TableCell align="center">{account}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const CreateAccountForm = ({ setReloadTable }: any) => {
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const handleForm = () => {
    setShowForm(!showForm);
    setShowButton(!showButton);
  };

  const [formInputs, setFormInputs] = useState<AccountFormInputs>({
    accountType: "",
  });

  // Info Modal state
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);
  const [modalInfo, setModalInfo] = useState({
    success: false,
    message: "",
  });

  // Handle form input changes
  const handleFieldChange =
    (field: keyof AccountFormInputs) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormInputs({
        ...formInputs,
        [field]: value,
      });
    };

  // Handle form submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get user token from local storage
    const token = localStorage.getItem("auth.auth_token");

    // Request to create account
    const type = formInputs.accountType == "Checking" ? 1 : 2;
    const object = {
      user_id: token,
      account_type_id: type,
    };

    await axios
      .post(URL_ACCOUNTS, object, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      })
      .catch((error) => {
        const data = error.response.data;
        console.log(data)
        setModalInfo({
          success: false,
          message: data.errors.join(", "),
        });
        // Open modal
        handleModal();
      })
      .then((result) => {
        if (!result) return;
        const data = result.data;
        setModalInfo({
          success: true,
          message: `Se ha creado la cuenta ${type == 1 ? "corriente" : "ahorro"}, con número ${data.account_number}.`,
        });
        // Open modal
        setReloadTable(true);
        handleModal();
      });
  };

  return (
    <Box>
      {showForm && (
        <Box>
          <Title title="Nueva cuenta" />
          <form className="flex flex-col" autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={4} className="mb-4">
              {/* Account type */}
              <TextField
                name="accountType"
                select
                variant="outlined"
                color="primary"
                label="Tipo de cuenta"
                fullWidth
                required
                onChange={handleFieldChange("accountType")}
              >
                <MenuItem value="Checking">Corriente</MenuItem>
                <MenuItem value="Saving">Ahorro</MenuItem>
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="outlined" color="secondary" onClick={handleForm}>
                Cancelar
              </Button>
              <Button variant="outlined" color="primary" type="submit">
                Crear cuenta
              </Button>
            </Stack>
          </form>
        </Box>
      )}
      {showButton && (
        // Button right side
        <Box className="flex justify-end">
          <Button
            variant="contained"
            sx={{ bgcolor: "#0e7490", color: "white", ":hover": { bgcolor: "#e0f2fe", color: "#0e7490" } }}
            onClick={handleForm}
          >
            Crear cuenta
          </Button>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2
            id="modal-modal-title"
            className={`py-1 text-2xl ${modalInfo.success ? "text-green-500" : "text-red-500"}`}
          >
            {modalInfo.success ? "Operación exitosa" : "Operación fallida"}
          </h2>
          <p id="modal-modal-description"
            className={modalInfo.success ? 'text-green-500' : 'text-red-500'}
            >
            {modalInfo.message}
          </p>
        </Box>
      </Modal>
    </Box>
  );
};

const CreateAccount = () => {
  // Get accounts from API
  const [reloadTable, setReloadTable] = useState(false);
  const [checkingAccounts, setCheckingAccounts] = useState([]);
  const [savingAccounts, setSavingAccounts] = useState([]);
  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      });
      setCheckingAccounts(response.data.corriente);
      setSavingAccounts(response.data.ahorro);
      setReloadTable(false);
    }
    getOriginAccounts();
  }, [reloadTable]);

  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <CreateAccountForm setReloadTable={setReloadTable} />
            <hr className="my-4" />
            <AccountTable checkingAccounts={checkingAccounts} savingAccounts={savingAccounts} />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default CreateAccount;
