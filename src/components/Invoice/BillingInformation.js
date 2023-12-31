import Header from "../Header";
import Sidebar from "../Sidebar";
import React, { useState, useEffect } from "react";
import "./style.css";
import bill from "../../Images/bill.png";
import axios from "axios";

const BillingInformation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    orderID: "",
    orderDate: "",
    orderNumber: "",
    CustomerAddress: "",
    CustomerCity: "",
    CustomerState: "",
    CustomerCountry: "",
    CustomeContactNo: "",
    CustomeEmail: "",
    CustomerGST: "",
    orderRemark: "",
  });

  const [invoice, setInvoice] = useState({
    invoice_number: "",
    shippingAddress: "",
    shippingPerson: "",
    shippingCity: "",
    shippingState: "",
    shippingCountry: "",
    invoiceDate: "",
    transportationMode: "",
    subTotal: "",
    igst: "",
    cgst: "",
    sgst: "",
    ff: "",
    hsn: "",
    totalAmount: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  useEffect(() => {
    const fetchData = async (orderID) => {
      try {
        const response = await axios.get(
          //   `http://localhost:8000/orders/${orderID}/details`
          `http://localhost:8000/orders/1/details`
        );
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching order list:", error);
      }
    };
    fetchData();
  }, []);

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
                      <i class="fa-solid fa-circle-user header-icon"></i>Billing
                      Information
                    </h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-circle-user header-icon2"></i>Customer
                  </label>
                  <input
                    type="text"
                    name="email"
                    readOnly
                    value={orderData.CustomerName}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-calendar-days header-icon2"></i>Repair
                    Order Date
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={orderData.orderDate}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-cart-arrow-down header-icon2"></i>
                    Order Number
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={orderData.orderNumber}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-user-tag header-icon2"></i>Booked By
                  </label>
                  <input type="text" name="pwd" readOnly value="N/A" />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-location-dot header-icon2"></i>Address
                  </label>
                  <input
                    type="text"
                    name="cpwd"
                    readOnly
                    value={orderData.CustomerAddress}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-building header-icon2"></i>City
                  </label>
                  <input
                    type="text"
                    name="email"
                    readOnly
                    value={orderData.CustomerCity}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-building-columns header-icon2"></i>
                    State
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={orderData.CustomerState}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-earth-americas header-icon2"></i>
                    Country
                  </label>
                  <input
                    type="text"
                    name="pwd"
                    readOnly
                    value={orderData.CustomerCountry}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-phone header-icon2"></i>Phone
                  </label>
                  <input
                    type="text"
                    name="email"
                    readOnly
                    value={orderData.CustomeContactNo}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-at header-icon2"></i>Email
                  </label>
                  <input
                    type="text"
                    name="uname"
                    readOnly
                    value={orderData.CustomeEmail}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-certificate header-icon2"></i>GST
                  </label>
                  <input
                    type="text"
                    name="pwd"
                    readOnly
                    value={orderData.CustomerGST}
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-file-lines header-icon2"></i>Remark
                  </label>
                  <input
                    type="email"
                    name="email"
                    readOnly
                    value={orderData.orderRemark}
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
          <fieldset>
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
                      <i class="fa-solid fa-truck-fast header-icon"></i>Shipping
                      Information
                    </h6>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-earth-americas header-icon2"></i>
                    Shipping To
                  </label>
                  <input
                    type="text"
                    name=""
                    placeholder="Shipping To"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-location-dot header-icon2"></i>Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Shipping Address"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-building header-icon2"></i>City
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Shipping City"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-building-columns header-icon2"></i>
                    State
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Shipping State"
                    value=""
                  />
                </div>
                <div className="col-md-6">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-earth-americas header-icon2"></i>
                    Country
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Shipping Country"
                  />
                </div>
                <div className="col-md-3">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-truck-plane header-icon2"></i>
                    Transportation Mode
                  </label>
                  <select
                    style={{
                      border: "none",
                      borderBottom: "1px solid #e5e5e5",
                      backgroundColor: "transparent",
                      height: "47px",
                      width: "350px",
                    }}
                    value={invoice.transportationMode}
                  >
                    <option>Select Transportation Mode</option>
                    <option value="Train">Train</option>
                    <option value="Ship">Ship</option>
                    <option value="Plane">Plane</option>
                    <option value="Truck">Truck</option>
                  </select>
                  {/* <input type="text" name="email" placeholder="Shipping Country" /> */}
                </div>
                <div className="col-md-3">
                  <label className="fieldlabels">
                    <i class="fa-solid fa-indian-rupee-sign header-icon2"></i>
                    F&F
                  </label>
                  <input type="number" name="email"  value={invoice.ff}/>
                </div>
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
                    <i class="fa-solid fa-screwdriver-wrench header-icon"></i>
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
                      <th className="text-center">Repairer Note</th>
                      <th className="text-center">Repaired Date</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td className="text-center">CustomerName</td>
                    <td className="text-center">productName</td>
                    <td className="text-center">serialNumber</td>
                    <td className="text-center">customerReason</td>
                    <td className="text-center">orderRemark</td>
                    <td className="text-center">CustomerName</td>
                    <td className="text-center">productName</td>
                    <td className="text-center">serialNumber</td>
                    <td className="text-center">customerReason</td>
                    <td className="text-center">orderRemark</td>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="next action-button" onClick={handleSubmit}>
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
                <div className="col-7 text-center">
                  <button className="btn btn-success">
                    <i class="fa-solid fa-file-invoice header-icon2"></i>
                    Generate Invoice
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
                              className="card px-0 pt-4 pb-0"
                              style={{ backgroundColor: "#f9fdff" }}
                            >
                              <form
                                id="msform"
                                //   onSubmit={handleSubmit}
                              >
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
