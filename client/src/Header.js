import React from "react";
//import { Link } from "react-router-dom";
import "./NavBar.css";

function Header({ onToggleNav }) {
  return (
    <header>
      <button
        style={{ backgroundColor: "#ffd452" }}
        className="sidenav-toggle"
        onClick={onToggleNav}
        data-testid="nav-toggle-button"
      ></button>
      <h1 style={{ textAlign: "center", margin: "0 auto" }}>Project Finder</h1>
      {/* <Link to="/login">
        <button className="login">Log In</button>
      </Link>

      <Link to="/signup ">
        <button className="signUp">Sign Up</button>
      </Link> */}
    </header>
  );
}

export default Header;
