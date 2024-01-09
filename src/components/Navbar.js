import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

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
                to="/addRepair"
                className={`btn navbtn ${
                  currentPath === "/addRepair" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Order Item List")}
              >
                <i class="header-icon fa-solid fa-cart-plus animat"></i>
                New Order 
              </Link>
            </li>
            <li>
              <Link
                to="/orderList"
                className={`btn navbtn ${
                  currentPath === "/orderList" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Order Item List")}
              >
                <i className="header-icon fa-solid fa-bars-staggered"></i>
                Order Item List
              </Link>
            </li>
            <li>
              <Link
                to="/inProcess"
                className={`btn navbtn ${
                  currentPath === "/inProcess" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("In-Process")}
              >
                <i className=" header-icon fa-solid fa-gears"></i>
                In-Process
              </Link>
            </li>
            <li>
              <Link
                to="/ready"
                className={`btn navbtn ${
                  currentPath === "/ready" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("Ready")}
              >
                <i className="header-icon fa-solid fa-check-double"></i>
                Ready
              </Link>
            </li>
            <li>
              <Link
                to="/tobill"
                className={`btn navbtn ${
                  currentPath === "/tobill" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("To Bill")}
              >
                <i className="header-icon fa-solid fa-money-bill-trend-up"></i>
                To Bill
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}