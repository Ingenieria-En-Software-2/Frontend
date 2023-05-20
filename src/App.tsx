import { useState } from 'react'
//import { Link } from "react-router-dom"

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import { CREATE_USER } from './constants/routes.tsx'
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"

function App() {
  return (
    <>
      <Router>
      <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path={CREATE_USER} element={<CreateUser />} />
        </Routes>
        
      </Router>
    </>
  )
}

export default App
