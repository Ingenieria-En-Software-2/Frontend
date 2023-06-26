import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import Title from "components/Title";
import { AccountFormInputs } from "../types/account";

import { Box, Stack, MenuItem, TextField, Button, Modal } from "@mui/material";

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
    console.log(formInputs);

    // Get user token from local storage
    const token = localStorage.getItem("auth.auth_token");

    // Request to create account
    const type = formInputs.accountType == "Checking" ? 1 : 2;
    const object = {
      user_id: token,
      account_type_id: type,
    };

    const url = `${import.meta.env.VITE_API_URL}/user_account`;
    const response = await axios.post(url, object, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('auth.auth_token')}`
      },
    });

    const data = response.data;

    console.log(data);

    // If the request is successful, show a success message
    // Otherwise, show an error message
    if (data.errors) {
      setModalInfo({
        success: false,
        message: data.errors.join(", "),
      });
    } else {
      setModalInfo({
        success: true,
        message: `Se ha creado la cuenta ${type == 1 ? "corriente" : "ahorro"} exitosamente. Su número de cuenta es ${
          data.account_number
        }.`,
      });
    }

    // Open modal
    handleOpenModal();
  };

  return (
    <Box>
      <form className="flex flex-col" autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={4}>
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

          <Button variant="outlined" color="primary" type="submit" fullWidth>
            Crear cuenta
          </Button>
        </Stack>
      </form>
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
          <h2 id="modal-modal-title">Comisión</h2>
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
            <Title title="Crear cuenta" />
            <CreateAccountForm />
          </Box>
        </DashboardLayoutBasic>
      </DashboardWrapper>
    </div>
  );
};

export default CreateAccount;
