import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const currentPath = location.pathname;

  return (
    <>
      <div className="navbar-container2">
        <nav className="navbar2">
          <ul>
            <li>
              <Link
                to="/invoiceTable"
                className={`btn navbtn ${
                  currentPath === "/invoiceTable" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Regular Invoice")}
              >
                <i className="header-icon fa-solid fa-bars-staggered"></i>
                Invoice Table
              </Link>
            </li>
            <li>
              <Link
                to="/zeroinvoice"
                className={`btn navbtn ${
                  currentPath === "/zeroinvoice" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Zero Invoice")}
              >
                <i className="fa-solid fa-list-ul header-icon"></i>
                Zero Invoice
              </Link>
            </li>
            <li>
              <Link
                to="/regularTable"
                className={`btn navbtn ${
                  currentPath === "/regularTable" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Regular Invoice")}
              >
                <i className="fa-solid fa-bars header-icon"></i>
                Regular Invoice
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
