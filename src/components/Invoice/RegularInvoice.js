import React, { useState, useEffect, useRef } from "react";
import logo from "../../Images/multispan-logo-HD.png";
import QR from "../../Images/qr-code.png";
import axios from "axios";
import upi from "../../Images/upi-ar21.svg";
import ReactToPrint from "react-to-print";
import { useNavigate ,useParams} from "react-router-dom";

export default function RegularInvoice() {
  const navigate = useNavigate();
  const { orderID } = useParams();
  let componentRef = useRef();
  const [detail, setDetail] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDetailTable, setOrderDetailTable] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/companyDetail`)
        .then((response) => {
          setDetail(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      axios
        .get(`http://localhost:8000/invoiceData/${orderID}`)
        .then((response) => {
          const responseData = response.data;
          setOrderDetail(responseData);
          setWord(convertNumberToWords(responseData.totalAmount));
          setOrderDetailTable([responseData]); // Wrap responseData in an array
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [orderID]);


  function convertNumberToWords(number) {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      // "",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      // "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertChunkToWords = (num) => {
      const result = [];
      if (num >= 100) {
        result.push(units[Math.floor(num / 100)] + " Hundred");
        num %= 100;
      }

      if (num >= 11 && num <= 19) {
        result.push(teens[num - 11]);
      } else if (num >= 20) {
        result.push(tens[Math.floor(num / 10)]);
        num %= 10;
      }

      if (num > 0) {
        result.push(units[num]);
      }

      return result.join(" ");
    };

    const chunks = [];
    let remaining = Math.floor(number);

    while (remaining > 0) {
      chunks.push(remaining % 1000);
      remaining = Math.floor(remaining / 1000);
    }

    if (chunks.length === 0) {
      return "Zero Rupees";
    }

    const words = chunks
      .map((chunk, index) => {
        if (chunk === 0) {
          return "";
        }
        //   console.log(index);
        const chunkInWords = convertChunkToWords(chunk);
        return (
          chunkInWords +
          (index === 0 ? "" : ` ${index === 1 ? "Thousand" : "Lakh"}`)
        );
      })
      .reverse()
      .join(" ");

    return `${words} Rupees Only`;
  }

  return (
    <>
      <main className="container-fluid" ref={(el) => (componentRef = el)}>
        <div className="row">
          {/* Printable Area */}
          <div className="container">
            <div className="col-12">
              <div className="col-12 pt-2">
                <table
                  className="table table-borderless table-sm"
                  style={{ border: "1px solid #000" }}
                >
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
                        {orderDetail.CustomerReferance}
                      </td>

                      <td colspan="2" style={{ border: "1px solid black" }}>
                        N/A
                      </td>
                      <td colspan="2" style={{ border: "1px solid black" }}>
                        {orderDetail.transportationMode}
                      </td>
                      <td colspan="3" style={{ border: "1px solid black" }}>
                        {orderDetail.invoice_number}
                      </td>
                      <td
                        colspan="4"
                        style={{
                          border: "1px solid #000",
                          textAlign: "center",
                        }}
                      >
                        {new Date(orderDetail.invoiceDate).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
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
                        <p className="p-0 m-0">
                          Billing To : <b>{orderDetail.CustomeName}</b>
                        </p>
                      </td>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid #000",
                          lineHeight: "14px",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">
                          Ship To : <b>{orderDetail.shippingPerson}</b>
                        </p>
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
                        <p className="p-0 m-0">
                          Addrress :{" "}
                          <b>
                            {orderDetail.CustomerAddress},
                            {orderDetail.CustomerCity} ,{" "}
                            {orderDetail.CustomerState},{" "}
                            {orderDetail.CustomerCountry}
                          </b>{" "}
                        </p>
                      </td>
                      <td
                        colspan="6"
                        style={{
                          border: "1px solid black",
                          textAlign: "left",
                        }}
                      >
                        <p className="p-0 m-0">
                          Addrress :
                          <b>
                            {orderDetail.shippingAddress},
                            {orderDetail.shippingCity} ,{" "}
                            {orderDetail.shippingState},{" "}
                            {orderDetail.shippingCountry}
                          </b>{" "}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="6"
                        style={{ border: "1px solid #000", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">
                          GST : <b>{orderDetail.CustomerGST}</b>{" "}
                        </p>
                      </td>
                      <td
                        colspan="6"
                        style={{ border: "1px solid #000", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">
                          GST : <b>{orderDetail.CustomerGST}</b>{" "}
                        </p>
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
                    {/* <table></table> */}
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
                    {orderDetailTable.map((entry, index) => (
                      <tr className="m-0 p-0" key={index}>
                        <td style={{ border: "1px solid black" }}>
                          {index + 1}
                        </td>
                        <td colspan="3" style={{ border: "1px solid black" }}>
                          {entry.productName}
                        </td>
                        <td colspan="2" style={{ border: "1px solid black" }}>
                          {entry.serialNumber}
                        </td>
                        <td style={{ border: "1px solid black" }} colspan="2">
                          {entry.HSN}
                        </td>
                        <td style={{ border: "1px solid black" }} colspan="2">
                          18%
                        </td>
                        <td
                          style={{ border: "1px solid black", width: "150px" }}
                          colspan="3"
                        >
                          {parseFloat(entry.totalAmount).toFixed(2)}
                        </td>
                      </tr>
                    ))}

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
                        {orderDetail.subTotal}
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
                        {orderDetail.igst}
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
                        {orderDetail.cgst}
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
                        {orderDetail.sgst}
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
                        {orderDetail.ff}
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
                        {parseFloat(orderDetail.totalAmount).toFixed(2)}{" "}
                        &#x20B9;
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="14"
                        style={{ border: "1px solid black", textAlign: "left" }}
                      >
                        <p className="p-0 m-0">
                          Amount In Words :
                          <b style={{ color: "black" }}> {word}</b>
                          {/* {console.log(convertNumberToWords(orderDetail.totalAmount))} */}
                        </p>
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
          {/* Printable Area */}
        </div>
      </main>

      <div className="row">
        <div className="d-flex justify-content-center gap-4">
          <button
            className="btn btn-success"
            onClick={() => navigate("/invoiceTable")}
          >
            <i
              className="fa-solid fa-circle-left header-icon2"
              style={{ color: "#e4e4dc" }}
            ></i>
            Back
          </button>
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-success">
                <i
                  className="fa-solid fa-print header-icon2"
                  style={{ color: "#e4e4dc" }}
                ></i>
                Print
              </button>
            )}
            content={() => componentRef}
          />
          <button className="btn btn-success">
            <i
              className="fa-solid fa-cloud-arrow-down header-icon2"
              style={{ color: "#e4e4dc" }}
            ></i>
            Download
          </button>
        </div>
      </div>
    </>
  );
}
