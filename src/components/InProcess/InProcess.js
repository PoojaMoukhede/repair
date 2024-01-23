import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Readymodel from "../Ready/Readymodel";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useAPI } from "../Context";
import { Link } from "react-router-dom";

export default function OrderList() {
  const { processList } = useAPI();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.211:8000/isinprocess-orders"
        );
        setEntriesData(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchData();
  }, []);

  const handleMoveToProcess = (orderID) => {
    axios
      .put(`http://192.168.1.211:8000/orders/${orderID}/isready`
      )
      .then((res) => {
        console.log("Server response:", res.data);
      })
      .catch((err) => {
        console.error("Error updating order:", err);
      });
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(entriesData.length / entriesPerPage);
  const filteredRows = currentEntries.filter((entry) =>
  Object.values(entry).some((value) =>
    value !== null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleClick = (entry) => {
    setSelectedOrder(entry);
    setIsModalOpen(true);
  };
  function handleOrderNumberClick(orderID) {
    setSelectedOrder(orderID);
    console.log(orderID);
  }
  const makeStyle = (entriesData) => {
    const { isInProcess, isReady, isBilled, isScraped } = entriesData;

    if (!isInProcess && !isReady && !isBilled && !isScraped) {
      return {
        background: "#f9bb00",
        color: "black",
        border: "1px solid #efc84a",
        fontSize:'0.7rem'
      };
    } else {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
        border: "1px solid #85cb33",
        fontSize:'0.7rem'
      };
    }
  };

  return (
    <>
      <Header />
      <Navbar />
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
                        <div>
                        <Link to="/dashboard">
                            <button className="btn btn-success" style={{padding:'5px',fontSize:'0.95rem'}}>
                              <i className="header-icon2 fa-solid fa-arrow-left-long"></i>
                              Back
                            </button>{" "}
                          </Link>
                          <label htmlFor="entriesPerPage">
                            Entries :{" "}
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
                                  <th className="text-center">Order Date</th>
                                  <th className="text-center">Order Number</th>
                                  <th className="text-center">Customer</th>
                                  <th className="text-center">Repair Item</th>
                                  <th className="text-center">Serial Number</th>
                                  <th className="text-center">
                                    {" "}
                                    Customer Reason
                                  </th>
                                  <th className="text-center">Repairer Note</th>
                                  <th className="text-center">Repaired Date</th>
                                  <th className="text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredRows.map((entry, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                      {/* {entry.orderDate} */}
                                      {new Date(entry.orderDate).toLocaleString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "short",
                                          day: "2-digit",
                                        }
                                      )}
                                    </td>

                                    <td
                                      className="text-center"
                                      onClick={() =>
                                        handleOrderNumberClick(entry.orderID)
                                      }
                                    >
                                      <Readymodel
                                        show={isModalOpen}
                                        onHide={() => setIsModalOpen(false)}
                                        btnText={"Moving to In-Process"}
                                        Title={"Repair Item DONE Confirmation"}
                                        orderState="isready" 
                                        orderNumber={entry.orderNumber}
                                        onButtonClick={() => {
                                          // transfer_To_Process(entry.orderID,"in_process")
                                          console.log("Confirmation 1 task");
                                        }}
                                        orderID={entry.orderID}
                                      />
                                    </td>

                                    <td className="text-center">
                                      {/* {entry.CustomeName}  */}
                                      {/* uncomment when change or delete table */}
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
                                      {/* {entry.orderDate} */}
                                      {new Date(entry.updated_at).toLocaleString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                         month: "short",
                                          day: "2-digit",
                                        }
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <p
                                        className="text-center laststatus"
                                        style={makeStyle(entriesData)}
                                      >
                                        {!entriesData.isInProcess &&
                                        !entriesData.isReady &&
                                        !entriesData.isBilled &&
                                        !entriesData.isScraped
                                          ? "Pending"
                                          : "Repaired"}
                                      </p>
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
      {isModalOpen && (
        <Readymodel
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          btnText={"Moving to In-Process"}
          Title={"Repair Item DONE Confirmation"}
          orderDetails={selectedOrder}
          orderID={selectedOrder.orderID}
          orderState="isready" 
          onButtonClick={() => {
            handleMoveToProcess(selectedOrder.orderID);
            console.log(`selectedOrder.orderID : ${selectedOrder.orderID}`);
            console.log("Confirmation 1 task");
          }}
        />
      )}
    </>
  );
}
