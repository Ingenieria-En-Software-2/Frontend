// import banner from "assets/images/banner.jpg";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Link, MenuItem, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Country, State, City, ICountry, IState, ICity } from "country-state-city";
import Title from "components/Title";
import { SignupFormInputs } from "../types/signup";
import { useAddressInputs } from "../hooks/useAddressInputs";
import dayjs, { Dayjs } from "dayjs";

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
      civilStatus: "",
    },
    residenceInfo: { country: "", state: "", city: "", subregion: "", sector: "", street: "", room: "" },
    workInfo: { company: "", rif: "", phone: "", country: "", state: "", city: "", subregion: "" },
  });

  const handleFieldChange =
    (field: keyof SignupFormInputs) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormInputs({
        ...formInputs,
        [field]: {
          ...formInputs[field],
          [name]: value,
        },
      });
    };

  const handleDateOfBirthChange = (date: Dayjs | null) => {
    if (date) {
      setFormInputs({
        ...formInputs,
        generalInfo: {
          ...formInputs.generalInfo,
          dateOfBirth: date.format("MM/DD/YYYY"),
        },
      });
    }
  };

  // };

  // -------------------- Address inputs --------------------
  const { selected: selectedAddressHome, options: optionsHome, handlers: handlersHome } = useAddressInputs();
  const { selected: selectedAddressWork, options: optionsWork, handlers: handlersWork } = useAddressInputs();

  // -------------------- Error states --------------------
  const [generalError, setGeneralError] = useState(false);
  const [errors, setErrors] = useState({
    idDocument: false,
    phone: false,
    rif: false,
    companyPhone: false,
  });

  // -------------------- Submit error --------------------
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessages, setSubmitErrorMessages] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // -------------------- Form submission --------------------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateAll = async () => {
      await validateInput(formInputs.generalInfo.idDocument, /^[VEJGC]-\d{7,8}$/, (value) =>
        setErrors((errors) => ({ ...errors, idDocument: value }))
      );
      await validateInput(formInputs.generalInfo.phone, /^(?:\+)?[0-9]{0,4} ?[0-9]{10}$/, (value) =>
        setErrors((errors) => ({ ...errors, phone: value }))
      );
      await validateInput(formInputs.workInfo.rif, /^[VEJPGvejpg]-\d{7,8}-\d$/, (value) =>
        setErrors((errors) => ({ ...errors, rif: value }))
      );
      await validateInput(formInputs.workInfo.phone, /^(?:\+)?[0-9]{0,4} ?[0-9]{10}$/, (value) =>
        setErrors((errors) => ({ ...errors, companyPhone: value }))
      );
    };

    await validateAll();

    if (generalError) return;
    else {
      // Country and state are in code format, so we need to get the name
      const res_country = Country.getCountryByCode(formInputs.residenceInfo.country) ?? { name: NaN };
      const res_state = State.getStateByCodeAndCountry(
        formInputs.residenceInfo.state,
        formInputs.residenceInfo.country
      ) ?? { name: "" };
      const work_country = Country.getCountryByCode(formInputs.workInfo.country) ?? { name: NaN };
      const work_state = State.getStateByCodeAndCountry(formInputs.workInfo.state, formInputs.workInfo.country) ?? {
        name: "",
      };
      const nationality = Country.getCountryByCode(formInputs.generalInfo.nationality) ?? { name: NaN };

      // Format birthdate to MM-DD-YYYY
      const birthdate = formInputs.generalInfo.dateOfBirth.split("/");
      const birthdateFormatted = `${birthdate[0]}-${birthdate[1]}-${birthdate[2]}`;

      const object = {
        id_number: formInputs.generalInfo.idDocument,
        gender: formInputs.generalInfo.gender,
        civil_status: formInputs.generalInfo.civilStatus,
        birthdate: birthdateFormatted,
        phone: formInputs.generalInfo.phone,
        nationality: nationality.name,
        street: formInputs.residenceInfo.street,
        sector: formInputs.residenceInfo.sector,
        city: formInputs.residenceInfo.city,
        country: res_country.name,
        province: res_state.name,
        township: formInputs.residenceInfo.subregion,
        address: formInputs.residenceInfo.room,
        employer_name: formInputs.workInfo.company,
        employer_rif: formInputs.workInfo.rif,
        employer_city: formInputs.workInfo.city,
        employer_country: work_country.name,
        employer_province: work_state.name,
        employer_township: formInputs.workInfo.subregion,
        employer_address: formInputs.workInfo.subregion,
        employer_phone: formInputs.workInfo.phone,
        login: formInputs.generalInfo.email,
        name: formInputs.generalInfo.names,
        lastname: formInputs.generalInfo.surnames,
        role_id: 1,
        user_type: "interno",
      };
      console.log(object);

      // TO-DO: Modify this jeje
      const url = `http://localhost:${import.meta.env.VITE_API_URL}/api/account_holder`;
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const data = await response.json();

      // Si se registra exitosamente retorna {"id": <id>},
      // Si algun campo no cumple el patron especificado {"errors": { ... }}

      if (data.id) {
        setSubmitSuccess(true);
        setSubmitError(false);
        setSubmitErrorMessages([]);
      } else {
        setSubmitError(true);
        setSubmitErrorMessages(Object.values(data.errors));
      }
    }
  };

  useEffect(() => {
    setGeneralError(Object.values(errors).some((value) => value));
  }, [errors]);

  return (
    <>
      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="signup tabs">
        <Tab label="Información general" {...allyProps(0)} />
        <Tab label="Dirección" {...allyProps(1)} />
        <Tab label="Datos de contacto" {...allyProps(2)} />
      </Tabs>
      {generalError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Ha ocurrido un error. Por favor, revise los campos e intente de nuevo.
        </Typography>
      )}
      {!generalError && submitError && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {submitErrorMessages.map((message) => (
            <div>{message}</div>
          ))}
        </Typography>
      )}
      {submitSuccess && (
        <Typography variant="body2" color="success" sx={{ mt: 2 }}>
          Registro exitoso.
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TabPanel value={tabValue} index={0}>
          {/* Tab 1: General info */}
          <Title title="Información general" />
          {/* Email */}
          <Stack spacing={2} direction="row">
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
          </Stack>

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
              minDate={dayjs().subtract(100, "year")}
              maxDate={dayjs().subtract(18, "year")}
              onChange={(date: Dayjs | null) => handleDateOfBirthChange(date)}
              sx={{ width: "100%", mb: 3 }}
            />
          </LocalizationProvider>

          <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
            {/* Civil status */}
            <TextField
              name="civilStatus"
              select
              variant="outlined"
              color="primary"
              label="Estado civil"
              fullWidth
              required
              sx={{ width: "60%" }}
              onChange={(event) => handleFieldChange("generalInfo")(event)}
              value={formInputs.generalInfo.civilStatus}
            >
              <MenuItem value="S">Soltero</MenuItem>
              <MenuItem value="C">Casado</MenuItem>
              <MenuItem value="D">Divorciado</MenuItem>
              <MenuItem value="V">Viudo</MenuItem>
            </TextField>

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
              helperText={errors.idDocument && "El documento de identificación no es válido (V-267890123)"}
              inputProps={{ maxLength: 10 }}
              onChange={(event) => {
                handleFieldChange("generalInfo")(event);
              }}
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
              onChange={(event) => {
                handleFieldChange("generalInfo")(event);
              }}
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
              onChange={(event) => {
                handleFieldChange("workInfo")(event);
              }}
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
              helperText={errors.companyPhone && "El teléfono no es válido (+58412000000)"}
              inputProps={{ maxLength: 14 }}
              onChange={(event) => {
                handleFieldChange("workInfo")(event);
              }}
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

          {/* Subregion */}
          <TextField
            name="subregion"
            type="text"
            variant="outlined"
            color="primary"
            label="Municipio o condado"
            fullWidth
            required
            inputProps={{ maxLength: 20 }}
            onChange={(event) => handleFieldChange("workInfo")(event)}
            value={formInputs.workInfo.subregion}
            sx={{ mb: 4 }}
          />
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
      <small className="mt-3 text-sm text-gray-600">
        ¿Ya tienes una cuenta?
        <Link href="/login" underline="hover" sx={{ ml: 3 }}>
          Inicia sesión
        </Link>
      </small>
    </>
  );
};

export default SignupForm;
