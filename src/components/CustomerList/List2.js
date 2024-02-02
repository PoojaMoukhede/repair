// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MDBDataTable } from 'mdbreact';
// import './Table.css'
// const columns = [
//   {
//     label: 'Customer ID',
//     field: 'CustomeID',
//     sort: 'asc'
//   },
//   {
//     label: 'Customer Name',
//     field: 'CustomeName',
//     sort: 'asc'
//   },
//   {
//     label: 'Email',
//     field: 'CustomeEmail',
//     sort: 'asc'
//   },
//   {
//     label: 'Contact No',
//     field: 'CustomeContactNo',
//     sort: 'asc'
//   },
//   {
//     label: 'Address',
//     field: 'CustomerAddress',
//     sort: 'asc'
//   }
//   // Add more columns as needed
// ];

// const DatatablePage = () => {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     try {
//       axios
//         .get(`http://192.168.1.211:8000/customer`)
//         .then((response) => {
//           setRows(response.data);
//           console.log("Fetched data:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }, []);

//   const data = {
//     columns: columns,
//     rows: rows
//   };

//   return (
//     <MDBDataTable
//       striped
//       bordered
//       hover
//       data={data}
//     />
//   );
// }

// export default DatatablePage;

import React, { useState, useEffect } from "react";
import "./Table.css";
import axios from "axios";
export default function List2() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://192.168.1.211:8000/customer`)
        .then((response) => {
          setRows(response.data);
          console.log("sort data", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <div class="container">
        <ul class="responsive-table">
          <li class="table-header">
            <div class="col col-1">Sr. No</div>
            <div class="col col-1">Name</div>
            <div class="col col-1">Contact Number</div>
            <div class="col col-1">City</div>
            <div class="col col-1">State</div>
            <div class="col col-1">Country</div>
            <div class="col col-1">GST</div>
            <div class="col col-1">PAN</div>
            <div class="col col-1">CIN</div>
            <div class="col col-1">TAN</div>
            <div class="col col-1">Pin Code</div>
            <div class="col col-1">Action</div>
          </li>
          {rows.map((data, index) => (
            <li class="table-row">
              <div class="col col-1" data-label="Sr. No">
                42235
              </div>
              <div class="col col-1" data-label="Customer Name">
                John Doe
              </div>
              <div class="col col-1" data-label="Amount">
                $350
              </div>
              <div class="col col-1" data-label="Payment Status">
                Pending
              </div>
              <div class="col col-1" data-label="Sr. No">
                42235
              </div>
              <div class="col col-1" data-label="Customer Name">
                John Doe
              </div>
              <div class="col col-1" data-label="Amount">
                $350
              </div>
              <div class="col col-1" data-label="Payment Status">
                Pending
              </div>
              <div class="col col-1" data-label="Sr. No">
                42235
              </div>
              <div class="col col-1" data-label="Customer Name">
                John Doe
              </div>
              <div class="col col-1" data-label="Amount">
                $350
              </div>
              <div class="col col-1" data-label="Payment Status">
                Pending
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
