import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Navbar from "./Navbar";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Invoice({ show, onHide }) {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/invoice");
        setEntriesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchData();
    // getBilledData();
  }, []);

  function getBilledData() {
    const billedData = [];
    entriesData.forEach((element) => {
      if (
        element.isInProcess === 1 &&
        element.isReady === 1 &&
        element.isBilled === 1 &&
        element.isScraped === 0
      ) {
        billedData.push(element);
        // console.log(`Billed Data ${billedData}`);
        // console.log(`No data to render`);
      }
    });
  }

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entriesData.length / entriesPerPage);
  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(orderID) {
    navigate(`/regularinvoice/${orderID}`);
    console.log(orderID);
  }
  console.log(`filteredRows : ${currentEntries}`);
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
                                  <th className="text-center">
                                    Shipping Person
                                  </th>
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
                                      {new Date(
                                        entry.invoiceDate
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      })}
                                      {/* { entry.invoiceDate} */}
                                    </td>
                                    <td className="text-center">
                                      {entry.invoice_number}
                                    </td>

                                    <td className="text-center">
                                      {entry.shippingPerson}
                                    </td>
                                    <td className="text-center">
                                      {/* {entry.totalAmount} */}
                                      {parseFloat(entry.totalAmount).toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                      {/* {entry.IRN} */} N/A
                                    </td>
                                    {/* <Link to='/regularinvoice'> */}
                                    <td className="text-center">
                                      <button
                                        className="btn"
                                        style={{
                                          color: "green",
                                          fontSize: "1.2rem",
                                        }}
                                        onClick={() =>
                                          handleClick(entry.orderID)
                                        }
                                      >
                                        {" "}
                                        <i className="fa-solid fa-eye header-icon2"></i>
                                        {/* <i className="fa-solid fa-circle-plus"></i> */}
                                      </button>
                                    </td>
                                    {/* </Link> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {/* <Pagination /> */}
                        <nav>
                          <ul className="pagination">
                            {Array.from({ length: totalPages }).map(
                              (_, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    currentPage === index + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              )
                            )}
                          </ul>
                        </nav>
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
