import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Readymodel({ Title, onButtonClick, btnText, orderID }) {
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  const handleClose = () => setShow(false);

  // const handleMoveForBilling = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/orders/${orderID}/details`);
  //     const mergedData = response.data; 
  //     console.log(`merge data : ${mergedData}`);
  //     setOrderDetails(mergedData);

  //     if (onButtonClick) {
  //       onButtonClick();
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //   }
  // };
 const handleMoveToProcess = () => {
    axios
      .put(`http://localhost:8000/orders/${orderID}/move-to-process`, {
        isInProcess: true, 
      })
      .then((res) => {
        console.log("Server response:", res.data);
      })
      .catch((err) => {
        console.error("Error updating order:", err);
      });
  }

  useEffect(() => {
    if (show) {
      handleMoveToProcess()
      // handleMoveForBilling();
    }
  }, [show, orderID]);

  return (
    <>
      <Button variant="" 
      // onClick={handleShow}
      onClick={()=>setShow(true)}
      >
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
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
              <h5 className="modelText">{orderDetails.orderDate}</h5>
            </div>
          </div>

          <hr />

          <div className="row">
            <span>Customer Remark</span>
            <h5 className="modelText">{orderDetails? orderDetails.customerReason :"N/A"}</h5>
          </div>

          <hr />

          <div className="row">
            <span>Repairer Remark</span>
            <h5 className="modelText">{orderDetails? orderDetails.orderRemark :"N/A"}</h5>
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
