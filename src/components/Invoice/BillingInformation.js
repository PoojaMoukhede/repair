import Header from "../Header";
import Sidebar from "../Sidebar";
import React, { useState, useEffect } from "react";
import "./style.css";
import bill from "../../Images/bill.png";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";

const BillingInformation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderID = queryParams.get("orderID");
  const currentDate = new Date().toISOString().split("T")[0];

  const [currentStep, setCurrentStep] = useState(1);
  const [isInWarranty, setIsInWarranty] = useState(false);
  const [invoice, setInvoice] = useState({
    orderID: orderID,
    invoice_number: "",
    shippingAddress: "",
    shippingPerson: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    invoiceDate: "",
    transportationMode: "",
    subTotal: 0,
    igst: "",
    cgst: "",
    sgst: "",
    ff: 0,
    hsn: "",
  });

  const parsedSubTotal = parseFloat(invoice.subTotal);
  const parsedFF = parseFloat(invoice.ff);
  const [invoice1, setInvoice1] = useState([]);
  // const [countryid, setCountryid] = useState(0);
  // const [stateid, setstateid] = useState(0);
  // const [selectedcity, setSelectedcity] = useState("");
  const [invoiceArray, setInvoiceArray] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
    // setInvoice({ ...invoice[0], [name]: value });
  };
  const handleSubmitlast = async (e) => {
    e.preventDefault();
    const shippingData = {
      orderID: orderID,
      shippingPerson: invoice.shippingPerson,
      shippingAddress: invoice.shippingAddress,
      shippingCity: invoice.shippingCity,
      shippingState: invoice.shippingState,
      shippingCountry: invoice.shippingCountry,
      transportationMode: invoice.transportationMode,
      ff: parsedFF,
      invoiceDate: currentDate,
      hsn: invoice1.HSN,
      cgst: 9.0,
      sgst: 9.0,
      // totalAmount: 120.25,
      subTotal: parsedSubTotal,
    };
    if (isInWarranty) {
      shippingData.subTotal = 0;
      shippingData.totalAmount = 0;
    } else {
      shippingData.subTotal = parsedSubTotal;
      shippingData.totalAmount = parsedSubTotal;
    }
    try {
      const response = await axios.post(
        "http://192.168.1.211:8000/invoice",
        shippingData
      );
      console.log(`shipping Data : ${shippingData}`);
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
      }));
      console.log(response);
      nextStep();
    } catch (error) {
      console.error("Error submitting shipping data:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    nextStep();
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setCurrentStep(currentStep - 1);
  };

  const setProgressBar = (curStep) => {
    const percent = parseFloat((100 / 4) * curStep).toFixed();
    return { width: `${percent}%` };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`http://192.168.1.211:8000/invoiceData/${orderID}`)
        const response2 = await axios.get(
          `http://192.168.1.211:8000/orders/${orderID}/details`
        );
        const result = Object.keys(response2).map((key) => response2[key]);
        setInvoiceArray(result);
        setInvoice1(response2.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  function handleNavigate() {
    // navigate("/regularinvoice");
    // navigate(`/regularinvoice/${orderID}`)
    console.log(`orderID : ${orderID}`);
  }

  // const handleCountryChange = (e) => {
  //   setCountryid(e.id);
  //   setInvoice((customer) => ({
  //     ...customer,
  //     CustomerCountry: e.name,
  //   }));
  // };
  // const handleStateChange = (e) => {
  //   setstateid(e.id);
  //   setInvoice((customer) => ({
  //     ...customer,
  //     CustomerState: e.name,
  //   }));
  // };

  // const handleCityChange = (e) => {
  //   setSelectedcity(e.id);
  //   setInvoice((customer) => ({
  //     ...customer,
  //     CustomerCity: e.name,
  //   }));
  // };

  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <fieldset>
            {/* Step 1 content */}
            <div className="form-card ">
              <div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                  <h3 className="steps">Step 1 - 4</h3>
                </div>
              </div>
              <div className="row">
                <div className="card-header-tab card-header mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>
                      {" "}
                      <i className="fa-solid fa-circle-user header-icon"></i>
                      Billing Information
                    </h6>
                  </div>
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-calendar-days header-icon2"></i>
                    Repair Order Date
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={invoice1.orderDate}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-cart-arrow-down header-icon2"></i>
                    Order Number
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={invoice1.orderNumber}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-user-tag header-icon2"></i>Booked
                    By
                  </label>
                  <input type="text" name="pwd" readOnly value="N/A" />
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-building header-icon2"></i>City
                  </label>
                  <input
                    type="text"
                    name="email"
                    readOnly
                    value={invoice1.CustomerCity}
                  />
                </div>
                <div className="col-md-6">
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
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-phone header-icon2"></i>Phone
                  </label>
                  <input
                    type="text"
                    name="email"
                    readOnly
                    value={invoice1.CustomeContactNo}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-at header-icon2"></i>Email
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={invoice1.CustomeEmail}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-certificate header-icon2"></i>GST
                  </label>
                  <input
                    type="text"
                    name="pwd"
                    readOnly
                    value={invoice1.CustomerGST}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-file-lines header-icon2"></i>
                    Remark
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={invoice1.orderRemark}
                  />
                </div>
              </div>
            </div>

            <button className="next action-button" onClick={handleSubmit}>
              Next
            </button>
          </fieldset>
        );
      case 2:
        return (
          <fieldset onSubmit={handleSubmitlast}>
            {/* Step 2 content */}
            <div className="form-card">
              <div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                  <h2 className="steps">Step 2 - 4</h2>
                </div>
              </div>

              <div className="row">
                <div className="card-header-tab card-header mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>
                      <i className="fa-solid fa-truck-fast header-icon"></i>
                      Shipping Information
                    </h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-earth-americas header-icon2"></i>
                    Shipping To
                  </label>
                  <input
                    type="text"
                    name="shippingPerson"
                    placeholder="Shipping To"
                    value={invoice.shippingPerson}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-location-dot header-icon2"></i>
                    Address
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Shipping Address"
                    value={invoice.shippingAddress}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-building header-icon2"></i>Country
                  </label>
                  {/* <CountrySelect
                    name="shippingCountry"
                    onChange={handleCountryChange}
                    placeHolder="Shipping Country"
                    style={{height:'50px',border:'none'}}
                  /> */}
                  <input
                    type="text"
                    name="shippingCountry"
                    placeholder="Shipping Country"
                    onChange={handleInputChange}
                    value={invoice.shippingCountry}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-building-columns header-icon2"></i>
                    State
                  </label>
                  {/* <StateSelect
                    name="shippingState"
                    countryid={countryid}
                    onChange={handleStateChange}
                    placeHolder="Shipping State"
                  /> */}
                  <input
                    type="text"
                    name="shippingState"
                    placeholder="Shipping State"
                    onChange={handleInputChange}
                    value={invoice.shippingState}
                  />
                </div>

                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i className="fa-solid fa-earth-americas header-icon2"></i>
                    City
                  </label>
                  {/* <CitySelect
                    name="shippingCity"
                    countryid={countryid}
                    stateid={stateid}
                    placeHolder="Shipping City"
                    onChange={handleCityChange}
                    // required
                  /> */}
                  <input
                    type="text"
                    name="shippingCity"
                    placeholder="Shipping City"
                    onChange={handleInputChange}
                    value={invoice.shippingCity}
                  />
                </div>
                <div className="col-md-6 d-flex flex-column">
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
                      // width: "450px",
                    }}
                    name="transportationMode"
                    value={invoice.transportationMode}
                    onChange={handleInputChange}
                  >
                    <option>Select Transportation Mode</option>
                    <option value="Train">Train</option>
                    <option value="Ship">Ship</option>
                    <option value="Plane">Plane</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>

                {/* Add the checkbox */}
                <div className="col-md-6 d-flex flex-row">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-trash-can header-icon2"></i>
                    Is In Warranty?
                  </label>
                  <input
                    type="checkbox"
                    style={{ height: "20px", width: "100px" }}
                    name="scrapped"
                    checked={isInWarranty}
                    onChange={() => setIsInWarranty(!isInWarranty)}
                  />
                </div>
                {/* Conditionally render F&F and Amount inputs based on the checkbox */}
                {!isInWarranty && (
                  <>
                    <div className="col-md-6">
                      <label className="fieldlabels">
                        <i className="fa-solid fa-coins header-icon2"></i>
                        F&F
                      </label>
                      <input
                        type="number"
                        placeholder=""
                        name="ff"
                        value={parsedFF}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="fieldlabels">
                        <i className="fa-solid fa-indian-rupee-sign header-icon2"></i>
                        Amount
                      </label>
                      <input
                        type="number"
                        name="subTotal"
                        value={parsedSubTotal}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <button className="next action-button" onClick={handleSubmit}>
              Next
            </button>
            <button
              className="previous action-button-previous"
              onClick={prevStep}
            >
              Previous
            </button>
          </fieldset>
        );
      case 3:
        return (
          <fieldset>
            {/* Step 3 content */}
            <div className="form-card ">
              <div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                  <h2 className="steps">Step 3 - 4</h2>
                </div>
              </div>
              <div className="card-header-tab card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h6>
                    <i className="fa-solid fa-screwdriver-wrench header-icon"></i>
                    Repair Order Information
                  </h6>
                </div>
              </div>
              <div
                className="table-responsive table"
                style={{ height: "auto" }}
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
                      <th className="text-center"> Customer Reason</th>
                      <th className="text-center">Repaired Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceArray.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-center">{entry.orderDate}</td>
                        <td className="text-center">{entry.orderNumber}</td>
                        <td className="text-center">{entry.CustomeName}</td>
                        <td className="text-center">{entry.productName}</td>
                        <td className="text-center">{entry.serialNumber}</td>
                        <td className="text-center">{entry.customerReason}</td>
                        <td className="text-center">{entry.orderDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="next action-button" onClick={handleSubmitlast}>
              Submit
            </button>
            <button
              className="previous action-button-previous"
              onClick={prevStep}
            >
              Previous
            </button>
          </fieldset>
        );
      case 4:
        return (
          <fieldset>
            {/* Step 4 content */}
            <div className="form-card card">
              <div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                  <h2 className="steps">Step 4 - 4</h2>
                </div>
              </div>
              <br />
              <br />
              <div className="row justify-content-center">
                <div className="col-3">
                  <img src={bill} className="fit-image" alt="" />
                </div>
              </div>
              <br />
              <br />
              <div className="row justify-content-center">
                <div className="col-2 text-center">
                  <button className="btn btn-success" onClick={handleNavigate}>
                    <i className="fa-solid fa-file-invoice header-icon2"></i>
                    {/* Generate Invoice */}
                    Preview Invoice
                  </button>
                </div>
                <div className="col-2 text-center">
                  <button
                    className="btn btn-success"
                    onClick={navigate("/invoiceTable")}
                  >
                    <i className="fa-solid fa-file-lines header-icon2"></i>
                    {/* Generate Invoice */}
                    Invoice Table
                  </button>
                </div>
              </div>
            </div>
            <button
              className="previous action-button-previous"
              onClick={prevStep}
            >
              Previous
            </button>
          </fieldset>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Link to="/tobill">
                <button
                  className="btn btn-success mb-3"
                  style={{ fontWeight: 700, marginBottom: "0" }}
                >
                  <i className="header-icon2 fa-solid fa-arrow-left-long"></i>
                  Back
                </button>{" "}
              </Link>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="tab-content">
                      <div className="container-fluid">
                        <div
                          className="row justify-content-center"
                          style={{ backgroundColor: "#f9fdff" }}
                        >
                          <div className="col-11 col-sm-10 col-md-10 col-lg-10 col-xl-10 text-center p-0 mb-2">
                            <div
                              className="card px-0 pt-1 pb-0"
                              style={{ backgroundColor: "#f9fdff" }}
                            >
                              <form id="msform" onSubmit={handleSubmitlast}>
                                {/* progressbar */}
                                <ul id="progressbar">
                                  <li
                                    className={
                                      currentStep === 1 ? "active" : ""
                                    }
                                    id="account"
                                  >
                                    <strong>Billing Information</strong>
                                  </li>
                                  <li
                                    className={
                                      currentStep === 2 ? "active" : ""
                                    }
                                    id="personal"
                                  >
                                    <strong>Shipping Information</strong>
                                  </li>

                                  <li
                                    className={
                                      currentStep === 3 ? "active" : ""
                                    }
                                    id="payment"
                                  >
                                    <strong>Order Information</strong>
                                  </li>
                                  <li
                                    className={
                                      currentStep === 4 ? "active" : ""
                                    }
                                    id="confirm"
                                  >
                                    <strong>Success</strong>
                                  </li>
                                </ul>
                                <div className="progress">
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    role="progressbar"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={setProgressBar(currentStep)}
                                  ></div>
                                </div>
                                <br />
                                {/* fieldsets */}
                                {renderStep(currentStep)}
                              </form>
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
        </div>
      </div>
    </>
  );
};

export default BillingInformation;
