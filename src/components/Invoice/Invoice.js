import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import dummyData from "../OrderList/MOCK_DATA (1).json";
import Navbar from "./Navbar";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

export default function Invoice({ show, onHide }) {
  const navigate = useNavigate()
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(`data : ${dummyData}`);
        setEntriesData(dummyData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);

  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


function handleClick(){
navigate('/billingInfo')
}

  return (
    <>
      <Header />
      <Navbar />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-tab card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <label htmlFor="entriesPerPage">
                            Show entries :{" "}
                          </label>
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
                        <div className="d-flex">
                          <label htmlFor="search">Search: </label>
                          <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
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
                                  <th className="text-center">Invoice Date</th>
                                  <th className="text-center">
                                    Invoice Number
                                  </th>
                                  <th className="text-center">Customer</th>
                                  <th className="text-center">Amount</th>
                                  <th className="text-center">IRN</th>
                                  <th className="text-center">Invoice</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredRows.map((entry, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                      {entry.Orderdate}
                                    </td>
                                    <td
                                      className="text-center"
                                    >
                                      {entry.orderNumber}
                                    </td>

                                    <td className="text-center">
                                      {entry.customer}
                                    </td>
                                    <td className="text-center">
                                      {entry.repairItem}
                                    </td>
                                    <td className="text-center">
                                      {entry.serialnumber}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        className="btn"
                                        style={{
                                          color: "green",
                                          fontSize: "1.2rem",
                                        }}
                                        onClick={handleClick}
                                      >
                                        <i class="fa-solid fa-circle-plus"></i>
                                      </button>
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
