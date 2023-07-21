import React from "react";

import { useState } from "react";

import AsideMenu from "./AsideMenu";
import MainSection from "./MainSection";
import banner from "assets/images/banner.png";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayoutBasic({ children }: Props) {
  const [visible, setVisible] = useState(false);
  const handleBackdrop = () => {
    setVisible(true);
  };
  return (
    <div className={"w-full h-full flex flex-col flex-1"}>
      <div className="h-1/6 flex flex-col justify-center items-end pl-72">
        <img src={banner} alt="banner" className="self-center mb-12 w-2/3" />
      </div>

      <AsideMenu backDropCallBack={handleBackdrop} />
      <MainSection>{children}</MainSection>

      <Backdrop sx={{ color: "#ffff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={visible}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
