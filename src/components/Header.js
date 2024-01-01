import React from "react";
import logo from "../Images/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <nav className="navbar sticky-top" style={{ backgroundColor: "#002147" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#/">
            <img src={logo} alt="Multispan" style={{width:"74%"}}/>
          </a>
          <div className="current-route">
            {location.pathname.slice(1).charAt(0).toUpperCase() +
              location.pathname.slice(2).replace(/\/[a-f\d]{24}$/i, "")}
          </div>
          <form className="d-flex">
            <span className="text-white h4 mt-1">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </span>
          </form>
        </div>
      </nav>
    </>
  );
}
