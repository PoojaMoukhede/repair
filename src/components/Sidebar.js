import React, { useState } from "react";
import "../App.css";
import { HiCube } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { FaFile } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import m_logo from "../Images/multilogo.png";
import { useLocation } from "react-router-dom";
export default function Sidebar() {
  const [selected, setSelected] = useState(null);
  function handleItemClick(item) {
    setSelected(item);
  }
  const getActiveclassName = (item) => {
    return item === selected ? "active" : "";
  };
  const location = useLocation();
  const currentPath = location.pathname;

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
  }

  return (
    <>
      <div id="left">
        <div className="scrollbar-sidebar">
          <nav className="main-menu">
            <ul>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/main" ? "active" : ""
                }`}
              >
                <a href="/main">
                  <GiHamburgerMenu className="fa-x" />
                  <span className="nav-text">Main Screen</span>
                </a>
              </li>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/dashboard" ? "active" : ""
                }`}
              >
                <a href="/dashboard">
                  <i className="fa-solid fa-desktop fa-2x"></i>
                  <span className="nav-text">Dashboard</span>
                </a>
              </li>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/#" ? "active" : ""
                }`}
              >
                <a href="#/">
                  <IoFileTrayFullOutline className="fa-x" />

                  <span className="nav-text">Inventory</span>
                </a>
              </li>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/#" ? "active" : ""
                }`}
              >
                <a href="#/">
                  <HiCube className="fa-x" />
                  <span className="nav-text">Stock Management</span>
                </a>
              </li>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/" ? "active" : ""
                }`}
              >
                <a href="#/">
                  <HiOutlineUsers className="fa-x" />
                  <span className="nav-text">Customer</span>
                </a>
              </li>
              <li
                className={`item_s app-sidebar__heading ${
                  currentPath === "/" ? "active" : ""
                }`}
              >
                <a href="#/">
                  <FaRegFileAlt className="fa-x" />

                  <span className="nav-text">Quotation</span>
                </a>
              </li>
              <li>
                <a href="#/">
                  <IoReceiptOutline className="fa-x" />
                  <span className="nav-text">Sales Order</span>
                </a>
              </li>
              <li>
                <a href="/map">
                  <RiRefreshLine className="fa-x" />
                  <span className="nav-text">Order Process</span>
                </a>
              </li>
              <li>
                <a href="#/">
                  <FaFile className="fa-x file" />
                  <span className="nav-text">Invoice</span>
                </a>
              </li>
              <li>
                <a href="/map">
                  <i className="fa-solid fa-calculator fa-2x"></i>
                  <span className="nav-text">Finance</span>
                </a>
              </li>
              <li>
                <a href="#/">
                  <i className="fa-solid fa-screwdriver-wrench fa-2x"></i>
                  <span className="nav-text">Repair</span>
                </a>
              </li>
              <li>
                <a href="/map">
                  <i className="fa fa-user-circle fa-2x"></i>
                  <span className="nav-text">Sales Admin</span>
                </a>
              </li>
              <li>
                <a href="/map">
                  <i className="fa-solid fa-truck-fast fa-2x"></i>
                  <span className="nav-text">Shipping</span>
                </a>
              </li>
              <li onClick={handleLogout}>
                <a href="/">
                  <i className="fa fa-power-off fa-2x"></i>
                  <span className="nav-text">Logout</span>
                </a>
              </li>
            </ul>

            <ul className="logout">
              <li>
                <a href="#/">
                  <img
                    src={m_logo}
                    alt=""
                    width="30rem"
                    className="bottom_img"
                  />
                  {/* <span className="nav-text">Multispan @copyright</span> */}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
