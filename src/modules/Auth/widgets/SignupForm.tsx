// import banner from "assets/images/banner.jpg";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField } from "@mui/material";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";
import Title from "components/Title";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SignupFormInputs } from "../types/signup";

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => console.log(data);

  // -------------------- Form tabs --------------------
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  // -------------------- Countries, states and cities --------------------
  // There are some countries that are not supported by the library
  const countries: ICountry[] = Country.getAllCountries();
  const [countryCode, setCountryCode] = useState("VEN");

  // Update states when country changes
  const [states, setStates] = useState<IState[]>([]);
  const handleCountryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    // Search iso code
    const country = countries.find((country: ICountry) => country.name === e.target.value);
    if (country) {
      setCountryCode(country.isoCode);
      const states = State.getStatesOfCountry(country.isoCode);
      setStates(states);
    }
  };

  // Update cities when state changes
  const [cities, setCities] = useState<ICity[]>([]);
  const handleStateChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    // Search state code
    const state = states.find((state: IState) => state.name === e.target.value);
    if (state) {
      const cities = City.getCitiesOfState(countryCode, state.isoCode);
      setCities(cities);
    }
  };

  return (
    <>
      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="signup tabs">
        <Tab label="Información general" {...allyProps(0)} />
        <Tab label="Dirección" {...allyProps(1)} />
        <Tab label="Datos de contacto" {...allyProps(2)} />
      </Tabs>
      <form onSubmit={handleSubmit(onSubmit)} action={"" /* Login endpoint */}>
        <TabPanel value={value} index={0}>
          {/* Tab 1: General info */}
          <Title title="Información general" />
          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Names */}
            <Controller
              name="generalInfo.names"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 80, minLength: 3, pattern: /^[A-Za-z\s]+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Nombres"
                  fullWidth
                  required
                />
              )}
            />

            {/* Surnames */}
            <Controller
              name="generalInfo.surnames"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 80, minLength: 3, pattern: /^[A-Za-z\s]+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Apellidos"
                  fullWidth
                  required
                />
              )}
            />
          </Stack>

          {/* Email */}
          <Controller
            name="generalInfo.email"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 80, minLength: 3, pattern: /* email regex */ /^[A-Za-z\s]+$/i }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                variant="outlined"
                color="primary"
                label="Correo electrónico"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="generalInfo.password"
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 80, minLength: 3, pattern: /* password regex */ /^[A-Za-z\s]+$/i }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                color="primary"
                label="Contraseña"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            )}
          />

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Birthdate */}
            <Controller
              name="generalInfo.dateOfBirth"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Fecha de nacimiento"
                    slotProps={{
                      textField: {
                        helperText: "MM/DD/AAAA",
                        required: true,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />

            {/* Gender */}
            <Controller
              name="generalInfo.gender"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
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
              )}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Nationality */}
            <Controller
              name="generalInfo.nationality"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" color="primary" label="Nacionalidad" fullWidth required>
                  {countries.map((country: ICountry) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Identification document */}
            <Controller
              name="generalInfo.idDocument"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 80, minLength: 3, pattern: /^[A-Za-z\s]+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Documento de identificación"
                  fullWidth
                  required
                />
              )}
            />

            {/* Phone number */}
            <Controller
              name="generalInfo.phone"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 80, minLength: 3, pattern: /^[A-Za-z\s]+$/i }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Teléfono de contacto"
                  fullWidth
                  required
                />
              )}
            />
          </Stack>
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* Tab 2: Residence info */}
          <Title title="Información de residencia" />

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}
            <Controller
              name="residenceInfo.country"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" color="primary" label="País" fullWidth required>
                  {countries.map((country: ICountry) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Province or state */}
            <Controller
              name="residenceInfo.state"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  color="primary"
                  label="Provincia o estado"
                  fullWidth
                  required
                >
                  {states.map((state: IState) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* City */}
            <Controller
              name="residenceInfo.city"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" color="primary" label="Ciudad" fullWidth required>
                  {cities.map((city: ICity) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* County or municipality */}
            <Controller
              name="residenceInfo.subregion"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Municipio o condado"
                  fullWidth
                  required
                />
              )}
            />

            {/* Sector */}
            <Controller
              name="residenceInfo.sector"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} type="text" variant="outlined" color="primary" label="Sector" fullWidth required />
              )}
            />
          </Stack>

          {/* Street */}
          <Controller
            name="residenceInfo.street"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                color="primary"
                label="Calle o Avenida"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            )}
          />

          {/* Building */}
          <Controller
            name="residenceInfo.building"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                color="primary"
                label="Edificio"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            )}
          />

        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Tab 3: Work info */}
          <Title title="Datos de la empresa donde trabaja" />

          {/* Company name */}
          <Controller
            name="workInfo.company"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                color="primary"
                label="Nombre de la empresa"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            )}
          />

          <Stack spacing={2} direction="row">
            {/* RIF: J-XXXX...X-X */}
            <Controller
              name="workInfo.rif"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="RIF"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
              )}
            />

            {/* Company phone number: 0XXX-XXX-XXXX */}
            <Controller
              name="workInfo.phone"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  variant="outlined"
                  color="primary"
                  label="Telefono de la empresa"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{ pattern: "0[0-9]*-[0-9]*" }}
                />
              )}
            />
          </Stack>

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}
            <Controller
              name="residenceInfo.country"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" color="primary" label="País" fullWidth required>
                  {countries.map((country: ICountry) => (
                    <MenuItem key={country.name} value={country.name}>
                      {country.flag} {country.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Province or state */}
            <Controller
              name="residenceInfo.state"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  variant="outlined"
                  color="primary"
                  label="Provincia o estado"
                  fullWidth
                  required
                >
                  {states.map((state: IState) => (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* City */}
            <Controller
              name="residenceInfo.city"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField {...field} select variant="outlined" color="primary" label="Ciudad" fullWidth required>
                  {cities.map((city: ICity) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </TabPanel>

        {/* Captcha */}

        {/* Botón de borrar */}
        {/* <Button variant="outlined" color="primary" fullWidth>
          Borrar
        </Button> */}

        {/* Botón de envío */}
        <Button variant="outlined" color="primary" type="submit" fullWidth>
          Enviar
        </Button>
      </form>
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
