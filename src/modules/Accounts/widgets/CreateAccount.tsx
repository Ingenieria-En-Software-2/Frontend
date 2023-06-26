import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import Title from "components/Title";
import { AccountFormInputs } from "../types/account";

import { Box, Stack, MenuItem, TextField, Button, Modal } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const URL_TRANSACTIONS = `${import.meta.env.VITE_API_URL}/user_transactions`;
const URL_ACCOUNTS = `${import.meta.env.VITE_API_URL}/user_account`;

const AccountTable = () => {
  const headerStyle = {
    backgroundColor: "#4e8391",
    color: "#fff",
    fontSize: "1rem",
  };

  // Get accounts from API
  const [checkingAccounts, setCheckingAccounts] = useState({} as string[]);
  const [savingAccounts, setSavingAccounts] = useState({} as string[]);
  useEffect(() => {
    async function getOriginAccounts() {
      const response = await axios.get(URL_ACCOUNTS, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
          Origin: `${URL_TRANSACTIONS}`,
        },
      });
      setCheckingAccounts(response.data.corriente);
      setSavingAccounts(response.data.ahorro);
    }
    getOriginAccounts();
  }, [checkingAccounts, savingAccounts]);

  return (
    <Box>
      <Title title="Cuentas" />
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
            {checkingAccounts && checkingAccounts.length > 0 ? (
              checkingAccounts.map((account) => (
                <TableRow key={account}>
                  <TableCell align="center">Corriente</TableCell>
                  <TableCell align="center">{account}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center">Corriente</TableCell>
                <TableCell align="center">No hay cuentas</TableCell>
              </TableRow>
            )}
            {savingAccounts && savingAccounts.length > 0 ? (
              savingAccounts.map((account) => (
                <TableRow key={account}>
                  <TableCell align="center">Ahorro</TableCell>
                  <TableCell align="center">{account}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center">Ahorro</TableCell>
                <TableCell align="center">No hay cuentas</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const CreateAccountForm = () => {
  // Info Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [modalInfo, setModalInfo] = useState({
    success: false,
    message: "",
  });

  // Submit form
  const [formInputs, setFormInputs] = useState<AccountFormInputs>({
    accountType: "",
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
    const url = `${import.meta.env.VITE_API_URL}/user_account`;
    await axios
      .post(url, object, {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth.auth_token")}`,
        },
      })
      .catch((error) => {
        const data = error.response.data;
        setModalInfo({
          success: false,
          message: data.errors.join(", "),
        });
        // Open modal
        handleOpenModal();
      })
      .then((result) => {
        if (!result) return;
        const data = result.data;
        setModalInfo({
          success: true,
          message: `Se ha creado la cuenta ${type == 1 ? "corriente" : "ahorro"}, con número ${data.account_number}.`,
        });
        // Open modal
        handleOpenModal();
      });
  };

  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const handleShowForm = () => {
    setShowForm(true);
    setShowButton(false);
  };

  const handleHideForm = () => {
    setShowForm(false);
    setShowButton(true);
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
              <Button variant="outlined" color="secondary" onClick={handleHideForm}>
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
        <Button variant="outlined" color="primary" fullWidth onClick={handleShowForm}>
          Crear cuenta
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleCloseModal}
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
            className={`p-1 text-2xl ${modalInfo.success ? "text-green-500" : "text-red-500"}`}
          >
            {modalInfo.success ? "Operación exitosa" : "Operación fallida"}
          </h2>
          <p id="modal-modal-description">{modalInfo.message}</p>
        </Box>
      </Modal>
    </Box>
  );
};

const CreateAccount = () => {
  return (
    <div className="main-container">
      <DashboardWrapper>
        <DashboardLayoutBasic>
          <Box sx={{ width: "100%" }}>
            <CreateAccountForm />
            <hr className="my-4" />
            <AccountTable />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default CreateAccount;
