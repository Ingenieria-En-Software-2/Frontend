import { useState } from "react";
//import { Link } from "react-router-dom"

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CREATE_USER, USER_PROFILES } from "./constants/routes.tsx";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import GenericTable from "./components/GenericTable";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={CREATE_USER} element={<CreateUser />} />
          <Route path={USER_PROFILES} element={<GenericTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
