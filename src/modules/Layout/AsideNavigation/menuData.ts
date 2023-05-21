import { HomeIcon } from "components/ux/Icons";
import MenuItemInterface from "../types/menuItem.type";
import SERVER_URLS from "utils/serversUrls";

const { URL_DASHBOARD } = SERVER_URLS;

export const menuData: Array<MenuItemInterface> = [
  {
    id: "home-link",
    type: "link",
    href: URL_DASHBOARD,
    leftIcon: HomeIcon,
    text: "Home",
  }
];
