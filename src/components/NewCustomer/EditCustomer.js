import React, { useState,useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import { useAPI } from "../Context";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function EditCustomer({ open, onClose, selectedCustomer }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedcity, setSelectedcity] = useState("");
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
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };
  useEffect(() => {
    if (selectedCustomer) {
      const customer = {
        CustomeID : selectedCustomer.CustomeID,
        CustomeName: selectedCustomer.CustomeName,
        CustomeEmail: selectedCustomer.CustomeEmail,
        CustomeContactNo: selectedCustomer.CustomeContactNo,
        CustomerCountry: selectedCustomer.CustomerCountry,
        CustomerCity: selectedCustomer.CustomerCity,
        CustomerState: selectedCustomer.CustomerState,
        CustomerAddress: selectedCustomer.CustomerAddress,
        CustomerPinCode: selectedCustomer.CustomerPinCode,
        CustomerGST: selectedCustomer.CustomerGST,
      };

      setFormData(customer);
    }
  }, [selectedCustomer]);
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
    if (formData.CustomerGST.trim() === "") {
      newErrors.CustomerGST = "Please enter the customer's GST.";
      valid = false;
    }
   
    setFormErrors(newErrors);
    return valid;
  };
  const { onCustomerEdit } = useAPI();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCustomerEdit(selectedCustomer.CustomeID, formData);
      console.log("Form submitted:", formData);
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
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-container">
            <h2>Edit Customer Information</h2>
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="customer Name"
                    name="CustomeName"
                    value={formData.CustomeName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="  Customer Phone Number"
                    name="CustomeContactNo"
                    value={formData.CustomeContactNo}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                
                
              </div>

              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Customer Address"
                    name="CustomerAddress"
                    value={formData.CustomerAddress}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
              </div>
              <div className="grid-row">
              <div className="grid-item">
                  <TextField
                    type="text"
                    name="CustomeEmail"
                    value={formData.CustomeEmail}
                    label="Customer Email"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </div>

              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Customer Pin Code"
                    name="CustomerPinCode"
                    value={formData.CustomerPinCode}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Customer GST"
                    name="CustomerGST"
                    value={formData.CustomerGST}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                
              </div>

              <div className="grid-row mt-3">
                <div className="grid-item">
                  <CountrySelect
                    name="CustomerCountry"
                    onChange={handleCountryChange}
                    placeHolder="Select Country"
                  />
                </div>

                <div className="grid-item">
                  <StateSelect
                    name="CustomerState"
                    countryid={countryid}
                    onChange={handleStateChange}
                    placeHolder="Select State"
                  />
                </div>
                <div className="grid-item">
                  <CitySelect
                    name="CustomerCity"
                    countryid={countryid}
                    stateid={stateid}
                    onChange={handleCityChange}
                    placeHolder="Select City"
                  />
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update Customer
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
