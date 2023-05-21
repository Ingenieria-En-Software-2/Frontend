import React from "react";

import AsideMenu from "./AsideMenu";
import MainSection from "./MainSection";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayoutBasic({ children }: Props) {
  return (
    <div className={"w-full h-full flex flex-row flex-1"}>
      <AsideMenu />
      <MainSection>{children}</MainSection>
    </div>
  );
}
