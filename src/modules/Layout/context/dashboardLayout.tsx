import { createContext, useContext, useReducer } from "react";
import { asideMenuReducer } from "./dashboardReducer";

type Props = {
  children: React.ReactNode;
};

interface SubStateInterface {
  [key: string]: boolean | string | number;
}

interface DashboardLayoutContextInterface {
  asideMenu: SubStateInterface;
}

interface Action {
  type: string;
  payload?: any;
}

const initDashboardLayoutContext: DashboardLayoutContextInterface = {
  asideMenu: {
    collapse: false,
  },
};

const DashboardLayoutContext = createContext<{
  state: DashboardLayoutContextInterface;
  dispatch: React.Dispatch<Action>;
}>({
  state: initDashboardLayoutContext,
  dispatch: () => null,
});

const mainReducer = ({ asideMenu }: DashboardLayoutContextInterface, action: Action) => ({
  asideMenu: asideMenuReducer(asideMenu, action),
});

export function DashboardWrapper({ children }: Props) {
  const [state, dispatch] = useReducer(mainReducer, initDashboardLayoutContext);
  return <DashboardLayoutContext.Provider value={{ state, dispatch }}>{children}</DashboardLayoutContext.Provider>;
}

export function useDashboardLayoutContext() {
  return useContext(DashboardLayoutContext);
}
