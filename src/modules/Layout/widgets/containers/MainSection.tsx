import React from "react";

import { useDashboardLayoutContext } from "../../context/dashboardLayout";

type Props = {
  children: React.ReactNode;
};

export default function MainSection({ children }: Props) {
  const { state } = useDashboardLayoutContext();
  return <section className={`${"w-full flex pl-72 justify-center"}`}>{children}</section>;
}
