import type { UserInterface } from "types/appContext.type";

import { routesConfig } from "./routes.config";
import { developRoutesConfig } from "./developroutes.config";
import { routeConfigInterface } from "types/routeConfig.type";

export const getRouteConfig = (path: string): routeConfigInterface => {
  let routeConfig = routesConfig.privateRoutes.find((routeConfig) => routeConfig.routeRegExp.test(path));
  return routeConfig ? { ...routeConfig, isPrivate: true, route: "" } : { route: path, isPrivate: false };
};

export const getDevelopRouteConfig = (path: string): routeConfigInterface => {
  let developRouteConfig = developRoutesConfig.developRoutes.find((developRoutesConfig) =>
    developRoutesConfig.routeRegExp.test(path)
  );
  return developRouteConfig ? { ...developRouteConfig, isPrivate: true, route: "" } : { route: path, isPrivate: false };
};

export const isAllowedRoute = (user: UserInterface, route_config: routeConfigInterface): boolean => {
  //TODO: Check route configuration and user role and grant or revoke access
  return true;
};

export const isDeveloperRoute = (user: UserInterface, route_config: routeConfigInterface): boolean => {
  //TODO: Check if user is a developer and allow or revoke access
  return false;
};

export const isPrivateRoute = (path: string): boolean => {
  return routesConfig.privateRoutes.some((routeConfig) => routeConfig.routeRegExp.test(path));
};
