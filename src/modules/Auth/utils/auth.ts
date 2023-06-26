import Cookies from "js-cookie";
import isJWT from "validator/lib/isJWT";

import type { Action } from "types/appContext.type";

import type { AuthInterface, UserInterface } from "types/appContext.type";
import { AnyAction } from "redux";

export const getAuthFromCookie = (): AuthInterface | undefined => {
  const accessToken_ = Cookies.get("auth.auth_token");
  const refreshToken_ = Cookies.get("auth.refresh_token");
  return accessToken_ && isJWT(accessToken_) && refreshToken_ && isJWT(refreshToken_)
    ? {
        auth_token: accessToken_,
        refresh_token: refreshToken_,
      }
    : undefined;
};

export const setAppContextAuth = (auth: AuthInterface, dispatch: React.Dispatch<Action | AnyAction>) => {
  Cookies.set("auth.auth_token", auth.auth_token);
  Cookies.set("auth.refresh_token", auth.refresh_token);
  dispatch({ type: "AUTHENTICATE", payload: auth });
};

export const setAppContextUser = (user: UserInterface, dispatch: React.Dispatch<AnyAction | Action>) => {
  dispatch({ type: "SET_USER", payload: user });
};
