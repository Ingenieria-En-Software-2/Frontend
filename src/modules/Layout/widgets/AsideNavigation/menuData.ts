import { HomeIcon, UsersIcon, RolesIcon, AddIcon, CardIcon,SpinnerIcon, SearchIcon} from "components/ux/Icons";
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
  URL_EVENT_LOGGER
} = SERVER_URLS;

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
    leftIcon: SpinnerIcon,
    text: "Logger de Eventos",
  },
];
