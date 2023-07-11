import React, { useState, useEffect } from "react";
import banner from "assets/images/banner.png";

import type ValidationErrorsDict from "utils/validate/types/ValidationErrorsDict.type";
import type ValidationError from "utils/validate/types/validationError.type";
// import type LoginRequest from "../types/loginRequest.type";
import ExceptionHandler from "components/ExceptionHandler";

import { CheckIcon, ErrorIcon, EyeFillIcon } from "components/ux/Icons";
import { Button, FormHelperText, TextField } from "@mui/material";

import SERVER_URLS from "utils/serversUrls";
import validate from "utils/validate/validate";
// import { useGetUsersQuery } from "services/dbApi";
import { useNavigate } from "react-router-dom";

const { URL_USER_PROFILES, URL_SIGNUP } = SERVER_URLS;

import { useDispatch } from "react-redux";
import { setAppContextAuth } from "../utils/auth";

import Cookies from "js-cookie";

const LogInWidget = () => {
  const navigate = useNavigate();

  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<ValidationErrorsDict>({});
  const [showFormErrorWidget, setShowFormErrorWidget] = useState<boolean>(false);
  const [showApiResponseErrorWidget, setShowApiResponseErrorWidget] = useState<boolean>(false);
  // const [showForgotPasswordWidget, setShowForgotPasswordWidget] = useState<boolean>(false);
  const [listenCheckData, setListenCheckData] = useState<boolean>(false);
  const [listenCheckDataTimer, setListenCheckDataTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordInputType, setPasswordInputType] = useState<string>("password");
  const [hide, setHide] = useState<boolean>(false);
  const [openExceptionHandler, setOpenExceptionHandler] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  type ErrorMessages = typeof initErrorHandler;
  const initErrorHandler = {
    title: "Ups! Algo falló",
    description: "Parece que algo fue mal iniciando sesión. Revise su data.",
  };
  const [errorHandlerMessages, setErrorHandlerMessages] = useState<ErrorMessages>(initErrorHandler);

  // const { data, error, isLoading } = useGetUsersQuery({ login: email });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!hide) return;

    const timer = setTimeout(() => {
      setListenCheckData(false);
      setHide(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [hide]);

  useEffect(() => {
    if (!listenCheckData) return;
    listenCheckDataTimer ? clearTimeout(listenCheckDataTimer) : null;
    const timer = setTimeout(() => {
      checkData();
    }, 500);
    setListenCheckDataTimer(timer);
    return () => {
      clearTimeout(timer);
      listenCheckDataTimer ? clearTimeout(listenCheckDataTimer) : null;
    };
  }, [email, password]);

  useEffect(() => {
    if (showApiResponseErrorWidget) setShowFormErrorWidget(false);
  }, [showApiResponseErrorWidget]);

  useEffect(() => {
    if (showFormErrorWidget) setShowApiResponseErrorWidget(false);
  }, [showFormErrorWidget]);

  useEffect(() => {
    if (!loginSuccess) return;
    const timer = setTimeout(() => {
      navigate(URL_USER_PROFILES);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loginSuccess, navigate]);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) setErrorMessage(null);
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) setErrorMessage(null);
    setPassword(e.currentTarget.value);
  };

  const checkData = (previousErrors: ValidationErrorsDict = {}) => {
    let formErrors_: ValidationErrorsDict = { ...previousErrors };
    const addError = (error: ValidationError) => {
      formErrors_ = { ...formErrors_, [error.field]: [...(formErrors_[error.field] ?? []), error] };
    };

    // const emailValidation = validate.email(email);
    // if (emailValidation.hasErrors) emailValidation.errors?.forEach((error) => addError(error));

    // const passwordValidation = validate.password(password);
    // if (passwordValidation.hasErrors) passwordValidation.errors?.forEach((error) => addError(error));

    setFormErrors(formErrors_);
    if (Object.keys(formErrors_).length == 0) {
      setShowFormErrorWidget(false);
      return true;
    }
    setListenCheckData(true);
    return false;
  };

  const handleCloseExceptionHandler = (event?: React.SyntheticEvent | Event, reason?: string) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }

    setOpenExceptionHandler(false);
    setErrorHandlerMessages({
      title: "Ups! Algo falló",
      description: "Parece que algo fue mal iniciando sesión. Revise su data.",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowApiResponseErrorWidget(false);

    // if (checkData()) {
    //   setListenCheckData(false);
    //   // const requestData: LoginRequest = { email: email, password: password };
    //   let responseError = null;
    //   if (data && !isLoading) {
    //     const responseData: any = data;
    //     const user = responseData.items.find((user: any) => user.login === email);
    //     if (!user) {
    //       responseError = { data: { field: "email", message: "No existe un user con ese email" } };
    //     }

    //     /* if (user && user.password !== password) {
    //       responseError = { data: { field: "password", message: "Contraseña incorrecta" } };
    //     } */
    //   }

    //   if (responseError) {
    //     setErrorMessage(responseError.data.message);
    //   } else {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: email,
        password: password,
      }),
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, opts)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          setLoginSuccess(true);
          return resp.json();
        }
        if (resp.status === 401) {
          setOpenExceptionHandler(true);
          setErrorHandlerMessages({
            title: "Falló el login",
            description: "La contraseña o el correo son incorrectos.",
          });
        }
        if (resp.status === 400) {
          setOpenExceptionHandler(true);
          setErrorHandlerMessages({
            title: "Falló el login",
            description: "El correo no ha sido verificado, se le ha enviado nuevamente un correo de verificación.",
          });
        }
        if (resp.status === 500) {
          setOpenExceptionHandler(true);
          setErrorHandlerMessages({ title: "Falló el login", description: "Intenta de nuevo." });
        }
      })
      .then((data) => {
        if (data != undefined) {
          setAppContextAuth(data, dispatch);
        }
      });
  };

  //     if (error) {
  //       setOpenExceptionHandler(true);
  //     }
  //   } else {
  //     setShowFormErrorWidget(true);
  //   }
  // };

  return (
    <div className={"w-full h-full flex flex-col justify-center items-center flex-1"}>
      <div className={"mb-[2em] max-w-[40em]"}>
        <img className="w-full" src={banner} />
      </div>
      <div
        className={`${"flex w-full relative overflow-hidden justify-center items-center bg-white max-w-[39.5em] max-h-[26em] h-[26em] rounded-2xl shadow"} ${
          hide ? "pointer-events-none animate-sweetDisappear" : ""
        }`}
      >
        <div className={`${"w-full h-full flex flex-col items-center justify-center absolute"}`}>
          {!loginSuccess && (
            <>
              <div className={"w-full flex flex-col items-center justify-center mb-[1em]"}>
                <h2 className="m-0 font-bold text-4xl text-[#0e7490]">Iniciar Sesión</h2>
              </div>
              <form
                className={"w-full flex flex-col items-center justify-center px-[1.5em] py-[1.7em]"}
                onSubmit={handleSubmit}
              >
                <div className={"w-full flex flex-row items-start justify-between relative text-left mb-[1.8em]"}>
                  <TextField
                    className={`${"w-full"} ${
                      formErrors.email?.length > 0 ? "text-red-700 border boder-solid border-red-700" : ""
                    }`}
                    error={formErrors.email?.length > 0}
                    helperText={"email" in formErrors ? String(formErrors.email[0].message) : null}
                    label={"Email"}
                    value={email}
                    focused={email ? !!email : undefined}
                    onChange={handleChangeEmail}
                    variant="outlined"
                  />
                </div>
                <div className={"w-full flex flex-row items-start justify-between relative text-left mb-[1.8em]"}>
                  <TextField
                    className={`${"w-full"} ${
                      formErrors.password?.length > 0 ? "text-red-700 border boder-solid border-red-700" : ""
                    }`}
                    type={passwordInputType}
                    error={formErrors.password?.length > 0}
                    helperText={"password" in formErrors ? String(formErrors.password[0].message) : null}
                    label={"Contraseña"}
                    value={password}
                    focused={password ? !!password : undefined}
                    onChange={handleChangePassword}
                    variant="outlined"
                  />
                  <div
                    className={
                      "absolute cursor-pointer text-gray-600 flex items-center right-4 h-[3.8em] opacity-60 hover:opacity-100"
                    }
                    onMouseDown={() => setPasswordInputType("text")}
                    onMouseUp={() => setPasswordInputType("password")}
                    onTouchStart={() => setPasswordInputType("text")}
                    onTouchEnd={() => setPasswordInputType("password")}
                  >
                    <EyeFillIcon />
                  </div>
                </div>
                <div className={"flex w-full justify-start"}>
                  <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
                </div>
                <Button className={"w-full rounded-xl h-[3em]"} type="submit">
                  Iniciar sesión
                </Button>
                {/* Botón para registrarse */}
                <div className={"w-full flex flex-row items-center justify-center mt-[1.5em]"}>
                  <p className={"text-sm text-gray-600"}>¿No tienes cuenta?</p>
                  <Button href={URL_SIGNUP} className={"ml-[0.5em] text-sm text-[#0e7490]"}>
                    Regístrate
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
        <ExceptionHandler
          open={loginSuccess}
          icon={<CheckIcon className={"mb-14 text-[5em] text-[#0e7490]"} />}
          title={"Inicio de sesión exitoso"}
          description={"Espere a ser redirigido"}
        />
        <ExceptionHandler
          open={openExceptionHandler}
          onClose={handleCloseExceptionHandler}
          icon={<ErrorIcon className={"mb-14 text-[5em] text-red-700"} />}
          title={errorHandlerMessages.title}
          description={errorHandlerMessages.description}
          btnText={"Reintentar"}
        />
      </div>
    </div>
  );
};

export default LogInWidget;
