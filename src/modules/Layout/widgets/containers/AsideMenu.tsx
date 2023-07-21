import { useEffect, useState } from "react";

import { useDashboardLayoutContext } from "../../context/dashboardLayout";
import AsideNavigation from "../AsideNavigation/AsideNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuIcon, ArrowLeftLineIcon, RightBracketIcon } from "components/ux/Icons";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SERVER_URLS from "utils/serversUrls";

const { URL_HOME } = SERVER_URLS;

type p = Record<string, never>;
interface Props {
  prop: p;
  backDropCallBack: boolean;
}

export default function AsideMenu({ prop, backDropCallBack }: Props) {
  const { state, dispatch } = useDashboardLayoutContext();
  const lg = useMediaQuery("(max-width:1279px)");
  const navigate = useNavigate();

  const collapseLayout = (state: boolean) => {
    if (state) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  };

  useEffect(() => {
    if (lg) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  }, [lg, dispatch]);

  const signOut = async () => {
    Cookies.remove("auth.auth_token");
    Cookies.remove("auth.refresh_token");
    backDropCallBack(true);
    const timer = setTimeout(() => {
      navigate(URL_HOME);
    }, 600);
  };

  return (
    <aside
      className={`${"fixed left-0 bottom-0 top-0 bg-white shadow-md"} ${state.asideMenu.collapse ? "w-0" : "w-72"}`}
    >
      <div className={"h-[3em] flex flex-col justify-center items-end"}>
        <button
          className={`${"p-1 text-grey-700 absolute top-2"} ${
            state.asideMenu.collapse ? "left-2 right-auto" : "right-0.5"
          }`}
          onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
        >
          {state.asideMenu.collapse ? <MenuIcon /> : <ArrowLeftLineIcon />}
        </button>
      </div>

      <AsideNavigation collapseLayout={collapseLayout} collapse={state.asideMenu.collapse as boolean} />

      <div className={`${"p-20 text-grey-400 left top-100"} ${state.asideMenu.collapse ? null : null}`}>
        <button className={`${"p-1 top-100"} ${state.asideMenu.collapse ? null : null}`} onClick={signOut}>
          {state.asideMenu.collapse ? null : <RightBracketIcon />}
          {state.asideMenu.collapse ? null : "Cerrar sesión"}
        </button>
      </div>
    </aside>
  );
}
