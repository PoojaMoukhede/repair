import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Readymodel from "../Ready/Readymodel";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
// import { useAPI } from "../Context";

export default function OrderList() {
  // const { processList } = useAPI();
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesData, setEntriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/order-item-list-with-customer"
        );
        setEntriesData(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchData();
  }, []);

  // const transfer_To_Process = async(id,data)=>{
  //   console.log(id,data)
  //   await processList(id,data)
  // }

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entriesData.slice(indexOfFirstEntry, indexOfLastEntry);

  const filteredRows = currentEntries.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleClick = (entry) => {
    setSelectedOrder(entry);
    setIsModalOpen(true);
  };
  function handleOrderNumberClick(orderID) {
    setSelectedOrder(orderID);
  }

  // const makeStyle = (entriesData) => {
  //   const { isInProcess, isReady, isBilled, isScraped } = entriesData;

  //   if (isInProcess === 0 && isReady === 0 && isBilled === 0 && isScraped === 0) {
  //     return {
  //       background: "rgb(145 254 159 / 47%)",
  //       color: "green",
  //     };
  //   } else {
  //     return {
  //       background: "#59bfff",
  //       color: "white",
  //     };
  //   }
  // };
  const makeStyle = (entriesData) => {
    const { isInProcess, isReady, isBilled, isScraped } = entriesData;

    if (!isInProcess && !isReady && !isBilled && !isScraped) {
      return {
        background: "#f9bb00",
        color: "black",
        border: "1px solid #efc84a",
      };
    } else {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
        border: "1px solid #85cb33",
      };
    }
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
                                          month: "2-digit",
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
                                      {entry.orderNumber}
                                      <Readymodel
                                        show={isModalOpen}
                                        onHide={() => setIsModalOpen(false)}
                                        btnText={"Moving to In-Process"}
                                        Title={"Repair Item DONE Confirmation"}
                                        onButtonClick={() => {
                                          // transfer_To_Process(entry.orderID,"in_process")
                                          console.log("Confirmation 1 task");
                                        }}
                                        orderID={entry.orderID}
                                      />
                                    </td>

                                    <td className="text-center">
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
      {isModalOpen && (
        <Readymodel
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          btnText={"Moving to In-Process"}
          Title={"Repair Item DONE Confirmation"}
          orderDetails={selectedOrder}
          onButtonClick={() => {
            console.log("Confirmation 1 task");
          }}
        />
      )}
    </>
  );
}
