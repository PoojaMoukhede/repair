import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import irn from '../../Images/irn code.png'
import QR from '../../Images/qr-code.png'


export default function ZeroInvoice() {
  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right">
          <main className="container-fluid">
            <div className="row mt-3" style={{ marginLeft: "3rem" }}>
              <div className="container">
                <div className="col-12 p-2">
                  <div className="col-12">
                    <label
                      style={{
                        marginLeft: "32rem",
                        fontSize: " 1.5rem",
                        textAlign: "center",
                        fontFamily: "Arial ,Helvetica, sans-serif",
                      }}
                    >
                      {/* <b>uhjk</b> */}
                    </label>
                    {/* <label className="float-end mt-1">
                  (ORIGINAL FOR RECIPIENT) &nbsp;
                </label> */}
                    <table
                      className="table table-borderless table-sm"
                      style={{ border: "1px solid #000" }}
                    >
                      {/* printableArea */}
                      <tbody>
                        <tr>
                          <td colspan="8" style={{ border: "1px solid #000" }}>
                            <h4>Invoice</h4>
                          </td>
                          <td
                            col="1"
                            colspan="3"
                            rowspan="3"
                            style={{
                              border: "1px solid #000",
                              wordWrap: "break-word",
                            }}
                          >
                            <b>IRN No:</b> <br />
                            <span style={{ wordWrap: "break-word" }}></span>
                          </td>
                          <td
                            col="1"
                            colspan="3"
                            rowspan="5"
                            style={{
                              border: "1px solid #000",
                              // textAlign: "center",
                            }}
                          >
                            <img
                              src={irn}
                              style={{ width: "120px", marginTop: "40px" ,padding:'0'}}
                              alt=""
                            />
                          </td>
                        </tr>
                        <tr>
                          <td colspan="8" style={{ border: "1px solid black" }}>
                            <p
                              style={{ marginTop: "-10px", textAlign: "left" }}
                            >
                              {/* <br /> T: */}
                              <br />{" "}
                              <b>
                                72B GIDC Estate, Phase 1, Vatva Ahmedabad 382445
                                Gujarat India
                              </b>
                              <br />
                              
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>CIN : U31109GJ1996PTC028949</b>
                          </td>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>State :</b>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>GST IN : 24AAACM7977M1ZV</b>
                          </td>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>PAN :</b>
                          </td>
                          <td
                            col="1"
                            colspan="3"
                            rowspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            <b>ACK No:</b>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>Date :</b>
                          </td>
                          <td colspan="4" style={{ border: "1px solid black" }}>
                            <b>Invoice No:</b>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" style={{ border: "1px solid black" }}>
                            Customer Ref
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            PaymentTerms
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            Vehical Number
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            Transportation Mode
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            Ship By
                          </td>
                          <td
                            colspan="3"
                            style={{
                              border: "1px solid #000",
                              textAlign: "center",
                            }}
                          >
                            Payment Type
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3" style={{ border: "1px solid black" }}>
                            {" "}
                            N/A
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            {" "}
                            N/A
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            N/A
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            {" "}
                            N/A
                          </td>
                          <td colspan="2" style={{ border: "1px solid black" }}>
                            {" "}
                            N/A
                          </td>
                          <td
                            colspan="3"
                            style={{
                              border: "1px solid #000",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            N/A
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="7"
                            style={{
                              border: "1px solid #000",
                              lineHeight: "14px",
                              textAlign: "left",
                            }}
                          >
                            <b>Reciever Name / Billing To :</b>
                          </td>
                          <td
                            colspan="7"
                            style={{
                              border: "1px solid #000",
                              lineHeight: "14px",
                              textAlign: "left",
                            }}
                          >
                            <b> Consignee / Ship To :</b>
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="7"
                            style={{
                              border: "1px solid black",
                              textAlign: "left",
                            }}
                          >
                            <b>Billing Addrress:</b>
                          </td>
                          <td
                            colspan="7"
                            style={{
                              border: "1px solid black",
                              textAlign: "left",
                            }}
                          >
                            <b>Shipping Addrress:</b>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="2" style={{ border: "1px solid #000" }}>
                            <b>Country:</b>
                            <br />
                          </td>
                          <td colspan="2" style={{ border: "1px solid #000" }}>
                            <b>State :</b> <br />
                          </td>
                          <td colspan="3" style={{ border: "1px solid #000" }}>
                            <b>GSTIN :</b> <br />
                          </td>
                          <td colspan="2" style={{ border: "1px solid #000" }}>
                            <b>Country:</b>
                            <br />
                          </td>
                          <td colspan="2" style={{ border: "1px solid #000" }}>
                            <b>State :</b>
                            <br />
                          </td>
                          <td colspan="3" style={{ border: "1px solid #000" }}>
                            <b>GSTIN :</b>
                            <br />
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="14"
                            style={{
                              border: "1px solid #000",

                              padding: "5px",
                            }}
                          ></td>
                        </tr>
                        <tr>
                          <th style={{ border: "1px solid black" }}>Sr.</th>
                          <th colspan="6" style={{ border: "1px solid black" }}>
                            Description
                          </th>
                          <th style={{ border: "1px solid black" }} colspan="2">
                            Instrument Serial No
                          </th>
                          <th style={{ border: "1px solid black" }}>HSN</th>
                          <th style={{ border: "1px solid black" }}>GST(%)</th>
                          <th style={{ border: "1px solid black" }}>QTY</th>
                          <th style={{ border: "1px solid black" }}>
                            Unit Rate
                          </th>
                          <th
                            style={{
                              border: "1px solid #000",
                              textAlign: "center",
                            }}
                          >
                            Value
                          </th>
                        </tr>

                        <tr className="order_item_row">
                          <td
                            style={{ border: "1px solid black", width: "5px" }}
                          ></td>
                          <td
                            colspan="6"
                            style={{ border: "1px solid black" }}
                          ></td>
                          <td
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          ></td>
                          <td style={{ border: "1px solid black" }}></td>
                          <td style={{ border: "1px solid black" }}></td>
                          <td style={{ border: "1px solid black" }}></td>
                          <td style={{ border: "1px solid black" }}></td>
                          <td style={{ border: "1px solid black" }}></td>
                        </tr>

                        <tr>
                          <td
                            colspan="14"
                            style={{
                              border: "1px solid #000",
                              textAlign: "center",
                            }}
                          >
                            <b>Items Are Not Available</b>
                          </td>
                        </tr>

                        <tr>
                          <td
                            col="1"
                            colspan="14"
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                            }}
                          ></td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="8"
                            rowspan="8"
                            style={{ border: "1px solid black" }}
                          >
                          
                            <b>Clerification : </b>
                            <br />
                            "We hereby certify that our Registration certificate
                            under the GOODS AND SERVICE TAX ACT ,2017 <br />
                            is in force on the date on which the sale of the
                            goods sspecified in this bill/Cash memo is made by{" "}
                            <br /> us that the Transection of the sale covered
                            by this Bill/Cash Memorandom has been effected by us
                            in
                            <br /> the regular course of our business."
                          </td>
                          <td
                            col="1"
                            colspan="4"
                            style={{
                              border: "1px solid #000",
                            }}
                          >
                            Sub Total
                          </td>
                          <td
                            col="1"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                        </tr>
                        <tr></tr>
                        <tr>
                          <td
                            col="1"
                            colspan="4"
                            style={{ border: "1px solid black" }}
                          >
                            IGST
                          </td>
                          <td
                            col="1"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="4"
                            style={{ border: "1px solid black" }}
                          >
                            CGST
                          </td>
                          <td
                            col="1"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="4"
                            style={{ border: "1px solid black" }}
                          >
                            SGST
                          </td>
                          <td
                            col="1"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                        </tr>

                        <tr>
                          <td
                            col="1"
                            style={{ border: "1px solid black" }}
                            colspan="4"
                          >
                            Amount
                          </td>
                          <td
                            col="1"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                        </tr>
                        <tr>
                          <td
                            colspan="14"
                            style={{ border: "1px solid black" }}
                          >
                            <b>Amount In Words:</b>
                            <label>&nbsp;</label>
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="14"
                            style={{
                              border: "1px solid #000",
                              padding: "5px",
                            }}
                          ></td>
                        </tr>
                        <tr className="text-center">
                          <th
                            col="1"
                            colspan="3"
                            style={{ border: "1px solid black" }}
                          >
                            HSN
                          </th>
                          <th
                            col="2"
                            colspan="1"
                            style={{ border: "1px solid black" }}
                          >
                            GST%
                          </th>
                          <th
                            col="3"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            Production Value
                          </th>
                          <th
                            col="4"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            {/* F&F */}
                          </th>
                          <th
                            col="6"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            IGST
                          </th>
                          <th
                            col="7"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            CGST
                          </th>
                          <th
                            col="5"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            SGST
                          </th>
                        </tr>

                        <tr className="text-center">
                          <td
                            col="1"
                            colspan="3"
                            style={{ border: "1px solid black" }}
                          ></td>
                          <td
                            col="3"
                            colspan="1"
                            style={{ border: "1px solid black" }}
                          ></td>
                          <td
                            col="4"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                          <td
                            col="2"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          ></td>
                          <td
                            col="6"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                          <td
                            col="7"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
                          <td
                            col="5"
                            colspan="2"
                            style={{ border: "1px solid black" }}
                          >
                            &#x20B9;
                          </td>
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
                          ></td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="6"
                            style={{
                              border: "1px solid #000",
                              textAlign:'left'
                            }}
                          >
                            Bank Details :
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
                            Authorized Signatory
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="6"
                            style={{ border: "1px solid black", textAlign:'left' }}
                          >
                            Branch :
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            colspan="6"
                            style={{ border: "1px solid black", textAlign:'left' }}
                          >
                            Account No :
                          </td>
                        </tr>
                        <tr>
                          <td
                            col="1"
                            style={{ border: "1px solid black", textAlign:'left' }}
                            colspan="6"
                          >
                            IFSC/RTGS Code :
                          </td>
                        </tr>
                        {/* <tr>
                          <td
                            col="1"
                            colspan="6"
                            style={{ border: "1px solid #000" , textAlign:'left'}}
                          >
                            <img
                              src="{% static 'images/mcipl_logo/UPI_logo_PNG.png' %}"
                              alt="UPI"
                            />
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
