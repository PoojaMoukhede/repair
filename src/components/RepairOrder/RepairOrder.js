import React, { useState } from "react";
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

export default function RepairOrder() {
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 1,
      product: "",
      serialNumber: "",
      hsnCode: "",
      includeHsn: false,
      rate: "",
      tax: "",
      total: "",
      customerReason: "",
    },
  ]);
  const [cartCountValue, setCartCountValue] = useState(1);
  const handleAddRow = () => {
    setInvoiceItems((prevItems) => [
      ...prevItems,
      {
        id: prevItems.length + 1,
        product: "",
        serialNumber: "",
        hsnCode: "",
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
    setInvoiceItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setCartCountValue((prevCount) => prevCount - 1);
  };

  const handleInputChange = (id, name, value) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };
  const [added, setAdded] = useState(false);

  const handleButtonClick = () => {
    setAdded(!added);
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
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        {/* <i className="header-icon fa-regular fa-user"></i> */}
                        <FaRegUser className="header-icon" />
                        Customer Detail
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <form className="row g-3">
                            <div className="col-md-4">
                              <label htmlFor="inputEmail4" className="form-label">
                                Customer Name
                              </label>
                              <select
                                className="form-select input_repair"
                                aria-label="Default select example"
                              >
                                <option selected>Select Customer</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="inputEmail4" className="form-label">
                                Customer Referance
                              </label>
                              <input
                                type="text"
                                className={`form-control input_repair`}
                                placeholder="Referance"
                                required
                              />
                            </div>
                            <div className="col-md-4">
                              <label htmlFor="inputAddress" className="form-label">
                                Customer Referance Date
                              </label>
                              <input
                                type="date"
                                className={`form-control input_repair`}
                                placeholder="Referance"
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
                                <th scope="col">Product</th>
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
                            <tbody className="table-group-divider">
                              {invoiceItems.map((item) => (
                                <tr key={item.id}>
                                  <th scope="row">{item.id}</th>
                                  <td>
                                    <select
                                      className="form-select input_repair"
                                      aria-label="Default select example"
                                      value={item.product}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
                                          "product",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" disabled>
                                        Select Product
                                      </option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                  </td>
                                  <td>
                                    <input
                                      className="input_repair"
                                      placeholder="N/A"
                                      value={item.serialNumber}
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
                                      value={item.hsnCode}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
                                          "hsnCode",
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
                                      checked={item.includeHsn}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      value={item.rate}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      value={item.tax}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      value={item.total}
                                      onChange={(e) =>
                                        handleInputChange(
                                          item.id,
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
                                      value={item.customerReason}
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
                            <span className="d-flex"><h6 className="ms-2">Order Remark</h6> <small className="ms-2">(upto 500 character)</small></span>
                            <OrderComponent />
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
