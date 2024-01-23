import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Scraped() {
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.211:8000/isscraped-orders"
        );
        setEntriesData(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);

  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some(
      (value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right" className="ps-1 pt-1">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-tab card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        {/* <div class="dropdown">
                          <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            onClick={()=>console.log(`Hellooo sweetie`)}
                          >
                            Back
                          </button>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a class="dropdown-item" href="#/">
                              Action
                            </a>
                            <a class="dropdown-item" href="#/">
                              Another action
                            </a>
                            <a class="dropdown-item" href="#/">
                              Something else here
                            </a>
                          </div>
                        </div> */}

                        <Link to="/dashboard">
                          <button
                            className="btn btn-success"
                            style={{ padding: "5px", fontSize: "0.95rem" }}
                          >
                            <i className="header-icon2 fa-solid fa-arrow-left-long"></i>
                            Back
                          </button>{" "}
                        </Link>
                        <div className="d-flex">
                          {/* <label htmlFor="search">Search: </label> */}
                          <input
                            type="text"
                            id="search"
                            className="search"
                            placeholder="Type to search..."
                            value={searchTerm}
                            style={{ height: "40px",width:'500px'}}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="entriesPerPage">Entries : </label>
                          <input
                            type="number"
                            id="entriesPerPage"
                            value={entriesPerPage}
                            onChange={(e) => {
                              setEntriesPerPage(Number(e.target.value));
                              setCurrentPage(1);
                            }}
                          />
                          <label htmlFor="entriesPerPage">per page</label>
                        </div>
                      </div>
                    </div>

                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart">
                          <div
                            className="table-responsive table"
                            style={{ height: "80vh" }}
                          >
                            <table
                              className="align-middle mb-0 table table-border table-striped table-hover"
                              style={{ fontSize: "0.9rem", color: "white" }}
                            >
                              <thead style={{ background: "beige" }}>
                                <tr>
                                  <th>Sr. No</th>
                                  <th className="text-center">
                                    Repair Order Item
                                  </th>
                                  <th className="text-center">Model</th>
                                  <th className="text-center">Order Number</th>
                                  <th className="text-center">Customer</th>
                                  <th className="text-center">Remark</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredRows.map((entry, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td className="text-center">
                                      {entry.productName}
                                    </td>
                                    <td className="text-center">
                                      {entry.productName}
                                    </td>
                                    <td className="text-center">
                                      {entry.orderNumber}
                                    </td>
                                    <td className="text-center">
                                      {entry.CustomeName}
                                    </td>
                                    <td className="text-center">
                                      {entry.orderRemark}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <Pagination />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
