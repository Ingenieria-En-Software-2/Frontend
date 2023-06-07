// import banner from "assets/images/banner.jpg";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, Select, TextField, InputLabel, FormControl } from "@mui/material";

import { Country, State, City } from "country-state-city";
import Title from "components/Title";

type Country = {
  name: string;
  iso2: string;
  states: {
    name: string;
    state_code: string;
    cities: {
      name: string;
      id: number;
    }[];
  }[];
};

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  // -------------------- Countries, states and cities --------------------
  // OJO PELAO, NO TODOS LOS PAISES TIENEN ESTADOS Y CIUDADES: EX. ANGUILLA
  const countries = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState("VEN");

  // Update states when country changes
  const [states, setStates] = useState<State[]>([]);
  const handleCountryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    // Search iso code
    const country = countries.find((country: Country) => country.name === e.target.value);
    if (country) {
      setCountryCode(country.isoCode);
      const states = State.getStatesOfCountry(country.isoCode);
      setStates(states);
    }
  };

  // Update cities when state changes
  const [cities, setCities] = useState<City[]>([]);
  const handleStateChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    // Search state code
    const state = states.find((state: State) => state.name === e.target.value);
    if (state) {
      const cities = City.getCitiesOfState(countryCode, state.isoCode);
      setCities(cities);
    }
  };

  // -------------------- Form submit --------------------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth, password);
  };

  return (
    <>
      <FormControl onSubmit={handleSubmit} action={"" /* Login endpoint */}>
        {/* Sección 1: Información general */}
        <Title title="Información general" />
        <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
          {/* Nombres */}
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

          {/* Apellidos */}
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

        {/* Correo electrónico */}
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

        {/* Contraseña */}
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
        <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
          {/* F Nacimiento */}
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

        <Stack spacing={2} direction="row">
          {/* Nacionalidad */}
          <TextField select variant="outlined" color="primary" label="Nacionalidad" fullWidth required sx={{ mb: 4 }}>
            {countries.map((country: Country) => (
              <MenuItem key={country.name} value={country.name}>
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

        {/* Sección 2: Información de residencia */}
        <Title title="Información de residencia" />

        {/* Habitación: texttarea */}
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Habitación"
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 4 }}
        />

        {/* Calle o Avenida*/}
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Calle o Avenida"
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <Stack spacing={2} direction="row">
          {/* Sector */}
          <TextField type="text" variant="outlined" color="primary" label="Sector" fullWidth required sx={{ mb: 4 }} />

          {/* Ciudad */}
          <TextField type="text" variant="outlined" color="primary" label="Ciudad" fullWidth required sx={{ mb: 4 }} />
        </Stack>

        <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
          {/* País */}
          <TextField
            select
            variant="outlined"
            color="primary"
            label="País"
            fullWidth
            required
            onChange={handleCountryChange}
          >
            {countries.map((country: Country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Estado o Provincia */}
          <TextField
            select
            variant="outlined"
            color="primary"
            label="Estado o Provincia"
            fullWidth
            onChange={handleStateChange}
          >
            {states.map((state: State) => (
              <MenuItem key={state.name} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Municipio o Condado */}
          <TextField select variant="outlined" color="primary" label="Municipio o Condado" fullWidth>
            {cities.map((city: City) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Sección 3: Datos de la Empresa donde trabaja */}
        <Title title="Datos de la Empresa donde trabaja" />

        {/* Nombre de la empresa */}
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="Nombre de la empresa"
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <Stack spacing={2} direction="row">
          {/* RIF: J-XXXX...X-X */}
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="RIF"
            fullWidth
            required
            sx={{ mb: 4 }}
            inputProps={{ pattern: "J-[0-9]*-[0-9]{1}" }}
          />

          {/* Telefono de la empresa: 0X...X-XXXXXXX...X */}
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Telefono de la empresa"
            fullWidth
            required
            sx={{ mb: 4 }}
            inputProps={{ pattern: "0[0-9]*-[0-9]*" }}
          />
        </Stack>

        <Stack spacing={3} direction="row">
          {/* País */}
          <TextField
            select
            variant="outlined"
            color="primary"
            label="País"
            fullWidth
            required
            sx={{ mb: 4 }}
            onChange={handleCountryChange}
          >
            {countries.map((country: Country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Estado o Provincia */}
          <TextField
            select
            variant="outlined"
            color="primary"
            label="Estado o Provincia"
            fullWidth
            sx={{ mb: 4 }}
            onChange={handleStateChange}
          >
            {states.map((state: State) => (
              <MenuItem key={state.name} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Municipio o Condado */}
          <TextField select variant="outlined" color="primary" label="Municipio o Condado" fullWidth sx={{ mb: 4 }}>
            {cities.map((city: City) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        {/* Captcha */}

        {/* Botón de borrar */}
        {/* <Button variant="outlined" color="primary" fullWidth>
          Borrar
        </Button> */}

        {/* Botón de envío */}
        <Button variant="outlined" color="primary" type="submit" fullWidth>
          Enviar
        </Button>
      </FormControl>
      <small className="mt-3">
        ¿Ya tienes una cuenta?
        <Link href="/login" underline="hover">
          {" "}
          Inicia sesión
        </Link>
      </small>
    </>
  );
};

export default SignupForm;
