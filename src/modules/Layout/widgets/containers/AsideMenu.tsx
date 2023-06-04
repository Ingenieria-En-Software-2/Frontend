import { useEffect } from "react";

import { useDashboardLayoutContext } from "../../context/dashboardLayout";
import AsideNavigation from "../AsideNavigation/AsideNavigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuIcon, ArrowLeftLineIcon } from "components/ux/Icons";

type Props = Record<string, never>;

export default function AsideMenu(_: Props) {
  const { state, dispatch } = useDashboardLayoutContext();
  const lg = useMediaQuery("(max-width:1279px)");

  const collapseLayout = (state: boolean) => {
    if (state) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  };

  useEffect(() => {
    if (lg) dispatch({ type: "COLLAPSE" });
    else dispatch({ type: "UNCOLLAPSE" });
  }, [lg, dispatch]);

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
    </aside>
  );
}
