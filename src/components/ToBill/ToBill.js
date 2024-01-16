import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Navbar from "../Navbar";
import Readymodel from "../Ready/Readymodel";
import { useNavigate } from "react-router-dom";

export default function ToBill() {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleMoveToProcess = async (orderID) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/orders/${orderID}/isscraped`
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  function handleClick(orderID) {
    // axios
    // .put(`http://localhost:8000/orders/${orderID}/isinvoiced`
    // )
    // .then((res) => {
    //   console.log("Server response:", res.data);
    // })
    // .catch((err) => {
    //   console.error("Error updating order:", err);
    // });
    navigate(`/billingInfo?orderID=${orderID}`);
  }

  function handleOrderNumberClick(orderID) {
    setSelectedOrder(orderID);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/isbilled-orders"
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
  const totalPages = Math.ceil(entriesData.length / entriesPerPage);

  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                                  <th className="text-center">Order Date</th>
                                  <th className="text-center">Order Number</th>
                                  <th className="text-center">Customer</th>
                                  <th className="text-center">Repair Item</th>
                                  <th className="text-center">Serial Number</th>
                                  <th className="text-center">
                                    Customer Reason
                                  </th>
                                  <th className="text-center">Repairer Note</th>
                                  <th className="text-center">Repaired Date</th>
                                  <th className="text-center">Invoice</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredRows.map((entry, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                      {new Date(entry.orderDate).toLocaleString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {/* {entry.orderNumber} */}
                                      <Readymodel
                                        show={isModalOpen}
                                        onHide={() => setIsModalOpen(false)}
                                        orderState="isscraped"
                                        orderID={entry.orderID}
                                        onButtonClick={() => {
                                          console.log("Confirmation 1 task------------------------");
                                          // handleOrderNumberClick(entry.orderID)
                                        }}
                                        Title={"Scraped Item"}
                                        btnText={"Scrape"}
                                      />
                                    </td>
                                    <td className="text-center">
                                      {/* {entry.CustomeName} */}
                                      {entry.CustomeName}
                                    </td>
                                    <td className="text-center">
                                      {entry.productName}
                                    </td>
                                    <td className="text-center">
                                      {entry.serialNumber}
                                    </td>
                                    <td className="text-center">
                                      {entry.customerReason}
                                    </td>
                                    <td className="text-center">
                                      {entry.orderRemark}
                                    </td>
                                    <td className="text-center">
                                      {new Date(entry.orderDate).toLocaleString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        }
                                      )}{" "}
                                    </td>

                                    <td className="text-center">
                                      <button
                                        className="btn"
                                        style={{
                                          color: "green",
                                          fontSize: "1.2rem",
                                        }}
                                        orderID={entry.orderID}
                                        onClick={() =>
                                          handleClick(entry.orderID)
                                        }
                                        // onClick={console.log(`entry.orderID : ${entry.orderID}`)}
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
      {isModalOpen && (
        <Readymodel
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          // btnText={"Moving to In-Process"}
          // Title={"Repair Item DONE Confirmation"}
          orderDetails={selectedOrder}
          orderID={selectedOrder.orderID}
          orderState="isscraped"
          onButtonClick={() => {
            handleMoveToProcess(selectedOrder.orderID);
            console.log(`selectedOrder.orderID : ${selectedOrder.orderID}`);
          }}
        />
      )}
    </>
  );
}
