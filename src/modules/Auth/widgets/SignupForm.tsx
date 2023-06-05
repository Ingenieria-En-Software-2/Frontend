// import banner from "assets/images/banner.jpg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { countries } from "../utils/countries";
import Title from "components/Title";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);
  };

  return (
    <>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} action={"" /* Login endpoint */}>
        {/* Sección 1: Información general */}
        <Title title="Información general" />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Nombres"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            fullWidth
            required
          />
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Apellidos"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="primary"
          label="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="primary"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          fullWidth
          sx={{ mb: 4 }}
        />
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              onChange={(newValue: string | null) => {
                if (newValue) setDateOfBirth(newValue);
              }}
            />
          </LocalizationProvider>

          {/* Género */}
          <TextField select variant="outlined" color="primary" label="Género" fullWidth required sx={{ mb: 4 }}>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
            <MenuItem value="O">Otro</MenuItem>
          </TextField>
        </Stack>

        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          {/* Nacionalidad */}
          <TextField select variant="outlined" color="primary" label="Nacionalidad" fullWidth required sx={{ mb: 4 }}>
            {countries.map((country: { code: string; name: string }) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Documento de identidad */}
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Documento de identidad"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          {/* Teléfono de contacto */}
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Teléfono de contacto"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
        </Stack>

        <Title title="Información de residencia" />
        {/* Dirección */}

        <Button variant="outlined" color="primary" type="submit" fullWidth>
          Register
        </Button>
      </form>
      <small>
        Already have an account?
        <Link href="/login" underline="hover">
          {" "}
          Login
        </Link>
      </small>
    </>
  );
};

export default SignupForm;
