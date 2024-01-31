import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { IoMdRemoveCircle } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import OrderComponent from "./OrderComponent";
import { Link, useLocation } from "react-router-dom";
import "./btn.css";
import axios from "axios";
import "../Invoice/style.css";

export default function RepairOrder() {
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const orderID = queryParams.get("orderID");
  const currentDate = new Date().toISOString().split("T")[0];
  const [cartCountValue, setCartCountValue] = useState(0);
  const [added, setAdded] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [referanceDate, setReferanceDate] = useState(currentDate);
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [invoice1, setInvoice1] = useState([]);
  const [placedOrder, setPlacedorder] = useState(false);
  const [lastOrderNumber, setLastOrderNumber] = useState(null);
  const [nextOrderNumber, setNextOrderNumber] = useState("");
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderID = queryParams.get("orderID");
    if (orderID) {
      setOrderID(orderID);
    }
  }, [useLocation()]);

  useEffect(() => {
    try {
      axios
        .get(`http://192.168.1.211:8000/customer`)
        .then((response) => {
          setCustomerData(response.data);
          // console.log("sort data", response.data);
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
        isInWarranty: "",
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
    setOrderItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          if (name === "CustomeName") {
            const selectedCustomer = customerData.find(
              (customer) => customer.CustomeName === value
            );
            setSelectedCustomerId(
              selectedCustomer ? selectedCustomer.CustomeID : ""
            );
            setIsCustomerSelected(true);
          }
          setSelectedCustomer(value);
          console.log(`customerData : ${selectedCustomer}`);
          return {
            ...item,
            [name]: value,
            CustomeID: selectedCustomerId,
          };
        }
        return item;
      });
    });
    console.log(`input :${value}`);
  };

  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      productName: "",
      serialNumber: "",
      HSN: "",
      isInWarranty: "",
      customerReason: "",
      orderNumber: "",
      orderRemark: "",
      orderDate: "",
      CustomerReferance: "",
      RefrenceDate: "",
      CustomeName: "",
      CustomeID: "",
      orderID: orderID,
    },
  ]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    const orderDataSent = {
      id: 1,
      productName: orderItems[0].productName,
      serialNumber: orderItems[0].serialNumber,
      HSN: orderItems[0].HSN,
      isInWarranty: orderItems[0].isInWarranty,
      customerReason: orderItems[0].customerReason,
      orderNumber: nextOrderNumber,
      // orderNumber: "RPR/24/Jan/2425/00001",
      orderRemark: orderItems[0].orderRemark,
      orderDate: referanceDate,
      CustomerReferance: orderItems[0].CustomerReferance,
      RefrenceDate: referanceDate,
      CustomeName: orderItems[0].CustomeName,
      CustomeID: selectedCustomerId,
      // orderID: orderID,
    };

    axios
      .post("http://192.168.1.211:8000/ordersMultiple", [orderDataSent])
      .then((res) => {
        console.log(`Server response:`, res.data);
        const updatedOrderItems = Array.isArray(res.data) ? res.data : [];
        setOrderItems(updatedOrderItems);
        setPlacedorder(true);
        setAdded(true);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error posting order:", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await axios.get(
          `http://192.168.1.211:8000/customer/${selectedCustomerId}`
        );
        setInvoice1(response2.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (isCustomerSelected) {
      fetchData();
    }
  }, [selectedCustomerId, isCustomerSelected]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.211:8000/orders");
        const lenght = response.data.length;
        const response2 = await axios.get(
          `http://192.168.1.211:8000/orderslast/${lenght}`
        );
        const orderNumbers = response2.data.orderNumber;
        // console.log(`orderNumbers :${orderNumbers}`);
        setLastOrderNumber(orderNumbers);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    const fetchDataInvoice = async () => {
      try {
        const response = await axios.get("http://192.168.1.211:8000/invoice");
        const lenght = response.data.length;
        const response2 = await axios.get(
          `http://192.168.1.211:8000/orderslast/${lenght}`
        );
        const invoiceNumbers = response2.data.invoice_number;
        console.log(`invoice_number :${invoiceNumbers}`);
        // setLastInvoiceNumber(invoiceNumbers);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchDataInvoice();
    fetchData();
  }, []);

  useEffect(() => {
    if(!lastOrderNumber){
      setNextOrderNumber('RPR/24/Jan/00001');
    }
    if (lastOrderNumber !== null && lastOrderNumber !== undefined) {
      const lastOrderNumberParts = parseInt(
        (lastOrderNumber.split("/") || []).pop(),
        10
      );
      const lastOrderNumberNumeric = lastOrderNumberParts;
      if (!isNaN(lastOrderNumberNumeric)) {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().toLocaleString("en-US", {
          month: "short",
        });
        const nextNumber = lastOrderNumberNumeric + 1;
        const formattedNumber = nextNumber.toString().padStart(5, "0");
        const newNextOrderNumber = `RPR/${currentYear
          .toString()
          .substring(2)}/${currentMonth}/${formattedNumber}`;
        setNextOrderNumber(newNextOrderNumber);
      } else {
        console.error(
          "Failed to extract numeric part from the last order number."
        );
      }
    } else {
      console.error(
        "Failed to generate order number. Last order number not available."
      );
    }
  }, [lastOrderNumber]);

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Link to="/orderList">
                <button
                  className="btn btn-success mb-3"
                  style={{ fontWeight: 700 }}
                >
                  <i className="header-icon2 fa-solid fa-arrow-left-long"></i>
                  Back
                </button>{" "}
              </Link>

              <div className="row">
                <div className="col-md-12">
                  <div
                    className="card"
                    style={{ border: "1px solid lightgray" }}
                  >
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <FaRegUser className="header-icon" />
                        Customer Detail
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <form
                            className="row g-3"
                            onSubmit={(e) => e.preventDefault()}
                          >
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
                                name="CustomeName"
                                onChange={(e) =>
                                  handleInputChange(
                                    orderItems[0].id,
                                    "CustomeName",
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
                                // onChange={(e) => setReferanceDate(currentDate)}
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
                {isCustomerSelected && (
                  <>
                    {/* Billing Detail Form */}
                    <div className="col-md-6">
                      <div
                        className="card"
                        style={{ border: "1px solid lightgray" }}
                      >
                        <div className="card-header-tab card-header">
                          <div className="card-header-title">
                            <i className="fa-regular fa-address-card header-icon"></i>
                            Billing Details
                          </div>
                        </div>
                        <div className="tab-content">
                          <div
                            className="tab-pane fade active show"
                            id="tab-billing"
                          >
                            <div className="widget-chart p-3">
                              <form className="row g-3">
                                {/* Step 1 content */}
                                <div className="form-card ">
                                  <div className="row">
                                    <div className="col-md-6 d-flex flex-column">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-circle-user header-icon2"></i>
                                        Customer
                                      </label>
                                      <input
                                        type="text"
                                        name="email"
                                        readOnly
                                        value={invoice1.CustomeName}
                                      />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-cart-arrow-down header-icon2"></i>
                                        Order Number
                                      </label>
                                      <input
                                        type="text"
                                        name="uname"
                                        readOnly
                                        value={nextOrderNumber}
                                        // value={orderItems.orderNumber}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-user-tag header-icon2"></i>
                                        Booked By
                                      </label>
                                      <input
                                        type="text"
                                        name="pwd"
                                        readOnly
                                        value="N/A"
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-location-dot header-icon2"></i>
                                        Address
                                      </label>
                                      <input
                                        type="text"
                                        name="cpwd"
                                        readOnly
                                        value={invoice1.CustomerAddress}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-building header-icon2"></i>
                                        City
                                      </label>
                                      <input
                                        type="text"
                                        name="email"
                                        readOnly
                                        value={invoice1.CustomerCity}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-building-columns header-icon2"></i>
                                        State
                                      </label>
                                      <input
                                        type="text"
                                        name="uname"
                                        readOnly
                                        value={invoice1.CustomerState}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-earth-americas header-icon2"></i>
                                        Country
                                      </label>
                                      <input
                                        type="text"
                                        name="pwd"
                                        readOnly
                                        value={invoice1.CustomerCountry}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-phone header-icon2"></i>
                                        Phone
                                      </label>
                                      <input
                                        type="text"
                                        name="email"
                                        readOnly
                                        value={invoice1.CustomeContactNo}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-at header-icon2"></i>
                                        Email
                                      </label>
                                      <input
                                        type="text"
                                        name="uname"
                                        readOnly
                                        value={invoice1.CustomeEmail}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-certificate header-icon2"></i>
                                        GST
                                      </label>
                                      <input
                                        type="text"
                                        name="pwd"
                                        readOnly
                                        value={invoice1.CustomerGST}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Detail Form */}
                    <div className="col-md-6">
                      <div
                        className="card"
                        style={{ border: "1px solid lightgray" }}
                      >
                        <div className="card-header-tab card-header">
                          <div className="card-header-title">
                            <i className="fa-solid fa-truck-fast header-icon"></i>
                            Shipping Details
                          </div>
                        </div>
                        <div className="tab-content">
                          <div
                            className="tab-pane fade active show"
                            id="tab-shipping"
                          >
                            <div className="widget-chart p-3">
                              <form
                                className="row g-3"
                                // onSubmit={handleSubmitlast}
                              >
                                <div className="form-card">
                                  <div className="row">
                                    <div className="col-md-6 d-flex flex-column">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-earth-americas header-icon2"></i>
                                        Shipping To
                                      </label>
                                      <input
                                        type="text"
                                        name="ShippingPerson"
                                        placeholder="Shipping To"
                                        value={invoice1.ShippingPerson}
                                        // onChange={handleInputChange2}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-location-dot header-icon2"></i>
                                        Address
                                      </label>
                                      <input
                                        type="text"
                                        name="ShippingAddress"
                                        placeholder="Shipping Address"
                                        value={invoice1.ShippingAddress}
                                        // onChange={handleInputChange2}
                                      />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-building header-icon2"></i>
                                        Country
                                      </label>

                                      <input
                                        type="text"
                                        name="ShippingCountry"
                                        placeholder="Shipping Country"
                                        // onChange={handleInputChange2}
                                        value={invoice1.ShippingCountry}
                                      />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-building-columns header-icon2"></i>
                                        State
                                      </label>

                                      <input
                                        type="text"
                                        name="ShippingState"
                                        placeholder="Shipping State"
                                        // onChange={handleInputChange2}
                                        value={invoice1.ShippingState}
                                      />
                                    </div>

                                    <div className="col-md-6 d-flex flex-column pt-2">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-earth-americas header-icon2"></i>
                                        City
                                      </label>

                                      <input
                                        type="text"
                                        name="ShippingCity"
                                        placeholder="Shipping City"
                                        // onChange={handleInputChange2}
                                        value={invoice1.ShippingCity}
                                      />
                                    </div>
                                    <div className="col-md-6 d-flex flex-column ">
                                      <label className="fieldlabels">
                                        <i className="fa-solid fa-truck-plane header-icon2"></i>
                                        Transportation Mode
                                      </label>
                                      <select
                                        style={{
                                          border: "none",
                                          borderBottom: "1px solid #e5e5e5",
                                          backgroundColor: "transparent",
                                          height: "47px",
                                        }}
                                        name="TransportationMode"
                                        value={invoice1.TransportationMode}
                                        // onChange={handleInputChange2}
                                      >
                                        <option>
                                          Select Transportation Mode
                                        </option>
                                        <option value="Train">Train</option>
                                        <option value="Ship">Ship</option>
                                        <option value="Plane">Plane</option>
                                        <option value="Truck">Truck</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="row mt-1">
                <div className="col-md-12">
                  <div
                    className="card"
                    style={{ border: "1px solid lightgray" }}
                  >
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
                                <th scope="col">Product Name</th>
                                <th scope="col">Serial Number</th>
                                <th scope="col">HSN</th>
                                <th scope="col">Warranty</th>

                                <th scope="col">Customer Reason</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="table-group-divider">
                              {orderItems.map((item) => (
                                <tr key={item.orderID}>
                                  <th scope="row">{item.id}</th>
                                  <td>
                                    <select
                                      className="form-select input_repair"
                                      aria-label="Default select example"
                                      value={item.productName}
                                      name="productName"
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
                                          "productName",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" disabled>
                                        Select Product Name
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
                                      value={item.serialNumber}
                                      name="serialNumber"
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      value={item.HSN}
                                      name="HSN"
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      name="isInWarranty"
                                      checked={item.isInWarranty}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
                                          "isInWarranty",
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
                                    <textarea
                                      className="input_repair"
                                      placeholder="20.0"
                                      value={item.customerReason}
                                      name="customerReason"
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      onClick={() => handleDeleteRow(item.id)}
                                    >
                                      <IoMdRemoveCircle
                                        style={{ fontSize: "1.5rem" }}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
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
                              value={orderItems[0].orderRemark}
                              onChange={(translatedText) =>
                                handleInputChange(
                                  orderItems[0].id,
                                  "orderRemark",
                                  translatedText
                                )
                              }
                            />
                          </div>
                          <button
                            className={`add-to-cart ${added ? "added" : ""} `}
                            onClick={handleButtonClick}
                          >
                            <div className="default">Place Order</div>
                            <div className="success">Placed</div>
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
