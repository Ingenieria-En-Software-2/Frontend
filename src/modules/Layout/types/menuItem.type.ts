export default interface MenuItemInterface {
  id: string;
  type: string;
  href?: string;
  leftIcon?: any;
  text: string;
  subMenu?: Array<SubItemInterface>;
}

interface SubItemInterface {
  type: string;
  href: string;
  leftIcon?: any;
  text: string;
}
