import React, { useState } from "react";

import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import Title from "components/Title";
import { AccountFormInputs } from "../types/account"; 

import { Box, Stack, MenuItem, TextField, Button, Modal } from "@mui/material";

const CreateAccountForm = () => {
  // Modal state
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  // Submit form
  const [formInputs, setFormInputs] = useState<AccountFormInputs>({
    accountName: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TO-DO: Send data to API
    console.log(formInputs);

    // Open modal
    handleOpenModal();
  };

  return (
    <Box>
      <form className="flex flex-col" autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Account Holder Info */}
          <Stack direction="row" spacing={2}>
            {/* Account Holder */}
            <TextField id="outlined-required" label="Cuentahabiente" defaultValue="Fulanito" fullWidth disabled />

            {/* Account Holder ID */}
            <TextField
              id="outlined-required"
              label="Documento de Identidad"
              defaultValue="V-123456789"
              fullWidth
              disabled
            />
          </Stack>

          {/* Account name */}
          <TextField
            name="accountName"
            variant="outlined"
            color="primary"
            label="Nombre de la cuenta"
            fullWidth
            required
            onChange={handleFieldChange("accountName")}
          />

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
          <p id="modal-modal-description">
            Info de comisión
          </p>
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
