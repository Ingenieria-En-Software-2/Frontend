import React, { useEffect } from "react";

import { useDashboardLayoutContext } from "../context/dashboardLayout";
import AsideNavigation from "../AsideNavigation/AsideNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    <aside className={`${"fixed left-0 bottom-0 top-0 w-72 bg-white shadow-md"}`}>
      <AsideNavigation collapseLayout={collapseLayout} collapse={state.asideMenu.collapse as boolean} />
    </aside>
  );
}
