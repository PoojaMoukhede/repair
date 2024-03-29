import React, { useState, useEffect } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import EditCustomer from "../NewCustomer/EditCustomer";
import axios from "axios";


export default function CustomerList() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const handleAddMember = (newEmployee) => {
    setRows((prevRows) => [...prevRows, newEmployee]);
  };

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
  const handleRowSelection = (CustomeEmail) => {
    if (selectedCustomer.includes(CustomeEmail)) {
      setselectedCustomer(selectedCustomer.filter((id) => id !== CustomeEmail));
    } else {
      setselectedCustomer([...selectedCustomer, CustomeEmail]);
    }
    const newData = rows.map((row) => {
      if (row.CustomeEmail === CustomeEmail) {
        return { ...row, CustomeEmail };
      }
      return row;
    });
    setRows(newData);
  };

  const [activeButton, setActiveButton] = useState(null);
  const filteredRows = rows.filter((entry) =>
    Object.values(entry).some(
      (value) =>
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <Header />
      <div id="grid">
        <Sidebar />
        <div id="right" className="ps-1 pt-1"> 
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row ">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-tab card-header d-flex justify-content-between">
                      <div className="card-header-title">
                       Customer List
                      </div>

                      <div className="search-wrapper">
                        <input
                          type="text"
                          id="search2"
                          placeholder="Type to search"
                          style={{ height: "40px",width:'500px'}}
                          onChange={(event) =>
                            setSearchTerm(event.target.value)
                          }
                        />
                      </div>

                      <button
                        className={`btn btnchart ${
                          activeButton === "Add Customer" ? "activebtn" : ""
                        }`}
                        onClick={() => navigate("/customer")}
                      >
                        <i className="header-icon fa-solid fa-circle-plus"></i>
                        Add Customer
                      </button>
                    </div>

                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-0">
                          <div
                            className="table-responsive"
                            style={{ height: "86vh" ,borderBottom:'2px solid #004976'}}
                          >
                            <table
                              className="align-middle mb-0 table table-borderless table-striped table-hover"
                              style={{ fontSize: "0.9rem", color: "white" }}
                            >
                              <thead style={{ background: "beige" }}>
                                <tr>
                                  <th>Sr. No</th>
                                  <th>Name</th>
                                  <th className="text-center">Email</th>
                                  <th className="text-center">
                                    Contact Number
                                  </th>
                                  <th className="text-center">City</th>
                                  <th className="text-center">State</th>
                                  <th className="text-center">Country</th>
                                  <th className="text-center">GST</th>
                                  <th className="text-center">PAN</th>
                                  <th className="text-center">CIN</th>
                                  <th className="text-center">TAN</th>
                                  <th className="text-center">Pin Code</th>
                                  <th className="text-center">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredRows.map((data, index) => (
                                  <tr
                                    key={index}
                                    style={{ fontSize: "0.85rem" }}
                                  >
                                    <td>{index + 1}</td>
                                    <td>
                                      <div className="widget-content p-0">
                                        <div className="widget-content-wrapper">
                                          <div className="widget-content-left flex2">
                                            <div className="widget-heading">
                                              {data.CustomeName}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      {data.CustomeEmail}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomeContactNo}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerCity}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerState}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerCountry}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerGST}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerPAN}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerCIN}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerTAN}
                                    </td>
                                    <td className="text-center">
                                      {data.CustomerPinCode}
                                    </td>
                                    <td className="text-center">
                                      <button
                                        className="btn"
                                        style={{ color: "#f9bb00" }}
                                        onClick={(e) => {
                                          setIsModalOpen(true);
                                          setselectedCustomer(data);
                                        }}
                                      >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {/* <List2/> */}
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
      </div>
      <EditCustomer
        selectedCustomer={selectedCustomer}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMember}
      />
    </>
  );
}
