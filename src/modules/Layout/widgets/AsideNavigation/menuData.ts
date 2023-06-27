import { HomeIcon, UsersIcon, RolesIcon, AddIcon } from "components/ux/Icons";
import MenuItemInterface from "../../types/menuItem.type";
import SERVER_URLS from "utils/serversUrls";

const { URL_HOME, URL_USER_PROFILES, URL_USER_ROLES, URL_CREATE_ACCOUNT } = SERVER_URLS;

export const menuData: Array<MenuItemInterface> = [
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
];
