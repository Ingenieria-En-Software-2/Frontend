import React, { useState } from "react";
import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";

const UserProfiles = () => {
  return (
    <DashboardWrapper>
      <DashboardLayoutBasic>
        <h1>Perfiles de Usuario</h1>
      </DashboardLayoutBasic>
    </DashboardWrapper>
  );
};

export default UserProfiles;
