import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { FaShieldHalved } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { FaOpencart } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import OrderComponent from "./OrderComponent";
import booked from "../../Images/checkmark.png";
import "./btn.css";
import axios from "axios";
import { useAPI } from "../Context";

export default function RepairOrder() {
  const [cartCountValue, setCartCountValue] = useState(0);
  const [added, setAdded] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [referanceDate, setReferanceDate] = useState(currentDate);

  const { postOrder } = useAPI();

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/customer`)
        .then((response) => {
          setCustomerData(response.data);
          console.log("sort data", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleAddRow = () => {
    setOrderItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        productName: "",
        serialNumber: "",
        HSN: "",
        includeHsn: false,
        rate: "",
        tax: "",
        total: "",
        customerReason: "",
      },
    ]);
    setCartCountValue((prevCount) => prevCount + 1);
  };

  const handleDeleteRow = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setCartCountValue((prevCount) => prevCount - 1);
  };


  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const handleInputChange = (id, name, value) => {
    if (name === "CustomerName") {
      const selectedCustomer = customerData.find(
        (customer) => customer.CustomeName === value
      );

      setSelectedCustomerId(selectedCustomer ? selectedCustomer.CustomeID : "");
    }
    console.log(selectedCustomer.CustomeID);
    setSelectedCustomer(value);

    setOrderItems({ ...orderItems, [name]: value ,CustomeID: selectedCustomerId});
  };

  const handleButtonClick = () => {
    axios
      .post("http://localhost:8000/orders", orderItems)
      .then((res) => {
        console.log(`Server response:`, res.data);
        const updatedOrderItems = Array.isArray(res.data) ? res.data : [];
        setOrderItems(updatedOrderItems);
      })
      .catch((err) => {
        console.error("Error posting order:", err);
      });
  };

  const [orderItems, setOrderItems] = useState({
    id: 1,
    productName: "",
    serialNumber: "",
    HSN: "",
    includeHsn: false,
    rate: "",
    tax: "",
    total: "",
    customerReason: "",
    orderRemark: "",
    orderDate: currentDate,
    orderNumber: "",
    CustomerName: "",
    CustomerReferance: "",
    RefrenceDate: currentDate,
    CustomeName: "",
    CustomeID: selectedCustomerId,
  });

  // const [orderItems, setOrderItems] = useState([
  //   {
  //     id: 1,
  //     productName: "",
  //     serialNumber: "",
  //     HSN: "",
  //     includeHsn: false,
  //     rate: "",
  //     tax: "",
  //     total: "",
  //     customerReason: "",
  //     orderRemark: "",
  //     orderDate: currentDate,
  //     orderNumber: "",
  //     CustomerName: "",
  //     CustomerReferance: "",
  //     RefrenceDate: currentDate,
  //     CustomeName: "",
  //     CustomeID: "5",
  //   }
  // ]);

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <FaRegUser className="header-icon" />
                        Customer Detail
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <form className="row g-3">
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Name
                              </label>
                              <select
                                className="form-select input_repair"
                                aria-label="Default select example"
                                value={selectedCustomer}
                                name="CustomerName"
                                onChange={(e) =>
                                  handleInputChange(
                                    orderItems.id,
                                    "CustomerName",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled>
                                  Select Customer
                                </option>
                                {customerData.map((customer) => (
                                  <option
                                    key={customer.CustomeID}
                                    value={customer.CustomeName}
                                  >
                                    {customer.CustomeName}
                                  </option>
                                ))}
                              </select>

                              {/* <select
                                className="form-select input_repair"
                                aria-label="Default select example"
                                value={selectedCustomer}
                                name="CustomerName"
                                onChange={(e) =>
                                  handleInputChange(
                                    orderItems.id,
                                    "CustomerName",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled>
                                  Select Customer
                                </option>
                                {customerData.map((customer) => (
                                  <option
                                    key={customer.CustomeID}
                                    value={customer.CustomeName}
                                  >
                                    {customer.CustomeName}
                                  </option>
                                ))}
                              </select> */}
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Referance
                              </label>
                              <input
                                type="text"
                                name="CustomerReferance"
                                value={orderItems.CustomerReferance}
                                className={`form-control input_repair`}
                                placeholder="Referance"
                                onChange={(e) =>
                                  handleInputChange(
                                    orderItems.id,
                                    "CustomerReferance",
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputAddress"
                                className="form-label"
                              >
                                Customer Referance Date
                              </label>
                              <input
                                type="date"
                                name="RefrenceDate"
                                className={`form-control input_repair`}
                                placeholder="Referance"
                                value={referanceDate}
                                onChange={(e) => setReferanceDate(currentDate)}
                                required
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon fa-brands fa-opencart"></i>
                        Order Item Detail
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <table className="table">
                            {/* table-bordered if needed */}
                            <thead style={{ backgroundColor: "gray" }}>
                              <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">productName</th>
                                <th scope="col">Serial Number</th>
                                <th scope="col">HSN</th>
                                <th scope="col">
                                  <FaShieldHalved />
                                </th>
                                <th scope="col">Rate</th>
                                <th scope="col">Tax(%)</th>
                                <th scope="col">Total</th>
                                <th scope="col">Customer Reason</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            {/* <tbody className="table-group-divider">
                              {orderItems.map((item) => (
                              <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>
                                  <select
                                    className="form-select input_repair"
                                    aria-label="Default select example"
                                    value={orderItems.productName}
                                    name="productName"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "productName",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="" disabled>
                                      Select productName
                                    </option>
                                    <option value="Temprature Controller">
                                      Temprature Controller
                                    </option>
                                    <option value="Timers & Counters">
                                      Timers & Counters
                                    </option>
                                    <option value="Process Control Instruments">
                                      Process Control Instruments
                                    </option>
                                    <option value="Power & Energy Meters">
                                      Power & Energy Meters
                                    </option>
                                    <option value="APFC & Protection Relays">
                                      APFC & Protection Relays
                                    </option>
                                    <option value="Color Mark Sensors">
                                      Color Mark Sensors
                                    </option>
                                    <option value="Cryo">Cryo</option>
                                    <option value="Panel Meters">
                                      Panel Meters
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="N/A"
                                    value={orderItems.serialNumber}
                                    name="serialNumber"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "serialNumber",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="12345"
                                    value={orderItems.HSN}
                                    name="HSN"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "HSN",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="includeHsn"
                                    checked={orderItems.includeHsn}
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "includeHsn",
                                        e.target.checked
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",

                                      width: "20px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="0.0"
                                    name="rate"
                                    value={orderItems.rate}
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "rate",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="18.0"
                                    value={orderItems.tax}
                                    name="tax"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "tax",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="0.0"
                                    value={orderItems.total}
                                    name="total"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "total",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    className="input_repair"
                                    placeholder="20.0"
                                    value={orderItems.customerReason}
                                    name="customerReason"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "customerReason",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "48px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger p-1"
                                    onClick={() =>
                                      handleDeleteRow(orderItems.id)
                                    }
                                  >
                                    <IoMdRemoveCircle
                                      style={{ fontSize: "1.5rem" }}
                                    />
                                  </button>
                                </td>
                              </tr>
                              ))} 
                            </tbody> */}
                            <tbody className="table-group-divider">
                              <tr key={orderItems.orderID}>
                                <th scope="row">{orderItems.orderID}</th>
                                <td>
                                  <select
                                    className="form-select input_repair"
                                    aria-label="Default select example"
                                    value={orderItems.productName}
                                    name="productName"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "productName",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="" disabled>
                                      Select productName
                                    </option>
                                    <option value="Temprature Controller">
                                      Temprature Controller
                                    </option>
                                    <option value="Timers & Counters">
                                      Timers & Counters
                                    </option>
                                    <option value="Process Control Instruments">
                                      Process Control Instruments
                                    </option>
                                    <option value="Power & Energy Meters">
                                      Power & Energy Meters
                                    </option>
                                    <option value="APFC & Protection Relays">
                                      APFC & Protection Relays
                                    </option>
                                    <option value="Color Mark Sensors">
                                      Color Mark Sensors
                                    </option>
                                    <option value="Cryo">Cryo</option>
                                    <option value="Panel Meters">
                                      Panel Meters
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="N/A"
                                    value={orderItems.serialNumber}
                                    name="serialNumber"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "serialNumber",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="12345"
                                    value={orderItems.HSN}
                                    name="HSN"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "HSN",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    name="includeHsn"
                                    checked={orderItems.includeHsn}
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "includeHsn",
                                        e.target.checked
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",

                                      width: "20px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="0.0"
                                    name="rate"
                                    value={orderItems.rate}
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "rate",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="18.0"
                                    value={orderItems.tax}
                                    name="tax"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "tax",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <input
                                    className="input_repair"
                                    placeholder="0.0"
                                    value={orderItems.total}
                                    name="total"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "total",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "38px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <textarea
                                    className="input_repair"
                                    placeholder="20.0"
                                    value={orderItems.customerReason}
                                    name="customerReason"
                                    onChange={(e) =>
                                      handleInputChange(
                                        orderItems.id,
                                        "customerReason",
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      height: "48px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger p-1"
                                    onClick={() =>
                                      handleDeleteRow(orderItems.id)
                                    }
                                  >
                                    <IoMdRemoveCircle
                                      style={{ fontSize: "1.5rem" }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <button className="cart-btn" onClick={handleAddRow}>
                            <div className="cart">
                              <MdOutlineShoppingCart
                                className="header-icon"
                                style={{ fontSize: "1.3rem" }}
                              />
                              <span className="count">{cartCountValue}</span>
                            </div>
                            Add To Cart
                          </button>
                        </div>
                        <div className="p-2 d-flex">
                          <div style={{ width: "60%" }}>
                            <span className="d-flex">
                              <h6 className="ms-2">Order Remark</h6>{" "}
                              <small className="ms-2">
                                (upto 500 character)
                              </small>
                            </span>
                            <OrderComponent
                              name="orderRemark"
                              value={orderItems.orderRemark}
                              onChange={(e) =>
                                handleInputChange(
                                  orderItems.id,
                                  "orderRemark",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <button
                            className={`add-to-cart ${added ? "added" : ""} `}
                            onClick={handleButtonClick}
                          >
                            <div className="default">Book Order</div>
                            <div className="success">Booked</div>
                            <div className="cart">
                              <div>
                                <div></div>
                                <div></div>
                              </div>
                            </div>
                            <div className="dots"></div>
                          </button>
                        </div>
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
