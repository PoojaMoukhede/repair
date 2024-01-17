import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Readymodel({  Title, onButtonClick, btnText, orderID, orderState, orderNumber }) {
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const handleClose = () => setShow(false);

  const handleMoveToProcess = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/orders/${orderID}/${orderState}`
      );
      const updatedOrderDetails = response.data;
      console.log("Updated order details:", updatedOrderDetails);

      setOrderDetails(updatedOrderDetails);

      if (onButtonClick) {
        onButtonClick();
      }
    } catch (error) {
      console.error("Error updating order details:", error);
    }
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/orders/${orderID}/details`
      );
      const mergedData = response.data;
      console.log(`merge data : ${mergedData}`);
      setOrderDetails(mergedData);

      if (onButtonClick) {
        onButtonClick();
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  useEffect(() => {
    if (show) {
      handleFetchData();
    }
  }, [show, orderID]);

  return (
    <>
      <Button variant="" onClick={() => setShow(true)}>
        {orderNumber}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        {/* Modal content goes here */}
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#004976", fontSize: "1.3rem" }}>
            {Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <span>Repair Item Name</span>
              <h5 className="modelText">{orderDetails.productName}</h5>
            </div>
            <div className="col-6">
              <span>Customer Name</span>
              <h5 className="modelText">{orderDetails.CustomeName}</h5>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <span>Repair Order Number</span>
              <h5 className="modelText">{orderDetails.orderNumber}</h5>
            </div>
            <div className="col-6">
              <span>Repair Order Date</span>
              <h5 className="modelText">
                {new Date(orderDetails.orderDate).toLocaleString("en-US", {
                  year: "numeric",
                 month: "short",
                  day: "2-digit",
                })}
              </h5>
            </div>
          </div>

          <hr />

          <div className="row">
            <span>Customer Remark</span>
            <h5 className="modelText">
              {orderDetails ? orderDetails.customerReason : "N/A"}
            </h5>
          </div>

          <hr />

          <div className="row">
            <span>Repairer Remark</span>
            <h5 className="modelText">
              {orderDetails ? orderDetails.orderRemark : "N/A"}
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant=""
            style={{ backgroundColor: "#004976", color: "white" }}
            onClick={handleMoveToProcess}
          >
            {btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Readymodel;
