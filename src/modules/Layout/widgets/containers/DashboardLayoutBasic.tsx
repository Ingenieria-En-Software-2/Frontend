import React from "react";

import AsideMenu from "./AsideMenu";
import MainSection from "./MainSection";
import banner from "assets/images/banner.png";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayoutBasic({ children }: Props) {
  return (
    <div className={"w-full h-full flex flex-col flex-1"}>
      <div className="h-1/6 flex flex-col justify-center items-end pl-72">
        <img src={banner} alt="banner" className="self-center mb-12 w-2/3" />
      </div>

      <AsideMenu />
      <MainSection>{children}</MainSection>
    </div>
  );
}
