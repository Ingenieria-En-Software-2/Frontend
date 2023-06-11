// import banner from "assets/images/banner.jpg";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
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

/**
 * Generic function to validate input fields with a pattern
 *
 * @param value The value to validate
 * @param pattern The pattern to validate the value
 * @param setError Function to set the error state
 */
const validateInput = (value: string | null, pattern: RegExp, errorSetter: (value: boolean) => void) => {
  if (!value) errorSetter(true);
  else errorSetter(!pattern.test(value));
};

const SignupForm = () => {
  // -------------------- Form tabs --------------------
  const [tabValue, setValue] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const handleFieldChange =
    (field: keyof SignupFormInputs) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormInputs((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [name]: value,
        },
      }));
    };

  const handleDateOfBirthChange = (date: Date | null) => {
    const formattedDate = date?.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    
      console.log(formattedDate); // "dd-mm-aaaa"
    };
    // if (date) {
    //   setFormInputs((prevState) => ({
    //     ...prevState,
    //     ["generalInfo"]: {
    //       ...prevState["generalInfo"],
    //       ["dateOfBirth"]: new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-").replace(/\./g, "-"),
    //     },
    //   }));
    // }

  // };

  // -------------------- Address inputs --------------------
  const { selected: selectedAddressHome, options: optionsHome, handlers: handlersHome } = useAddressInputs();
  const { selected: selectedAddressWork, options: optionsWork, handlers: handlersWork } = useAddressInputs();

  // -------------------- Error states --------------------
  const [errors, setErrors] = useState({
    general: false,
    idDocument: false,
    phone: false,
    rif: false,
    companyPhone: false,
  });

  // -------------------- Form submit --------------------
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formInputs);

    // Validates each input left to validate
    validateInput(formInputs.generalInfo.idDocument, /^[VEJGC]-\d{7,8}$/, (value: boolean) =>
      setErrors({ ...errors, idDocument: value })
    );
    validateInput(formInputs.generalInfo.phone, /^(?:\+)?[0-9]{0,4} ?[0-9]{10}$/, (value: boolean) =>
      setErrors({ ...errors, phone: value })
    );
    validateInput(formInputs.workInfo.rif, /^[VEJPGvejpg]-\d{7,8}-\d$/, (value: boolean) =>
      setErrors({ ...errors, rif: value })
    );
    validateInput(formInputs.workInfo.phone, /^(?:\+)?[0-9]{0,4} ?[0-9]{10}$/, (value: boolean) =>
      setErrors({ ...errors, companyPhone: value })
    );

    // If there is any error or any field is empty, set the general error
    if (Object.values(errors).some((error) => error)) {
      setErrors({ ...errors, general: true });
      return;
    } else {
      setErrors({ ...errors, general: false });
    }

  };

  return (
    <>
      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="signup tabs">
        <Tab label="Información general" {...allyProps(0)} />
        <Tab label="Dirección" {...allyProps(1)} />
        <Tab label="Datos de contacto" {...allyProps(2)} />
      </Tabs>
      {errors.general && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Ha ocurrido un error. Por favor, intente de nuevo.
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TabPanel value={tabValue} index={0}>
          {/* Tab 1: General info */}
          <Title title="Información general" />
          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Names */}
            <TextField
              name="names"
              type="text"
              variant="outlined"
              color="primary"
              label="Nombres"
              fullWidth
              required
              inputProps={{ maxLength: 20 }}
              onChange={(event) => handleFieldChange("generalInfo")(event)}
              value={formInputs.generalInfo.names}
            />

            {/* Surnames */}
            <TextField
              name="surnames"
              type="text"
              variant="outlined"
              color="primary"
              label="Apellidos"
              fullWidth
              required
              inputProps={{ maxLength: 20 }}
              onChange={(event) => handleFieldChange("generalInfo")(event)}
              value={formInputs.generalInfo.surnames}
            />
          </Stack>

          {/* Email */}
          <TextField
            name="email"
            type="email"
            variant="outlined"
            color="primary"
            label="Correo electrónico"
            fullWidth
            required
            sx={{ mb: 4 }}
            onChange={(event) => handleFieldChange("generalInfo")(event)}
            value={formInputs.generalInfo.email}
          />

          {/* Password */}
          <TextField
            name="password"
            type="password"
            variant="outlined"
            color="primary"
            label="Contraseña"
            fullWidth
            required
            sx={{ mb: 4 }}
            onChange={(event) => handleFieldChange("generalInfo")(event)}
            value={formInputs.generalInfo.password}
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
                minDate={new Date("1920-01-01")}
                maxDate={new Date("2006-01-01")}
                onChange={(date) => handleDateOfBirthChange(date)}
              />
            </LocalizationProvider>

            {/* Gender */}
            <TextField
              name="gender"
              select
              variant="outlined"
              color="primary"
              label="Género"
              fullWidth
              required
              sx={{ width: "60%" }}
              onChange={(event) => handleFieldChange("generalInfo")(event)}
              value={formInputs.generalInfo.gender}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
              <MenuItem value="O">Otro</MenuItem>
            </TextField>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Nationality */}
            <TextField
              name="nationality"
              select
              variant="outlined"
              color="primary"
              label="Nacionalidad"
              fullWidth
              required
              onChange={(event) => handleFieldChange("generalInfo")(event)}
              value={formInputs.generalInfo.nationality}
            >
              {optionsHome.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.isoCode}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Identification document */}
            <TextField
              name="idDocument"
              type="text"
              variant="outlined"
              color="primary"
              label="Documento de identificación"
              fullWidth
              required
              error={errors.idDocument}
              helperText={errors.idDocument && "El documento de identificación no es válido"}
              inputProps={{ maxLength: 10 }}
              onChange={(event) => {handleFieldChange("generalInfo")(event)}}
              value={formInputs.generalInfo.idDocument}
            />

            {/* Phone number */}
            <TextField
              name="phone"
              type="text"
              variant="outlined"
              color="primary"
              label="Teléfono de contacto"
              fullWidth
              required
              error={errors.phone}
              helperText={errors.phone && "El teléfono no es válido"}
              inputProps={{ maxLength: 14 }}
              onChange={(event) => {handleFieldChange("generalInfo")(event)}}
              value={formInputs.generalInfo.phone}
            />
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Tab 2: Residence info */}
          <Title title="Información de residencia" />

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}

            <TextField
              name="country"
              select
              variant="outlined"
              color="primary"
              label="País"
              fullWidth
              required
              onChange={(event) => {
                handlersHome.country(event);
                handleFieldChange("residenceInfo")(event);
              }}
              value={formInputs.residenceInfo.country}
            >
              {optionsHome.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.isoCode}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Province or state */}
            <TextField
              name="state"
              select
              variant="outlined"
              color="primary"
              label="Provincia o estado"
              fullWidth
              required
              onChange={(event) => {
                handlersHome.state(event);
                handleFieldChange("residenceInfo")(event);
              }}
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
              name="city"
              select
              variant="outlined"
              color="primary"
              label="Ciudad"
              fullWidth
              required
              onChange={(event) => {
                handlersHome.city(event);
                handleFieldChange("residenceInfo")(event);
              }}
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
            <TextField
              name="subregion"
              type="text"
              variant="outlined"
              color="primary"
              label="Municipio o condado"
              fullWidth
              required
              inputProps={{ maxLength: 20 }}
              onChange={(event) => handleFieldChange("residenceInfo")(event)}
              value={formInputs.residenceInfo.subregion}
            />

            {/* Sector */}
            <TextField
              name="sector"
              type="text"
              variant="outlined"
              color="primary"
              label="Sector"
              fullWidth
              required
              inputProps={{ maxLength: 20 }}
              onChange={(event) => handleFieldChange("residenceInfo")(event)}
              value={formInputs.residenceInfo.sector}
            />
          </Stack>

          {/* Street */}
          <TextField
            name="street"
            type="text"
            variant="outlined"
            color="primary"
            label="Calle o Avenida"
            fullWidth
            required
            sx={{ mb: 4 }}
            inputProps={{ maxLength: 45 }}
            onChange={(event) => handleFieldChange("residenceInfo")(event)}
            value={formInputs.residenceInfo.street}
          />

          {/* Room or apartment */}
          <TextField
            name="room"
            multiline
            rows={4}
            type="text"
            variant="outlined"
            color="primary"
            label="Habitación o apartamento"
            fullWidth
            required
            sx={{ mb: 4 }}
            inputProps={{ maxLength: 190 }}
            onChange={(event) => handleFieldChange("residenceInfo")(event)}
            value={formInputs.residenceInfo.room}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {/* Tab 3: Work info */}
          <Title title="Datos de la empresa donde trabaja" />

          {/* Company name */}
          <TextField
            name="company"
            type="text"
            variant="outlined"
            color="primary"
            label="Nombre de la empresa"
            fullWidth
            required
            sx={{ mb: 4 }}
            inputProps={{ maxLength: 45 }}
            onChange={(event) => handleFieldChange("workInfo")(event)}
            value={formInputs.workInfo.company}
          />

          <Stack spacing={2} direction="row">
            {/* RIF */}
            <TextField
              name="rif"
              type="text"
              variant="outlined"
              color="primary"
              label="RIF"
              fullWidth
              required
              sx={{ mb: 4 }}
              error={errors.rif}
              helperText={errors.rif && "El RIF no es válido (J-12345678-9)"}
              inputProps={{ maxLength: 12 }}
              onChange={(event) => {handleFieldChange("workInfo")(event)}}
              value={formInputs.workInfo.rif}
            />

            {/* Company phone number */}
            <TextField
              name="phone"
              type="text"
              variant="outlined"
              color="primary"
              label="Telefono de la empresa"
              fullWidth
              required
              sx={{ mb: 4 }}
              error={errors.companyPhone}
              helperText={errors.companyPhone && "El teléfono no es válido"}
              inputProps={{ maxLength: 14 }}
              onChange={(event) => {handleFieldChange("workInfo")(event)}}
              value={formInputs.workInfo.phone}
            />
          </Stack>

          <Stack spacing={3} direction="row" sx={{ mb: 4 }}>
            {/* Country */}
            <TextField
              name="country"
              select
              variant="outlined"
              color="primary"
              label="País"
              fullWidth
              required
              onChange={(event) => {
                handlersWork.country(event);
                handleFieldChange("workInfo")(event);
              }}
              value={formInputs.workInfo.country}
            >
              {optionsWork.countries.map((country: ICountry) => (
                <MenuItem key={country.name} value={country.isoCode}>
                  {country.flag} {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Province or state */}
            <TextField
              name="state"
              select
              variant="outlined"
              color="primary"
              label="Provincia o estado"
              fullWidth
              required
              onChange={(event) => {
                handlersWork.state(event);
                handleFieldChange("workInfo")(event);
              }}
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
              name="city"
              select
              variant="outlined"
              color="primary"
              label="Ciudad"
              fullWidth
              required
              onChange={(event) => {
                handlersWork.city(event);
                handleFieldChange("workInfo")(event);
              }}
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
