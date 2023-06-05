import React from "react";

import AsideMenu from "./AsideMenu";
import MainSection from "./MainSection";
import banner from "assets/images/banner.jpg";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayoutBasic({ children }: Props) {
  return (
    <div className={"w-full h-full flex flex-col flex-1"}>
      <div className="h-1/6 flex flex-col justify-center items-end">
        <img src={banner} alt="banner" className="w-1/3 self-center mb-12" />
      </div>

      <AsideMenu />
      <MainSection>{children}</MainSection>
    </div>
  );
}
