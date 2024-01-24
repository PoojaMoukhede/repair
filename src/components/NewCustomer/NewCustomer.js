import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useAPI } from "../Context";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function NewCustomer() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedcity, setSelectedcity] = useState("");
  const { onAddCustomer } = useAPI();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [formData, setFormData] = useState({
    CustomeName: "",
    CustomeEmail: "",
    CustomeContactNo: "",
    CustomerCountry: "",
    CustomerState: "",
    CustomerCity: "",
    CustomerAddress: "",
    CustomerPinCode: "",
    CustomerGST: "",
    CustomerPAN: "",
    CustomerCIN: "",
    CustomerTAN: "",
    ShippingPerson: "",
    ShippingAddress: "",
    ShippingCountry: "",
    ShippingState: "",
    ShippingCity: "",
    TransportationMode: "",
  });

  const [formErrors, setFormErrors] = useState({
    CustomeName: "",
    CustomeEmail: "",
    CustomeContactNo: "",
    CustomerCountry: "",
    CustomerState: "",
    CustomerCity: "",
    CustomerAddress: "",
    CustomerPinCode: "",
    CustomerGST: "",
    CustomerPAN: "",
    CustomerCIN: "",
    CustomerTAN: "",
    ShippingPerson: "",
    ShippingAddress: "",
    ShippingCountry: "",
    ShippingState: "",
    ShippingCity: "",
    TransportationMode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };
    if (formData.CustomeName.trim() === "") {
      newErrors.CustomeName = "Please enter the customer's name.";
      valid = false;
    }

    if (formData.CustomeEmail.trim() === "") {
      newErrors.CustomeEmail = "Please enter the customer's email.";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.CustomeEmail)) {
        newErrors.CustomeEmail = "Please enter a valid email address.";
        valid = false;
      }
    }
    if (formData.CustomeContactNo.trim() === "") {
      newErrors.CustomeContactNo = "Please enter the customer's phone number.";
      valid = false;
    } else if (
      isNaN(formData.CustomeContactNo) ||
      formData.CustomeContactNo.length !== 10
    ) {
      newErrors.CustomeContactNo =
        "Please enter a valid 10-digit numeric phone number.";
      valid = false;
    }
    if (formData.CustomerAddress.trim() === "") {
      newErrors.CustomerAddress = "Please enter the customer's address.";
      valid = false;
    }
    if (formData.CustomerState.trim() === "") {
      newErrors.CustomerState = "Please enter the customer's state.";
      valid = false;
    }
    if (formData.CustomerCountry.trim() === "") {
      newErrors.CustomerCountry = "Please enter the customer's country.";
      valid = false;
    }
    if (formData.CustomerCity.trim() === "") {
      newErrors.CustomerCity = "Please enter the customer's city.";
      valid = false;
    }

    if (formData.CustomerPinCode.trim() === "") {
      newErrors.CustomerPinCode = "Please enter the customer's pin code.";
      valid = false;
    } else if (
      isNaN(formData.CustomerPinCode) ||
      formData.CustomerPinCode.length !== 6
    ) {
      newErrors.CustomerPinCode =
        "Please enter a valid 6-digit numeric pin code.";
      valid = false;
    }
    if (formData.CustomerGST.trim() === "") {
      newErrors.CustomerGST = "Please enter the customer's GST.";
      valid = false;
    }
    if (formData.CustomerPAN.trim() === "") {
      newErrors.CustomerPAN = "Please enter the customer's PAN.";
      valid = false;
    }
    if (formData.CustomerCIN.trim() === "") {
      newErrors.CustomerCIN = "Please enter the customer's CIN.";
      valid = false;
    }
    if (formData.CustomerTAN.trim() === "") {
      newErrors.CustomerTAN = "Please enter the customer's TAN.";
      valid = false;
    }

    if (formData.ShippingPerson.trim() === "") {
      newErrors.ShippingPerson = "Please enter Shipping Person.";
      valid = false;
    }
    if (formData.ShippingAddress.trim() === "") {
      newErrors.ShippingAddress = "Please enter the Shipping Address.";
      valid = false;
    }
    if (formData.ShippingCountry.trim() === "") {
      newErrors.ShippingCountry = "Please enter the Shipping Country.";
      valid = false;
    }
    if (formData.ShippingState.trim() === "") {
      newErrors.ShippingState = "Please enter the Shipping State.";
      valid = false;
    }
    if (formData.ShippingCity.trim() === "") {
      newErrors.ShippingCity = "Please enter the Shipping City.";
      valid = false;
    }
    if (formData.TransportationMode.trim() === "") {
      newErrors.TransportationMode = "Please enter Transportation Mode.";
      valid = false;
    }
    setFormErrors(newErrors);
    const isValid = Object.values(newErrors).every((error) => error === "");
    setIsFormValid(isValid);

    // return {isValid ,valid};
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowShippingForm(true);
    console.log("Form validated successfully:", formData);
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddCustomer(formData);
      console.log("Customer data added to API:", formData);
    } else {
      console.log("Form validation failed.");
    }
  };

  const handleCountryChange = (e) => {
    setCountryid(e.id);
    setFormData((customer) => ({
      ...customer,
      CustomerCountry: e.name,
    }));
  };
  const handleStateChange = (e) => {
    setstateid(e.id);
    setFormData((customer) => ({
      ...customer,
      CustomerState: e.name,
    }));
  };

  const handleCityChange = (e) => {
    setSelectedcity(e.id);
    setFormData((customer) => ({
      ...customer,
      CustomerCity: e.name,
    }));
  };

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <Link to="/customerList">
                <button className="btn btn-success">
                  <i className="header-icon fa-solid fa-arrow-left-long"></i>
                  Back
                </button>{" "}
              </Link>
              <div className="row">
                <div className="col-md-8 m-auto mt-3">
                  <div className="card cardR">
                    <div className="card-header-tab card-header card-header2">
                      <div className="card-header-title text-center">
                        <i className="header-icon fa-solid fa-user-plus"></i>
                        Create New Customer
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Name
                              </label>
                              <input
                                className={`form-control ${
                                  formErrors.CustomeName && "is-invalid"
                                }`}
                                id="CustomeName"
                                name="CustomeName"
                                value={formData.CustomeName}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomeName}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Email
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomeEmail && "is-invalid"
                                }`}
                                id="CustomeEmail"
                                name="CustomeEmail"
                                value={formData.CustomeEmail}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomeEmail}
                              </div>
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor="inputAddress"
                                className="form-label"
                              >
                                Customer Address
                              </label>
                              <textarea
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomerAddress && "is-invalid"
                                }`}
                                id="CustomerAddress"
                                name="CustomerAddress"
                                value={formData.CustomerAddress}
                                onChange={handleInputChange}
                                required
                                // placeholder="1234 Main St"
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerAddress}
                              </div>
                            </div>

                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer GST
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomerGST && "is-invalid"
                                }`}
                                id="CustomerGST"
                                name="CustomerGST"
                                value={formData.CustomerGST}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerGST}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer PAN
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomerPAN && "is-invalid"
                                }`}
                                id="CustomerPAN"
                                name="CustomerPAN"
                                value={formData.CustomerPAN}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerPAN}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer CIN
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomerCIN && "is-invalid"
                                }`}
                                id="CustomerCIN"
                                name="CustomerCIN"
                                value={formData.CustomerCIN}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerCIN}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer TAN
                              </label>
                              <input
                                type="text"
                                className={`form-control ${
                                  formErrors.CustomerTAN && "is-invalid"
                                }`}
                                id="CustomerTAN"
                                name="CustomerTAN"
                                value={formData.CustomerTAN}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerTAN}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Pin Code
                              </label>
                              <input
                                type="number"
                                className={`form-control ${
                                  formErrors.CustomerPinCode && "is-invalid"
                                }`}
                                id="CustomerPinCode"
                                name="CustomerPinCode"
                                value={formData.CustomerPinCode}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerPinCode}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Customer Phone Number
                              </label>
                              <input
                                type="number"
                                className={`form-control ${
                                  formErrors.CustomeContactNo && "is-invalid"
                                }`}
                                id="CustomeContactNo"
                                name="CustomeContactNo"
                                value={formData.CustomeContactNo}
                                onChange={handleInputChange}
                                required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomeContactNo}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                Country
                              </label>
                              <CountrySelect
                                name="CustomerCountry"
                                onChange={handleCountryChange}
                                placeHolder="Select Country"
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerCountry}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                State
                              </label>
                              <StateSelect
                                name="CustomerState"
                                countryid={countryid}
                                onChange={handleStateChange}
                                placeHolder="Select State"
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerState}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputEmail4"
                                className="form-label"
                              >
                                City
                              </label>
                              <CitySelect
                                name="CustomerCity"
                                countryid={countryid}
                                stateid={stateid}
                                placeHolder="Select City"
                                onChange={handleCityChange}
                                // required
                              />
                              <div className="invalid-feedback">
                                {formErrors.CustomerCity}
                              </div>
                            </div>
                            <div className="col-12 d-flex justify-content-center align-item-center">
                              <button type="submit" className={`btn btn2`}>
                                Continue
                                <i
                                  className=" fa-solid fa-circle-chevron-right"
                                  style={{
                                    fontSize: "1.3rem",
                                    marginLeft: "1rem",
                                  }}
                                ></i>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showShippingForm && (
                <div className="row mt-3">
                  <div className="col-md-8 m-auto mt-3">
                    <div className="card cardR">
                      <div className="card-header-tab card-header card-header2">
                        <div className="card-header-title text-center">
                          <i className="header-icon fa-solid fa-user-plus"></i>
                          Shipping Details
                        </div>
                      </div>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="tab-eg-55"
                        >
                          <div className="widget-chart p-3">
                            <form className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  Shipping Person
                                </label>
                                <input
                                  type="text"
                                  name="ShippingPerson"
                                  className="form-control"
                                  value={formData.ShippingPerson}
                                  onChange={handleInputChange}
                                />
                                <div className="invalid-feedback">
                                  {formErrors.ShippingPerson}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Shipping Address
                                </label>
                                <input
                                  type="text"
                                  name="ShippingAddress"
                                  className="form-control"
                                  value={formData.ShippingAddress}
                                  onChange={handleInputChange}
                                />
                                <div className="invalid-feedback">
                                  {formErrors.ShippingAddress}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Shipping Country
                                </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  name="ShippingCountry"
                                  onChange={handleInputChange}
                                  value={formData.ShippingCountry}
                                />
                                <div className="invalid-feedback">
                                  {formErrors.ShippingCountry}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Shipping State
                                </label>

                                <input
                                  type="text"
                                  name="ShippingState"
                                  className="form-control"
                                  onChange={handleInputChange}
                                  value={formData.ShippingState}
                                />
                                <div className="invalid-feedback">
                                  {formErrors.ShippingState}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  Shipping City
                                </label>

                                <input
                                  type="text"
                                  name="ShippingCity"
                                  className="form-control"
                                  onChange={handleInputChange}
                                  value={formData.ShippingCity}
                                />
                                <div className="invalid-feedback">
                                  {formErrors.ShippingCity}
                                </div>
                              </div>
                              <div className="col-md-6 d-flex flex-column">
                                <label className="form-label">
                                  Transportation Mode
                                </label>
                                <select
                                  style={{
                                    borderRadius: "5px",
                                    border: "1px solid #e5e5e5",
                                    backgroundColor: "transparent",
                                    height: "40px",
                                  }}
                                  name="TransportationMode"
                                  value={formData.TransportationMode}
                                  onChange={handleInputChange}
                                >
                                  <option></option>
                                  <option value="Train">Train</option>
                                  <option value="Ship">Ship</option>
                                  <option value="Plane">Plane</option>
                                  <option value="Truck">Truck</option>
                                </select>
                                <div className="invalid-feedback">
                                  {formErrors.TransportationMode}
                                </div>
                              </div>

                              <div className="col-12 d-flex justify-content-center align-item-center">
                                <button
                                  type="submit"
                                  className={`btn btn2`}
                                  onClick={handleAddCustomer}
                                >
                                  <i
                                    className="fa-solid fa-circle-plus"
                                    style={{
                                      fontSize: "1.3rem",
                                      marginRight: "1rem",
                                    }}
                                  ></i>
                                  Add Customer
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
