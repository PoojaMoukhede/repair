import React, { useState, useEffect } from "react";
import logo from "../../Images/multispan-logo-HD.png";
import QR from "../../Images/qr-code.png";
import axios from "axios";
import upi from "../../Images/upi-ar21.svg";

export default function RegularInvoice() {
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/companyDetail`)
        .then((response) => {
          setDetail(response.data[0]);
          console.log("----data----", response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <main className="container-fluid">
        <div className="row">
          <div className="container">
            <div className="col-12">
              <div className="col-12 pt-2">
                <table
                  className="table table-borderless table-sm"
                  style={{ border: "1px solid #000" }}
                >
                  {/* printableArea */}
                  <tbody>
                    <tr>
                      <td colspan="10" style={{ border: "1px solid #000" }}>
                        <h5 className="text-uppercase">Tax Invoice</h5>
                      </td>
                      <td
                        col="1"
                        colspan="5"
                        rowspan="5"
                        style={{
                          border: "1px solid #000",
                          width: "18%",
                        }}
                      >
                        <img
                          src={logo}
                          style={{
                            width: "100%",
                            marginTop: "20%",
                            padding: "0",
                          }}
                          alt="logo"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colspan="10" style={{ border: "1px solid black" }}>
                        <p
                          style={{
                            textAlign: "left",
                            color: "black",
                            fontWeight: 450,
                            fontSize: "1.2rem",
                          }}
                          className="text-uppercase m-0"
                        >
                          {detail.companyName}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="10"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="text-uppercase p-0 m-0">
                          {detail.companyAddress}, {detail.companyCity},{" "}
                          {detail.companyState}, {detail.companyCountry}.
                        </p>
                        <p className="p-0 m-0">Tel : {detail.companyPhone}</p>
                        <p className="p-0 m-0">Mail : {detail.companyEmail}</p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="m-0 p-0">GST IN : {detail.companyGST}</p>
                      </td>
                      <td
                        colspan="5"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="m-0 p-0">PAN : {detail.companyPAN}</p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="m-0 p-0">Web : {detail.companyWebsite}</p>
                      </td>
                      <td
                        colspan="5"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="m-0 p-0">CIN : {detail.companyCIN}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ border: "1px solid black" }}>
                        Customer Reference
                      </td>
                      <td colspan="2" style={{ border: "1px solid black" }}>
                        Vehical Number
                      </td>
                      <td colspan="2" style={{ border: "1px solid black" }}>
                        Transportation Mode
                      </td>
                      <td colspan="3" style={{ border: "1px solid black" }}>
                        Invoice Number
                      </td>
                      <td
                        colspan="4"
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        Invoice Date
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" style={{ border: "1px solid black" }}>
                        N/A
                      </td>

                      <td colspan="2" style={{ border: "1px solid black" }}>
                        N/A
                      </td>
                      <td colspan="2" style={{ border: "1px solid black" }}>
                        N/A
                      </td>
                      <td colspan="3" style={{ border: "1px solid black" }}>
                        N/A
                      </td>
                      <td
                        colspan="4"
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        N/A
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid #000",
                          lineHeight: "14px",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">Billing To :</p>
                      </td>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid #000",
                          lineHeight: "14px",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">Ship To :</p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid black",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">Addrress : </p>
                      </td>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid black",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">Addrress : </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="6"
                        style={{ border: "1px solid #000", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">GST : </p>
                      </td>
                      <td
                        colspan="6"
                        style={{ border: "1px solid #000", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">GST : </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="14"
                        style={{
                          border: "none",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <th
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                      >
                        Sr.
                      </th>
                      <th
                        colspan="3"
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                      >
                        Product
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                        colspan="2"
                      >
                        Serial No
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                        colspan="2"
                      >
                        HSN
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                        colspan="2"
                      >
                        GST(%)
                      </th>
                      {/* <th style={{ border: "1px solid black" ,backgroundColor:"#c2dbfe" }} colspan="2">QTY</th> */}
                      <th
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#c2dbfe",
                        }}
                        colspan="3"
                      >
                        Repair Rate
                      </th>
                    </tr>

                    <tr className="m-0 p-0 ">
                      <td
                        style={{ border: "1px solid black", width: "50px" }}
                      ></td>
                      <td
                        colspan="3"
                        style={{ border: "1px solid black" }}
                      ></td>
                      <td
                        colspan="2"
                        style={{ border: "1px solid black" }}
                      ></td>
                      <td
                        style={{ border: "1px solid black" }}
                        colspan="2"
                      ></td>
                      <td
                        style={{ border: "1px solid black" }}
                        colspan="2"
                      ></td>
                      <td
                        style={{ border: "1px solid black", width: "150px" }}
                        colspan="3"
                      ></td>
                    </tr>

                    <tr>
                      <td
                        col="1"
                        colspan="8"
                        rowspan="7"
                        style={{ border: "1px solid black" }}
                      >
                        <p className="m-0 p-0" style={{ fontSize: "1.2rem" }}>
                          Clerification{" "}
                        </p>
                        <br />
                        "We hereby certify that our Registration certificate
                        under the GOODS AND SERVICE TAX ACT ,2017 <br />
                        is in force on the date on which the sale of the goods
                        sspecified in this bill/Cash memo is made by <br /> us
                        that the Transection of the sale covered by this
                        Bill/Cash Memorandom has been effected by us in the
                        regular course of our business."
                      </td>
                      <td
                        col="1"
                        colspan="2"
                        style={{
                          border: "1px solid #000",
                        }}
                      >
                        Sub Total
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td
                        col="1"
                        colspan="2"
                        style={{ border: "1px solid black" }}
                      >
                        IGST
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="2"
                        style={{ border: "1px solid black" }}
                      >
                        CGST
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="2"
                        style={{ border: "1px solid black" }}
                      >
                        SGST
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="2"
                        style={{ border: "1px solid black" }}
                      >
                        F&F
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>

                    <tr>
                      <td
                        col="1"
                        style={{ border: "1px solid black" }}
                        colspan="2"
                      >
                        Total
                      </td>
                      <td
                        col="1"
                        colspan="4"
                        style={{ border: "1px solid black" }}
                      >
                        &#x20B9;
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="14"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">Amount In Words : </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="14"
                        style={{
                          border: "none",
                          padding: "5px",
                        }}
                      ></td>
                    </tr>

                    <tr
                      style={{
                        border: "1px solid #000",
                        padding: "5px",
                      }}
                    >
                      <td
                        col="1"
                        colspan="14"
                        style={{
                          padding: "8px",
                          border: "1px solid black",
                        }}
                      >
                        <h6 className="text-uppercase m-0 p-0">
                          Our Bank Detail
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="5"
                        style={{
                          border: "1px solid #000",
                          textAlign: "left",
                        }}
                      >
                        Name Of Bank : <b>{detail.bankName}</b>
                      </td>
                      <td
                        col="2"
                        colspan="3"
                        rowspan="5"
                        style={{
                          textAlign: "center",
                          border: "1px solid #000",
                        }}
                      >
                        <img
                          src={QR}
                          alt=""
                          style={{ width: "150px", marginTop: " 2px" }}
                        />
                        <br />
                        <small>Payment QR</small>
                      </td>
                      <td
                        col="3"
                        colspan="5"
                        rowspan="5"
                        style={{
                          border: "1px solid #000",
                        }}
                      >
                        Multispan Control Instruments Pvt.Ltd.
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        Authorized Signatory
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="6"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        Branch Name : <b>{detail.branchName}</b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="6"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        Account No : <b>{detail.acNumber}</b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        style={{ border: "1px solid black", textAlign: "left" }}
                        colspan="6"
                      >
                        IFSC/RTGS Code : <b>{detail.IFSC}</b>
                      </td>
                    </tr>
                    <tr>
                      <td
                        col="1"
                        colspan="6"
                        style={{ border: "1px solid #000", textAlign: "left" }}
                      >
                        UPI :
                        <img
                          src={upi}
                          alt="UPI"
                          style={{ padding: "0", margin: "0", height: "30px" }}
                        />
                        <b> {detail.UPI}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
