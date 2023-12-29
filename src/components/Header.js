import React from "react";
import logo from "../Images/logo.png";

export default function Header() {
  return (
    <>
      <nav className="navbar sticky-top" style={{ backgroundColor: "#002147" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#/">
            <img src={logo} alt="Multispan" style={{width:"74%"}}/>
          </a>
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
