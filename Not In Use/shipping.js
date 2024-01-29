import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditShipping({
  open,
  onClose,
  selectedDetails,
  orderID1,
  selectedOrder,
  CustomeID,
  onButtonClick,
}) {
  const navigate = useNavigate();
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(null);
  const [nextInvoiceNumber, setNextInvoiceNumber] = useState("");
  const [formData, setFormData] = useState({
    orderID: selectedOrder,
    ShippingPerson: "",
    ShippingAddress: "",
    ShippingCountry: "",
    ShippingState: "",
    ShippingCity: "",
    TransportationMode: "",
    subTotal: "",
    ff: "",
    CustomeID: CustomeID,
    invoice_number: "",
    // invoice_number:'MCIPL/RPR/2425/Jan/000001'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (selectedDetails) {
      const customer = {
        CustomeID: CustomeID,
        ShippingPerson: selectedDetails.ShippingPerson,
        ShippingAddress: selectedDetails.ShippingAddress,
        ShippingCountry: selectedDetails.ShippingCountry,
        ShippingCity: selectedDetails.ShippingCity,
        ShippingState: selectedDetails.ShippingState,
        TransportationMode: selectedDetails.TransportationMode,
        invoice_number: nextInvoiceNumber,
        orderID: selectedOrder,
      };

      setFormData(customer);
    }
  }, [selectedDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://192.168.1.211:8000/invoice", formData)
      .then((res) => {
        const updatedOrderItems = Array.isArray(res.data) ? res.data : [];
        setFormData(updatedOrderItems);
        if (onButtonClick) {
          onButtonClick();
        }
        // const nextInvoiceNumber = generateNextInvoiceNumber();
        // console.log("Generated Invoice Number:", nextInvoiceNumber);
        // navigate(`/regularinvoice/${orderID}`)
      })
      .catch((err) => {
        console.error("Error posting order:", err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.211:8000/invoice");
        const lenght = response.data.length;
        const response2 = await axios.get(
          `http://192.168.1.211:8000/invoicelast/${lenght}`
        );
        const invoiceNumbers = response2.data.invoice_number;
        console.log(`invoiceNumbers : ${response2.data.invoice_number}`);
        setLastInvoiceNumber(response2.data.invoice_number);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (lastInvoiceNumber !== null && lastInvoiceNumber !== undefined) {
      const lastInvoiceNumberParts = parseInt(
        (lastInvoiceNumber.split("/") || []).pop(),
        10
      );
      const lastInvoiceNumberNumeric = lastInvoiceNumberParts;
      if (!isNaN(lastInvoiceNumberNumeric)) {
        const currentYear = new Date().getFullYear();
        const nextNumber = lastInvoiceNumberNumeric + 1;
        const currentMonth = new Date();
        const formattedNumber = nextNumber.toString().padStart(6, "0");
        const newNextOrderNumber = `MCIPL/RPR/${currentYear
          .toString()
          .substring(2)}${(currentYear + 1)
          .toString()
          .substring(2)}/${(currentMonth).toLocaleString('en-us',{
          month: "short",
        })}/${formattedNumber}`;
        // console.log(`Next Invoice Number before set: ${nextInvoiceNumber}`);
        setNextInvoiceNumber(newNextOrderNumber);
        console.log(`Next Invoice Number after set: ${nextInvoiceNumber}`);
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
  }, [lastInvoiceNumber,nextInvoiceNumber]);

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
            <h2>Shipping Information</h2>
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="customer Name"
                    name="ShippingPerson"
                    value={formData.ShippingPerson}
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
                    label="F&F"
                    name="ff"
                    value={formData.ff}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="subTotal"
                    value={formData.subTotal}
                    label="Amount"
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
                    label="Transportation Mode"
                    name="TransportationMode"
                    value={formData.TransportationMode}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="ShippingAddress"
                    value={formData.ShippingAddress}
                    label="Shipping Address"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </div>

              <div className="grid-row mt-3">
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Shipping Country"
                    name="ShippingCountry"
                    value={formData.ShippingCountry}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>

                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Shipping State"
                    name="ShippingState"
                    value={formData.ShippingState}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    label="Shipping City"
                    name="ShippingCity"
                    value={formData.ShippingCity}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
