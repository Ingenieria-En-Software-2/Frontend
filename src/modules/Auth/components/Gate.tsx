import React, { useState, useEffect } from "react";
import { getRouteConfig, getDevelopRouteConfig, isAllowedRoute, isDeveloperRoute } from "../utils/gate";
import { getAuthFromCookie, setAppContextAuth } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import ForbidenRoute from "components/ForbidenRoute";
import { SERVER_URLS } from "utils/serversUrls";
import { useDispatch } from "react-redux";
import getStore from "context/store/createStore";

const { URL_HOME, URL_LOGIN } = SERVER_URLS;

type Props = {
  children: React.ReactNode;
};

const Gate = ({ children }: Props) => {
  const [forbidden, setForbidden] = useState<boolean | undefined>(undefined);
  const router = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const appState = getStore().getState();

  useEffect(() => {
    console.log(appState);
    const routeConfig = getRouteConfig(router.pathname);
    const developRouteConfig = getDevelopRouteConfig(router.pathname);
    const authFromCookie = getAuthFromCookie();
    if (authFromCookie) {
      //Authenticated
      if (!appState.auth.auth_token || appState.auth.auth_token != authFromCookie.auth_token) {
        setAppContextAuth(authFromCookie, dispatch);
      }
      if (!appState.user.id || appState.user.id === "") {
        //TODO: get self user through endpoint
      } else if (routeConfig.isPrivate) {
        //Fully Authenticated and tryig to view private resource: Let me check your credentials.
        const isAllowed = isAllowedRoute(appState.user, routeConfig);
        setForbidden(!isAllowed);
      } else if (developRouteConfig.isPrivate) {
        const isDeveloper = isDeveloperRoute(appState.user, developRouteConfig);
        setForbidden(!isDeveloper);
      } else if (router.pathname == URL_LOGIN) {
        //Fully Authenticated and trying to view login page? C'mon, get in
        navigate(URL_HOME);
      } else setForbidden(false); //Fully Authenticated and trying to view public resource. Please, come in.
    } else if (routeConfig.isPrivate || developRouteConfig.isPrivate) {
      //Unauthenticated and tryig to view private resource. Go to Login, please.
      navigate(URL_LOGIN);
    } else setForbidden(false); //Unauthenticated and trying to view public resource. Please, come in.
  }, [appState, router.pathname, dispatch, navigate]);

  return <>{forbidden === undefined ? null : forbidden ? <ForbidenRoute /> : children}</>;
};

export default Gate;
