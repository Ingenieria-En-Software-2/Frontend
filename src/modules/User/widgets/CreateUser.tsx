import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import { useGetUsersQuery, useCreateUserMutation } from "services/dbApi";
import { useEffect } from "react";

import SERVER_URLS from "utils/serversUrls.ts";
const { URL_HOME } = SERVER_URLS;
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameAlreadyExistsError, setUsernameExistsError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [createUser, {}] = useCreateUserMutation(); //
  const [creatingUser, setCreatingUser] = useState(false);
  const { data: data2, error: error2 } = useGetUsersQuery({ login: username });
  const navigate = useNavigate();

  useEffect(() => {
    if (!creatingUser) return;
    createUser({
      login: username,
      password: password,
      name: "",
      lastname: "",
      user_type: "user",
      role_id: 2,
    });
    navigate(URL_HOME);
  }, [creatingUser]);

  function callback_func(object: any) {
    if (object.login == username) {
      return true;
    }
    return false;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setUsernameError(false);
    setUsernameExistsError(false);
    setPasswordError(false);

    var pass_e = false;
    var user_e = false;

    if (
      username == "" ||
      username.length < 8 ||
      username.length > 20 ||
      /^[a-zA-Z][a-zA-Z0-9_]+$/.test(username) == false
    ) {
      setUsernameError(true);
      user_e = true;
    }
    if (
      password == "" ||
      password.length < 8 ||
      password.length > 16 ||
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,16}/.test(password) == false
    ) {
      setPasswordError(true);
      pass_e = true;
    }

    if (pass_e == true || user_e == true) {
      //If there's an error
      if (user_e == true && pass_e == true) {
        setUsernameError(true);
        setPasswordError(true);
      }
      if (user_e == true) {
        setUsernameError(true);
      }
      if (pass_e == true) {
        setPasswordError(true);
      }
    }
    if (user_e == false && pass_e == false) {
      //If there's not an error anywhere
      var searched_obj = undefined;
      if (data2 != undefined) {
        searched_obj = data2.items.find(callback_func);
      }
      if (searched_obj == undefined && error2 != undefined) {
        //The username doesnt exist, create it
        setCreatingUser(true);
      } else {
        setUsernameExistsError(true);
      }
    }
  };
  const handleChangingPassword = (e: any) => {
    setPassword(e.target.value);
    setPasswordError(false);
    setUsernameError(false);
    setUsernameExistsError(false);
  };
  const handleChangingUsername = (e: any) => {
    setUsername(e.target.value);
    setPasswordError(false);
    setUsernameError(false);
    setUsernameExistsError(false);
  };
  return (
    <>
      <div className="main-container">
        <DashboardWrapper>
          <main>
            <DashboardLayoutBasic>
              <title>Crea una cuenta</title>

              <div style={{ marginTop: "10%" }}>
                <h1>Crear una cuenta nueva</h1>
                <div style={{ margin: 25 }} />
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div style={{ textAlign: "center" }}>
                    <TextField
                      label="Nombre de usuario"
                      required
                      onChange={(e) => handleChangingUsername(e)}
                      variant="outlined"
                      color="primary"
                      type="text"
                      helperText={
                        usernameError
                          ? "El nombre de usuario debe comenzar en letra y puede contener letras, números y guión bajo. Puede tener de 8 a 20 caracteres."
                          : usernameAlreadyExistsError
                          ? "El nombre de usuario introducido ya existe."
                          : " "
                      }
                      value={username}
                      sx={{ width: 600 }}
                      error={usernameError || usernameAlreadyExistsError}
                      id="username"
                    />
                    <div style={{ margin: 10 }} />
                    <TextField
                      label="Contraseña"
                      required
                      onChange={(e) => handleChangingPassword(e)}
                      variant="outlined"
                      color="primary"
                      type="password"
                      helperText={
                        passwordError
                          ? "La contraseña tiene un tamaño de 8 a 16 caracteres. Puede contener letras, números y caracteres especiales."
                          : " "
                      }
                      value={password}
                      sx={{ width: 600 }}
                      error={passwordError}
                      id="password"
                    />
                    <div style={{ margin: 10 }} />
                    <Button variant="contained" color="primary" type="submit">
                      Registrarse
                    </Button>
                  </div>
                </form>
              </div>
            </DashboardLayoutBasic>
          </main>
        </DashboardWrapper>
      </div>
    </>
  );
};

export default CreateUser;
