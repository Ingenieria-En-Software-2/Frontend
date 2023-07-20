import {
  HomeIcon,
  UsersIcon,
  RolesIcon,
  AddIcon,
  CardIcon,
  SpinnerIcon,
  SearchIcon,
  EventIcon,
} from "components/ux/Icons";
import MenuItemInterface from "../../types/menuItem.type";
import SERVER_URLS from "utils/serversUrls";

const {
  URL_HOME,
  URL_USER_PROFILES,
  URL_USER_ROLES,
  URL_CREATE_ACCOUNT,
  URL_NEW_TRANSACTIONS,
  URL_SAVINGS_TRANSACTION,
  URL_CHECKING_TRANSACTION,
  URL_DAILY_TRANSACTIONS,
  URL_PAGO_MOVIL,
  URL_EVENT_LOGGER,
  URL_CREATE_RECIPIENT_AFFILIATION,
} = SERVER_URLS;


import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";


export async function getCurrentRole() {
  const URL_USER_ROLE_BACKEND = `${import.meta.env.VITE_API_URL}/user`
  try {
      const response = await axios({
          method: 'put',
          url: URL_USER_ROLE_BACKEND,
          headers: {
              Authorization : `Bearer ${Cookies.get("auth.auth_token")}`
          }
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

const gettingCurrentRole = await getCurrentRole();
const currentRole = gettingCurrentRole.role;

export const data = [
  {
    id: "home-link",
    type: "link",
    href: URL_HOME,
    leftIcon: HomeIcon,
    text: "Home",
  },
  {
    id: "users-link",
    type: "link",
    href: URL_USER_PROFILES,
    leftIcon: UsersIcon,
    text: "Perfiles de Usuarios",
  },
  {
    id: "roles-link",
    type: "link",
    href: URL_USER_ROLES,
    leftIcon: RolesIcon,
    text: "Roles de Usuarios",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_CREATE_ACCOUNT,
    leftIcon: AddIcon,
    text: "Crear Cuenta",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_NEW_TRANSACTIONS,
    leftIcon: AddIcon,
    text: "Nueva Transacción",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_SAVINGS_TRANSACTION,
    leftIcon: CardIcon,
    text: "Cuenta Ahorro",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_CHECKING_TRANSACTION,
    leftIcon: CardIcon,
    text: "Cuenta Corriente",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_DAILY_TRANSACTIONS,
    leftIcon: SearchIcon,
    text: "Transacciones Diarias",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_PAGO_MOVIL,
    leftIcon: SpinnerIcon,
    text: "Pago Móvil",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_EVENT_LOGGER,
    leftIcon: EventIcon,
    text: "Logger de Eventos",
  },
  {
    id: "mobile-payment-link",
    type: "link",
    href: URL_CREATE_RECIPIENT_AFFILIATION,
    leftIcon: UsersIcon,
    text: "Afiliación de Destinatarios",
  },
];

function dataSelected() {
  var dataForMenu = []
  if (currentRole == 1){
    //perfiles roles crear cuenta reversar
    dataForMenu = [data[0],data[1],data[2],data[7]]
  }
  if (currentRole == 2){
    //roles ahorro corriente transferencias pagomovil
    dataForMenu = [data[0],data[3],data[4],data[5],data[6],data[8]]
  }
  return dataForMenu;
}

export const menuData: Array<MenuItemInterface> = dataSelected()

/*[
  {
    id: "home-link",
    type: "link",
    href: URL_HOME,
    leftIcon: HomeIcon,
    text: "Home",
  },
  {
    id: "users-link",
    type: "link",
    href: URL_USER_PROFILES,
    leftIcon: UsersIcon,
    text: "Perfiles de Usuarios",
  },
  {
    id: "roles-link",
    type: "link",
    href: URL_USER_ROLES,
    leftIcon: RolesIcon,
    text: "Roles de Usuarios",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_CREATE_ACCOUNT,
    leftIcon: AddIcon,
    text: "Crear Cuenta",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_NEW_TRANSACTIONS,
    leftIcon: AddIcon,
    text: "Nueva Transacción",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_SAVINGS_TRANSACTION,
    leftIcon: CardIcon,
    text: "Cuenta Ahorro",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_CHECKING_TRANSACTION,
    leftIcon: CardIcon,
    text: "Cuenta Corriente",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_DAILY_TRANSACTIONS,
    leftIcon: SearchIcon,
    text: "Transacciones Diarias",
  },
  {
    id: "create-account-link",
    type: "link",
    href: URL_PAGO_MOVIL,
    leftIcon: SpinnerIcon,
    text: "Pago Móvil",
  },
];*/
