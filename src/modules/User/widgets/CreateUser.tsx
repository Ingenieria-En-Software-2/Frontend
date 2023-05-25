import React,{ useState } from "react";
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import axios from 'axios';
import { useGetUsersQuery, useCreateRoleMutation, useCreateUserMutation } from "../../../api/dbApi";
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
  const [createUser, { data, error, isLoading }] = useCreateUserMutation();
  const [creatingUser, setCreatingUser] = useState(false);
  const [value, setValue] = useState(3);
  const { data: data2, error : error2, isLoading : isLoading2 } = useGetUsersQuery({login: username,});
  const navigate = useNavigate();

  useEffect(() => {
    if (data2) setValue(0);
    if (error) setValue(1);
    if (isLoading2) setValue(2);
  }, [data2, error2, isLoading2]);

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

  function callback_func(object) {

     if (object.login == username) {
        return true;
     }
     return false;
  }

  const handleSubmit = (event) => {
        event.preventDefault()

        setUsernameError(false)
        setUsernameExistsError(false)
        setPasswordError(false)
                          
        if (username == '' || username.length < 8 || username.length > 20 || /^[a-zA-Z][a-zA-Z0-9_]+$/.test(username) == false) {
            setUsernameError(true)
        }
        if (password == '' || password.length<8 || password.length > 16 || /[a-zA-Z0-9/+*^%$&#@?_-]+/.test(password) == false) {
            setPasswordError(true)
        }

        if (usernameError == true || passwordError == true) {
            //If there's an error
            if (usernameError == true && passwordError == true){
              setUsernameError(true)
              setPasswordError(true)
            }
            if (usernameError == true){
              setUsernameError(true)
            }
            if (passwordError == true){
              setPasswordError(true)
            }
        }
        else{
            //If there's not an error anywhere
            var searched_obj = undefined;
            if (data2 != undefined){
              searched_obj = data2.items.find(callback_func);
            }
            if (searched_obj == undefined && error2 != undefined){
              //The username doesnt exist, create it
              setCreatingUser(true);
            }
            else{
              setUsernameExistsError(true);
            }
        }
    }
    const handleChangingPassword = (e) => {
      setPassword(e.target.value)
      setPasswordError(false)
      setUsernameError(false)
      setUsernameExistsError(false)
    }
    const handleChangingUsername = (e) => {
      setUsername(e.target.value)
      setPasswordError(false)
      setUsernameError(false)
      setUsernameExistsError(false)
    }
  return (
    <>
      <div className="main-container">
      <DashboardWrapper>
        <main>
          <DashboardLayoutBasic>
            <>
            <title>Crea una cuenta</title>

            <div style={{marginTop : '10%'}}>
            <h1>Crear una cuenta nueva</h1>
            <div style={{ margin: 25}}/>
            <form autoComplete="off" onSubmit={handleSubmit}>
                      <div style={{textAlign : 'center'}}>
                      <TextField 
                          label="Nombre de usuario"
                          required
                          onChange={e => handleChangingUsername(e)}
                          variant="outlined"
                          color="primary"
                          type="text"
                          helperText = {usernameError ? 'El nombre de usuario debe comenzar en letra y puede contener letras, números y guión bajo. Puede tener de 8 a 20 caracteres.' :
                                        usernameAlreadyExistsError ? 'El nombre de usuario introducido ya existe.' : ' '}
                          value = {username}
                          sx={{ width: 600}}
                          error={usernameError || usernameAlreadyExistsError}
                          id = "username"
                       />
                       <div style={{ margin: 10 }}/>
                       <TextField 
                          label="Contraseña"
                          required
                          onChange={e => handleChangingPassword(e)}
                          variant="outlined"
                          color="primary"
                          type="password"
                          helperText = {passwordError ? 'La contraseña tiene un tamaño de 8 a 16 caracteres. Puede contener letras, números y caracteres especiales.' : ' '}
                          value = {password}
                          sx={{ width: 600}}
                          error={passwordError}
                          id = "password"
                       />
                       <div style={{ margin: 10 }}/>
                       <Button variant="contained" color="primary" type="submit">Registrarse</Button>
                       </div>
                   
              </form>
              </div>
            </>
          </DashboardLayoutBasic>
        </main>
      </DashboardWrapper>
      </div>
      </>

      );
}

export default CreateUser;