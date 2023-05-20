import React from "react";
// importing Link from react-router-dom to navigate to 
// different end points.
import { Link } from "react-router-dom"
  
class Home extends React.Component {
  render() { return (
        <>
        <title> Home </title>
        <nav>
            <h1 className="h1">Hello</h1>
        </nav>
        </>
    ) 
    }
}
export default Home