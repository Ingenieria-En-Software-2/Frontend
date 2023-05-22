import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "modules/Home/widgets/Home.tsx";
import CreateUser from "modules/User/widgets/CreateUser.tsx";
import SERVER_URLS from "utils/serversUrls.ts";
import UserProfiles from "modules/User/widgets/UserProfiles.tsx";

const { URL_CREATE_USER, URL_HOME, URL_USER_PROFILES } = SERVER_URLS;

function App() {
  return (
    <>
      <Routes>
        <Route path={URL_HOME} element={<Home />} />
        <Route path={URL_CREATE_USER} element={<CreateUser />} />
        <Route path={URL_USER_PROFILES} element={<UserProfiles />} />
      </Routes>
    </>
  );
}

export default App;
