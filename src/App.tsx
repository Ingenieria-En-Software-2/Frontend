import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "modules/Home/widgets/Home.tsx";
import CreateUser from "modules/User/widgets/CreateUser.tsx";
import SERVER_URLS from "utils/serversUrls.ts";

const { URL_CREATE_USER, URL_HOME } = SERVER_URLS;

function App() {
  return (
    <>
      <Routes>
        <Route path={URL_HOME} element={<Home />} />
        <Route path={URL_CREATE_USER} element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App;
