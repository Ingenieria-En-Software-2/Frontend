import React, { useEffect } from "react";
import banner from "assets/images/banner.jpg";

import { useDashboardLayoutContext } from "../../context/dashboardLayout";
import AsideNavigation from "../AsideNavigation/AsideNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuIcon, ArrowLeftLineIcon } from "components/ux/Icons";

type Props = {};

export default function AsideMenu({}: Props) {
  const { state, dispatch } = useDashboardLayoutContext();
  const lg = useMediaQuery("(max-width:1279px)");

  const collapseLayout = (state: boolean) => {
    if (state) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  };

  useEffect(() => {
    if (lg) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  }, [lg]);
  return (
    <aside
      className={`${"fixed left-0 bottom-0 top-0 bg-white shadow-md"} ${state.asideMenu.collapse ? "w-0" : "w-72"}`}
    >
      <div className={"h-1/6 flex flex-col justify-center items-end"}>
        <button
          className={`${"p-1 text-grey-700 absolute top-2"} ${
            state.asideMenu.collapse ? "left-2 right-auto" : "right-0.5"
          }`}
          onClick={() => dispatch({ type: "TOGGLE_COLLAPSE" })}
        >
          {state.asideMenu.collapse ? <MenuIcon /> : <ArrowLeftLineIcon />}
        </button>
        <div className={`${"w-full overflow-hidden mt-1 self-start"} ${state.asideMenu.collapse ? "w-0" : ""}`}>
          {<img src={banner} alt="banner" className={"w-full"} />}{" "}
        </div>
      </div>
      <AsideNavigation collapseLayout={collapseLayout} collapse={state.asideMenu.collapse as boolean} />
    </aside>
  );
}
