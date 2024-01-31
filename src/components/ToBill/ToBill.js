import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
import Navbar from "../Navbar";
import Readymodel from "../Ready/Readymodel";
import { Link } from "react-router-dom";
import EditShipping from "./EditShipping";

export default function ToBill() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detail, setDetail] = useState([]);
  const [selectedDetails, setselectedDetails] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const handleMoveToProcess = async (orderID) => {
    try {
      const response = await axios.put(
        `http://192.168.1.211:8000/orders/${orderID}/isscraped`
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await axios.get(
          "http://192.168.1.211:8000/isbilled-orders"
        );
        const customerResponse = await axios.get(
          "http://192.168.1.211:8000/customer"
        );

        const ordersData = ordersResponse.data;
        const customerData = customerResponse.data;
        const CustomeID_sent = customerResponse.data.CustomeID;
        // Combine customer details with orders
        const combinedData = ordersData.map((order) => {
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
        setSelectedCustomer(CustomeID_sent);
        console.log(`CustomeID_sent : ${customerResponse[0].data}`);
      } catch (error) {
        console.error("Error fetching order and customer data:", error);
      }
    };

    fetchData();
  }, []);

  function handleOrderNumberClick(orderID) {
    setSelectedOrder(orderID);
  }
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

  const handleAddDetails = (newEmployee) => {
    setDetail((prevRows) => [...prevRows, newEmployee]);
  };
  const handleRowSelection = (CustomeID) => {
    if (selectedDetails.includes(CustomeID)) {
      setselectedDetails(selectedDetails.filter((id) => id !== CustomeID));
    } else {
      setselectedDetails([...selectedDetails, CustomeID]);
    }
    const newData = detail.map((row) => {
      if (row.CustomeID === CustomeID) {
        return { ...row, CustomeID };
      }
      return row;
    });
    setDetail(newData);
  };

  const handleButtonClick = (orderID) => {
    setSelectedOrder(orderID);
    setIsModalOpen1(true);
  };

  const makeStyle = (entriesData) => {
    const { isInWarranty } = entriesData;

    if (isInWarranty) {
      return {
        color: "black",
        fontSize: "1.2rem",
      };
    } else {
      return {
        color: "green",
        fontSize: "1.2rem",
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
                                  <th className="text-center">Order Date</th>
                                  <th className="text-center">Order Number</th>
                                  <th className="text-center">Product Name</th>
                                  <th className="text-center">
                                    Shipping Person
                                  </th>
                                  <th className="text-center">Shipping City</th>
                                  <th className="text-center">
                                    Shipping State
                                  </th>
                                  <th className="text-center">
                                    Customer Reason
                                  </th>
                                  <th className="text-center">Repaired Date</th>
                                  <th className="text-center">
                                    Transportation Mode
                                  </th>
                                  <th className="text-center">Warranty</th>
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
                                          month: "short",
                                          day: "2-digit",
                                        }
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Readymodel
                                        show={isModalOpen}
                                        onHide={() => setIsModalOpen(false)}
                                        orderState="isscraped"
                                        orderID={entry.orderID}
                                        orderNumber={entry.orderNumber}
                                        onButtonClick={() => {
                                          console.log(
                                            "Confirmation 1 task------------------------"
                                          );
                                        }}
                                        Title={"Scraped Item"}
                                        btnText={"Scrape"}
                                      />
                                    </td>
                                    <td className="text-center">
                                      {entry.productName}
                                    </td>
                                    <td className="text-center">
                                      {entry.ShippingPerson}
                                    </td>
                                    <td className="text-center">
                                      {entry.ShippingCity}
                                    </td>
                                    <td className="text-center">
                                      {entry.ShippingState}
                                    </td>
                                    <td className="text-center">
                                      {entry.customerReason}
                                    </td>
                                    <td className="text-center">
                                      {new Date(
                                        entry.updated_at
                                      ).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                      })}{" "}
                                    </td>
                                    <td className="text-center">
                                      {entry.TransportationMode}
                                    </td>
                                    <td className="text-center">
                                      <p
                                        className="text-center laststatus"
                                        style={makeStyle(entriesData)}
                                      >
                                        {entry.isInWarranty ? (
                                          <p
                                            style={{
                                              color: "#00c409",

                                              fontSize: "0.7rem",
                                              textAlign: "center",
                                              margin: 0,
                                            }}
                                          >
                                            YES
                                          </p>
                                        ) : (
                                          <p
                                            style={{
                                              fontSize: "0.7rem",

                                              color: "#dd0000",
                                              textAlign: "center",
                                              margin: 0,
                                            }}
                                          >
                                            NO
                                          </p>
                                        )}
                                      </p>
                                    </td>
                                    <td className="text-center">
                                      {entry.isinvoiced ? (
                                        <button
                                          className="btn"
                                          style={{
                                            background: "#f9bb00",
                                            color: "black",
                                            border: "1px solid #efc84a",
                                            fontSize: "0.7rem",
                                          }}
                                        >
                                          {" "}
                                          Generated
                                        </button>
                                      ) : (
                                        <button
                                          className="btn blinking"
                                          // style={{
                                          //   background:
                                          //     "rgb(145 254 159 / 47%)",
                                          //   color: "green",
                                          //   border: "1px solid #85cb33",
                                          //   fontSize: "0.7rem",
                                          // }}
                                          orderID={entry.orderID}
                                          onClick={() => {
                                            setselectedDetails(entry);
                                            handleButtonClick(entry.orderID);
                                          }}
                                        >
                                          Generate
                                        </button>
                                      )}
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
          orderDetails={selectedOrder}
          orderID={selectedOrder.orderID}
          orderState="isscraped"
          onButtonClick={() => {
            handleMoveToProcess(selectedOrder.orderID);
            console.log(`selectedOrder.orderID : ${selectedOrder.orderID}`);
          }}
        />
      )}
      {isModalOpen1 && (
        <EditShipping
          selectedDetails={selectedDetails}
          selectedOrder={selectedOrder}
          selectedCustomer={selectedCustomer}
          open={isModalOpen1}
          onClose={() => setIsModalOpen1(false)}
          onAdd={handleAddDetails}
          orderID1={selectedOrder?.orderID}
          CustomeID={selectedDetails?.CustomeID}
          onButtonClick={() => {
            handleOrderNumberClick(selectedOrder.orderID);
            console.log(`selectedOrder.orderID : ${selectedOrder}`);
          }}
        />
      )}
    </>
  );
}
