import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "modules/Home/widgets/Home.tsx";
import CreateUser from "modules/User/widgets/CreateUser.tsx";
import SERVER_URLS from "utils/serversUrls.ts";
import UserProfiles from "modules/User/widgets/UserProfiles.tsx";
import UserRoles from "modules/User/widgets/UserRoles";
import NewTransaction from "modules/Transactions/NewTransaction";
import LoginPage from "modules/Auth/pages/LoginPage";
import SignupPage from "modules/Auth/pages/SignupPage";
import VerifyPage from "modules/Auth/pages/VerifyPage";
import CreateAccount from "modules/Accounts/widgets/CreateAccount";
import CheckingPage from "modules/Transactions/pages/CheckingPage";
import SavingsPage from "modules/Transactions/pages/SavingsPage";
import DailyTransactions from "modules/Transactions/pages/DailyTransactions";
import PagoMovil from "modules/Transactions/PagoMovil";
import EventLoggerPage from "modules/EventLogger/pages/EventLoggerPage";

import { Provider } from "react-redux";
import getStore from "context/store/createStore";
import Gate from "modules/Auth/components/Gate";

const {
  URL_CREATE_USER,
  URL_HOME,
  URL_USER_PROFILES,
  URL_USER_ROLES,
  URL_LOGIN,
  URL_SIGNUP,
  URL_VERIFY,
  URL_CREATE_ACCOUNT,
  URL_NEW_TRANSACTIONS,
  URL_SAVINGS_TRANSACTION,
  URL_CHECKING_TRANSACTION,
  URL_DAILY_TRANSACTIONS,
  URL_PAGO_MOVIL,
  URL_EVENT_LOGGER
} = SERVER_URLS;

function App() {
  return (
    <>
      <Provider store={getStore()}>
        <Gate>
          <Routes>
            <Route path={URL_LOGIN} element={<LoginPage />} />
            <Route path={URL_VERIFY} element={<VerifyPage />} />
            <Route path={URL_SIGNUP} element={<SignupPage />} />
            <Route path={URL_HOME} element={<Home />} />
            <Route path={URL_CREATE_USER} element={<CreateUser />} />
            <Route path={URL_USER_PROFILES} element={<UserProfiles />} />
            <Route path={URL_USER_ROLES} element={<UserRoles />} />
            <Route path={URL_NEW_TRANSACTIONS} element={<NewTransaction />} />
            <Route path={URL_CREATE_ACCOUNT} element={<CreateAccount />} />
            <Route path={URL_CHECKING_TRANSACTION} element={<CheckingPage />} />
            <Route path={URL_SAVINGS_TRANSACTION} element={<SavingsPage />} />
            <Route path={URL_DAILY_TRANSACTIONS} element={<DailyTransactions />} />
            <Route path={URL_PAGO_MOVIL} element={<PagoMovil />} />
            <Route path={URL_EVENT_LOGGER} element={<EventLoggerPage />} />
          </Routes>
        </Gate>
      </Provider>
    </>
  );
}

export default App;
