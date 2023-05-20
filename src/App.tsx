import { useState } from 'react'
//import { Link } from "react-router-dom"

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { CREATE_USER } from './constants/routes.tsx'
import Home from "./components/Home"
import CreateUser from "./components/CreateUser"

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
      <Switch>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" component={Home} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path={CREATE_USER} element={<CreateUser />} />
            
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Redirect to="/" />
        </Switch>
        
      </Router>
    </>
  )
}

export default App


/*

<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <Link to={CREATE_USER}>
            <Button type='primary'>
                Subir fotos
            </Button>
        </Link>
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

*/