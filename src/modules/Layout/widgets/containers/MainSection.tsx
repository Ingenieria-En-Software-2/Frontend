import React from "react";

import { useDashboardLayoutContext } from "../../context/dashboardLayout";

type Props = {
  children: React.ReactNode;
};

export default function MainSection({ children }: Props) {
  const { state } = useDashboardLayoutContext();

  // To avoid the warning: 'state' is declared but its value is never read.
  state.asideMenu.collapse; 

  return <section className={`${"w-full flex pl-72 justify-center"}`}>{children}</section>;
}
