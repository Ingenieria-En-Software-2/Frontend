import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DashboardWrapper } from "modules/Layout/context/dashboardLayout";
import DashboardLayoutBasic from "modules/Layout/containers/DashboardLayoutBasic";
import "./App.css";

function App() {
  return (
    <Router>
      <>
        <div className="main-container">
          <DashboardWrapper>
            <main>
              <DashboardLayoutBasic>
                <></>
              </DashboardLayoutBasic>
            </main>
          </DashboardWrapper>
        </div>
      </>
    </Router>
  );
}

export default App;
