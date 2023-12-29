import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Readymodel({ Title, onButtonClick ,btnText}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMoveForBilling = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    handleClose();
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        modal
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
              <h5 className="modelText">AVH14-T1-07</h5>
            </div>
            <div className="col-6">
              <span>Customer Name</span>
              <h5 className="modelText">AVH14-T1-07</h5>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <span>Repair Item Name</span>
              <h5 className="modelText">AVH14-T1-07</h5>
            </div>
            <div className="col-6">
              <span>Repair Item Name</span>
              <h5 className="modelText">AVH14-T1-07</h5>
            </div>
          </div>
          <hr />
          <div className="row">
            <span>Customer Remark</span>
            <h5 className="modelText">N/A</h5>
          </div>
          <hr />
          <div className="row">
            <span>Repairer Remark</span>
            <h5 className="modelText">N/A</h5>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant=""
            style={{ backgroundColor: "#004976", color: "white" }}
            onClick={handleMoveForBilling}
          >{btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Readymodel;
