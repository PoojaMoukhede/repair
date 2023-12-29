import React from "react";
import Sidebar from "../Sidebar";
import newCustomer from '../../Images/shortlist (1).png'
import listCustomer from '../../Images/evaluation (1).png'
// import repairOrder from '../../Images/approval.png'
import repairOrder from '../../Images/purchase-order.png'
import orderList from '../../Images/approved (1).png'
import oderList from '../../Images/tag.png'
// import oderList from '../../Images/brand.png'
// import toBill from '../../Images/identity.png'
import toBill from '../../Images/file.png'
// import invoice from '../../Images/execution.png'
import invoice from '../../Images/progress.png'
// import inProcess from '../../Images/project-management.png'
import inProcess from '../../Images/execute.png'
import readyItem from '../../Images/time-check (1).png'
import scraped from '../../Images/waste (2).png'
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div id="grid">
        {/* <div className="app-main"> */}
        <Sidebar />
        <div id="right">
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <Link to="/customer">
                    <div className=" mb-4 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                        <img src={listCustomer} alt=""/>
                        </div>

                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                         New Customer
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/customerList">
                    <div className="  mb-4 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                   
                          <img src={newCustomer} alt=""/>
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Customer List
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/addRepair">
                    <div className=" mb-4 widget-content widget-content0">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={inProcess} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Repair Order
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/orderList">
                    <div className="  mb-4 widget-content widget-content0">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={orderList} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Order List
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <Link to="/orderList">
                    <div className=" mb-4 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={repairOrder} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Order Item List
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/inProcess">
                    <div className=" mb-3 widget-content widget-content0">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={invoice} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          In Process Order
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/ready">
                    <div className=" mb-3 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={readyItem} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Ready Order Item
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to="/tobill">
                    <div className=" mb-3 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={oderList} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Order To Bill List
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  {/* <Link to="/customer"> */}
                    <div className=" mb-3 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={toBill} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                          Invoice List
                        </p>
                      </div>
                    </div>
                  {/* </Link> */}
                </div>
                <div className="col-md-6 col-xl-3">
                  {/* <Link to="/weather"> */}
                    <div className=" mb-3 widget-content widget-content0 ">
                      <div className="overview_top">
                        <div className="orange">
                          <img src={scraped} alt="" />
                        </div>
                        <p style={{ fontSize: "1.3rem", color: "black" }}>
                        Scraped Item
                        </p>
                      </div>
                    </div>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </>
  );
}