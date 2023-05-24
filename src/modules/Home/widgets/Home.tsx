import DashboardLayoutBasic from "modules/Layout/widgets/containers/DashboardLayoutBasic";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import React from "react";

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="main-container">
          <DashboardWrapper>
            <main>
              <DashboardLayoutBasic>
                <>
                  <title>Home</title>
                  <h2>Homepage</h2>
                </>
              </DashboardLayoutBasic>
            </main>
          </DashboardWrapper>
        </div>
      </>
    );
  }
}

export default Home;
