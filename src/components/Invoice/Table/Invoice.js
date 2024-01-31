import React, { useState, useEffect } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import Navbar from "../Navbar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Invoice({ orderID }) {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState([]);
  console.log(orderID);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceResponse = await axios.get(
          "http://192.168.1.211:8000/invoice"
        );
        const customerResponse = await axios.get(
          "http://192.168.1.211:8000/customer"
        );

        const invoiceData = invoiceResponse.data;
        const customerData = customerResponse.data;

        // Combine customer details with invoiceData
        const combinedData = invoiceData.map((order) => {
          const customerDetails = customerData.find(
            (customer) => customer.CustomeID === order.CustomeID
          );

          return {
            ...order,
            ...customerDetails,
          };
        });

        setEntriesData(combinedData);
        setDetail(customerData);
      } catch (error) {
        console.error("Error fetching order and customer data:", error);
      }
    };

    fetchData();
  }, []);



  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entriesData.length / entriesPerPage);
  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some(
      (value) =>
        value !== null &&
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
                          <Link to="/dashboard">
                            <button
                              className="btn btn-success"
                              style={{ padding: "5px", fontSize: "0.95rem" }}
                            >
                              <i className="header-icon2 fa-solid fa-arrow-left-long"></i>
                              Back
                            </button>{" "}
                          </Link>
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
                        <div className="d-flex">
                          <label htmlFor="search">Search: </label>
                          <input
                            type="text"
                            id="search"
                            className="search"
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
                                        month: "short",
                                        day: "2-digit",
                                      })}
                                    </td>
                                    <td className="text-center">
                                      {entry.invoice_number}
                                    </td>

                                    <td className="text-center">
                                      {entry.ShippingPerson}
                                    </td>
                                    <td className="text-center">
                                      {parseFloat(entry.totalAmount).toFixed(2)}
                                    </td>
                                    <td className="text-center">N/A</td>
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
                                      </button>
                                    </td>
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
