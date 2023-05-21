import { HomeIcon } from "components/ux/Icons";
import MenuItemInterface from "../../types/menuItem.type";
import SERVER_URLS from "utils/serversUrls";

const { URL_HOME } = SERVER_URLS;

export const menuData: Array<MenuItemInterface> = [
  {
    id: "home-link",
    type: "link",
    href: URL_HOME,
    leftIcon: HomeIcon,
    text: "Home",
  }
];
