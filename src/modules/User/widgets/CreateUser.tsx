import React,{ useState } from "react";
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
        event.preventDefault()

        setUsernameError(false)
        setPasswordError(false)
                          
        if (username == '' || username.length < 8 || username.length > 20 || /^[a-zA-Z][a-zA-Z0-9_]+$/.test(username) == false) {
            setUsernameError(true)
        }
        if (password == '' || password.length<8 || password.length > 16 || /[a-zA-Z0-9/+*^%$&#@?_-]+/.test(password) == false) {
            setPasswordError(true)
        }

        if (usernameError == true || passwordError == true) {
            //If there's an error
            console.log(username, password)
        }
        else{
            //If there's not an error anywhere
            console.log(username)
        }
    }
    const handleChangingPassword = (e) => {
      setPassword(e.target.value)
      setPasswordError(false)
      setUsernameError(false)
    }
    const handleChangingUsername = (e) => {
      setUsername(e.target.value)
      setPasswordError(false)
      setUsernameError(false)
    }
  return (
    <>
      <div className="main-container">
      <DashboardWrapper>
        <main>
          <DashboardLayoutBasic>
            <>
            <title>Create a User</title>

            <div style={{marginTop : '10%'}}>
            <h1>Signing Up</h1>
            <div style={{ margin: 25}}/>
            <form autoComplete="off" onSubmit={handleSubmit}>
                      <div style={{textAlign : 'center'}}>
                      <TextField 
                          label="Username"
                          required
                          onChange={e => handleChangingUsername(e)}
                          variant="outlined"
                          color="primary"
                          type="text"
                          helperText = {usernameError ? 'The username can only start with a letter and can contain letters, numbers and underscore.' : ' '}
                          value = {username}
                          sx={{ width: 600}}
                          error={usernameError}
                       />
                       <div style={{ margin: 10 }}/>
                       <TextField 
                          label="Password"
                          required
                          onChange={e => handleChangingPassword(e)}
                          variant="outlined"
                          color="primary"
                          type="password"
                          helperText = {passwordError ? 'The password needs a length between 8 and 16 characters.' : ' '}
                          value = {password}
                          sx={{ width: 600}}
                          error={passwordError}
                       />
                       <div style={{ margin: 10 }}/>
                       <Button variant="contained" color="primary" type="submit">Sign Up</Button>
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