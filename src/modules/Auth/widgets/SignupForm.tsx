// import banner from "assets/images/banner.jpg";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField } from "@mui/material";
import { ICountry, IState, ICity } from "country-state-city";
import Title from "components/Title";
import { SignupFormInputs } from "../types/signup";
import { useAddressInputs } from "../hooks/useAddressInputs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`signup-tabpanel-${index}`}
      aria-labelledby={`signup-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function allyProps(index: number) {
  return {
    id: `signup-tab-${index}`,
    "aria-controls": `signup-tabpanel-${index}`,
  };
}

const SignupForm = () => {
  // -------------------- Form states --------------------
  const [formInputs, setFormInputs] = useState<SignupFormInputs>({
    generalInfo: {
      names: "",
      surnames: "",
      email: "",
      password: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      idDocument: "",
      phone: "",
    },
    residenceInfo: { country: "", state: "", city: "", subregion: "", sector: "", street: "", room: "" },
    workInfo: { company: "", rif: "", phone: "", country: "", state: "", city: "" },
  });

  // Para que pase el build, eliminar luego
  console.log(formInputs);
  setFormInputs({ ...formInputs });

  // -------------------- Address inputs --------------------
  const { selected: selectedAddressHome, options: optionsHome, handlers: handlersHome } = useAddressInputs();
  const { selected: selectedAddressWork, options: optionsWork, handlers: handlersWork } = useAddressInputs();

  // -------------------- Form tabs --------------------
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <>
      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="signup tabs">
        <Tab label="Información general" {...allyProps(0)} />
        <Tab label="Dirección" {...allyProps(1)} />
        <Tab label="Datos de contacto" {...allyProps(2)} />
      </Tabs>
      <form onSubmit={() => null}>
        <TabPanel value={value} index={0}>
          {/* Tab 1: General info */}
          <Title title="Información general" />
          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Names */}
            <TextField type="text" variant="outlined" color="primary" label="Nombres" fullWidth required />

            {/* Surnames */}
            <TextField type="text" variant="outlined" color="primary" label="Apellidos" fullWidth required />
          </Stack>

          {/* Email */}
          <TextField
            type="email"
            variant="outlined"
            color="primary"
            label="Correo electrónico"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          {/* Password */}
          <TextField
            type="password"
            variant="outlined"
            color="primary"
            label="Contraseña"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Birthdate */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                slotProps={{
                  textField: {
                    helperText: "MM/DD/AAAA",
                    required: true,
                  },
                }}
              />
            </LocalizationProvider>

            {/* Gender */}
            <TextField
              select
              variant="outlined"
              color="primary"
              label="Género"
              fullWidth
              required
              sx={{ width: "60%" }}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="O">Otro</MenuItem>
            </TextField>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Nationality */}
            <TextField select variant="outlined" color="primary" label="Nacionalidad" fullWidth required>
              {optionsHome.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.name}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Identification document */}
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Documento de identificación"
              fullWidth
              required
            />

            {/* Phone number */}
            <TextField type="text" variant="outlined" color="primary" label="Teléfono de contacto" fullWidth required />
          </Stack>
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* Tab 2: Residence info */}
          <Title title="Información de residencia" />

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}

            <TextField
              select
              variant="outlined"
              color="primary"
              label="País"
              fullWidth
              required
              onChange={handlersHome.country}
              value={selectedAddressHome.country}
            >
              {optionsHome.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.isoCode}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Province or state */}

            <TextField
              select
              variant="outlined"
              color="primary"
              label="Provincia o estado"
              fullWidth
              required
              onChange={handlersHome.state}
              value={selectedAddressHome.state}
              disabled={optionsHome.states.length === 0}
            >
              {optionsHome.states.map((state: IState) => (
                <MenuItem key={state.name} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>

            {/* City */}
            <TextField
              select
              variant="outlined"
              color="primary"
              label="Ciudad"
              fullWidth
              required
              onChange={handlersHome.city}
              value={selectedAddressHome.city}
              disabled={optionsHome.cities.length === 0}
            >
              {optionsHome.cities.map((city: ICity) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* County or municipality */}
            <TextField type="text" variant="outlined" color="primary" label="Municipio o condado" fullWidth required />

            {/* Sector */}
            <TextField type="text" variant="outlined" color="primary" label="Sector" fullWidth required />
          </Stack>

          {/* Street */}
          <TextField
            type="text"
            variant="outlined"
            color="primary"
            label="Calle o Avenida"
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          {/* Room or apartment */}
          <TextField
            multiline
            rows={4}
            type="text"
            variant="outlined"
            color="primary"
            label="Habitación o apartamento"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Tab 3: Work info */}
          <Title title="Datos de la empresa donde trabaja" />

          {/* Company name */}
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
            {/* RIF */}
            <TextField type="text" variant="outlined" color="primary" label="RIF" fullWidth required sx={{ mb: 4 }} />

            {/* Company phone number */}
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Telefono de la empresa"
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          </Stack>

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}
            <TextField
              select
              variant="outlined"
              color="primary"
              label="País"
              fullWidth
              required
              onChange={handlersWork.country}
              value={selectedAddressWork.country}
            >
              {optionsWork.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.isoCode}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Province or state */}
            <TextField
              select
              variant="outlined"
              color="primary"
              label="Provincia o estado"
              fullWidth
              required
              onChange={handlersWork.state}
              value={selectedAddressWork.state}
              disabled={optionsWork.states.length === 0}
            >
              {optionsWork.states.map((state: IState) => (
                <MenuItem key={state.name} value={state.isoCode}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>

            {/* City */}
            <TextField
              select
              variant="outlined"
              color="primary"
              label="Ciudad"
              fullWidth
              required
              onChange={handlersWork.city}
              value={selectedAddressWork.city}
              disabled={optionsWork.cities.length === 0}
            >
              {optionsWork.cities.map((city: ICity) => (
                <MenuItem key={city.name} value={city.name}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </TabPanel>

        {/* Captcha */}

        {/* Botón de borrar */}
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>

        <Button variant="outlined" color="secondary" fullWidth type="reset">
          Reiniciar
        </Button>

        {/* Botón de envío */}
        <Button variant="outlined" color="primary" type="submit" fullWidth>
          Registrarse
        </Button>
      </Stack>
      </form>
      {/* Blue font */}
      <small className="mt-3 text-blue-500">
        ¿Ya tienes una cuenta?
        <Link href="/login" underline="hover" sx={{ ml: 3 }}>
          Inicia sesión
        </Link>
      </small>
    </>
  );
};

export default SignupForm;
