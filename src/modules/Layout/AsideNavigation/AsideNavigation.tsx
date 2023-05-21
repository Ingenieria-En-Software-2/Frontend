import React, { useEffect, Dispatch } from "react";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import { useLocation } from "react-router-dom";

import { menuData } from "./menuData";

import { CircleIcon } from "components/ux/Icons";

type Props = {
  collapse: boolean;
  collapseLayout: Dispatch<boolean>;
  open?: boolean;
};

export default function AsideNavigation({ collapse, collapseLayout }: Props) {
  let location = useLocation();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  useEffect(() => {
    if (!collapse) return;
    setExpanded(false);
  }, [collapse]);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    collapseLayout(false);
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <MenuList className={`${"height-7/10 pt-0 overflow-hidden text-gray-200"}`}>
        {!collapse &&
          menuData.map((menuItem, i) => {
            console.log(`/${location.pathname.split("/", 2)[1]}` === menuItem.href, menuItem.href, `/${location.pathname.split("/", 2)[1]}`);
            return menuItem.type == "link" ? (
              <a key={`menu-item-${i}`} href={menuItem.href ?? ""}>
                <MenuItem>
                  <ListItemIcon>
                    <menuItem.leftIcon className={`${`/${location.pathname.split("/", 2)[1]}` === menuItem.href ? "text-blue-600" : "text-slate-500"} text-left`} />
                  </ListItemIcon>
                  <ListItemText className={`${`/${location.pathname.split("/", 2)[1]}` === menuItem.href ? "text-blue-600" : "text-slate-500"} text-left`}>{menuItem.text}</ListItemText>
                </MenuItem>
              </a>
            ) : (
              <Accordion key={`menu-item-${i}`} disableGutters={true} className={"bg-transparent shadow-none"} expanded={expanded === menuItem.id || menuItem.subMenu?.find((subMenuItem) => subMenuItem.href === location.pathname) !== undefined} onChange={handleChange(menuItem.id)}>
                <AccordionSummary>
                  <MenuItem>
                    <ListItemIcon>
                      <menuItem.leftIcon className={`${`/${location.pathname.split("/", 2)[1]}` === menuItem.href ? "text-blue-600" : "text-slate-500"} text-left`} />
                    </ListItemIcon>
                    <ListItemText className={`${`/${location.pathname.split("/", 2)[1]}` === menuItem.href ? "text-blue-600" : "text-slate-500"} text-left`}>{menuItem.text}</ListItemText>
                  </MenuItem>
                </AccordionSummary>
                <AccordionDetails>
                  <MenuList>
                    {menuItem.subMenu?.map((subItem, j) => (
                      <a key={`submenu-item-${j}`} href={subItem.href ?? ""}>
                        <MenuItem>
                          <ListItemText className={`${`/${location.pathname.split("/", 2)[1]}` === menuItem.href ? "text-blue-600" : "text-slate-500"} text-left`}>
                            {location.pathname === subItem.href && <CircleIcon />} {subItem.text}
                          </ListItemText>
                        </MenuItem>
                      </a>
                    ))}
                  </MenuList>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </MenuList>
    </>
  );
}
