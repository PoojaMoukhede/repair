import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import NewCustomer from "./components/NewCustomer/NewCustomer";
import CustomerList from "./components/CustomerList/CustomerList";
import RepairOrder from "./components/RepairOrder/RepairOrder";
// import RepairOrder from "./Not In Use/RepairOrder";
import OrderList from "./components/OrderList/OrderList";
import InProcess from "./components/InProcess/InProcess";
import Ready from "./components/Ready/Ready";
import ToBill from "./components/ToBill/ToBill";
import Login from "./components/Login/Login";
import { APIContextProvider } from "./components/Context";
import Invoice from "./components/Invoice/Table/Invoice";
import Scraped from "./components/Scrape/Scraped";
import ZeroInvoice from "./components/Invoice/Table/ZeroInvoiceTable";
import RegularInvoiceTable from "./components/Invoice/Table/RegularInvoiceTable";
import RegularInvoice from "./components/Invoice/RegularInvoice";
import BillingInformation from "./components/Invoice/BillingInformation";
import Translator from "./Not In Use/Translator";
import List2 from "./components/CustomerList/List2";

function App() {
  return (
    <>
      <BrowserRouter>
        <APIContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              exact
              path="/dashboard"
              element={localStorage.getItem("token") ? <Main /> : <Login />}
            />
            <Route exact path="/dashboard" element={<Main />} />
            <Route exact path="/customer" element={<NewCustomer />} />
            <Route exact path="/customerList" element={<CustomerList />} />
            <Route exact path="/addRepair" element={<RepairOrder />} />
            <Route exact path="/orderList" element={<OrderList />} />
            <Route exact path="/inProcess" element={<InProcess />} />
            <Route exact path="/ready" element={<Ready />} />
            <Route exact path="/tobill" element={<ToBill />} />
            <Route exact path="/invoiceTable" element={<Invoice />} />
            <Route exact path="/scrape" element={<Scraped />} />
            <Route exact path="/zeroinvoice" element={<ZeroInvoice />} />
            <Route exact path ='/regularTable' element={<RegularInvoiceTable/>} />
            <Route
              path="/regularinvoice?CustomeID=/:CustomeID&orderNumber=/:orderNumber"
              element={<RegularInvoice />}
            />
            <Route path="/regularinvoice/*" element={<RegularInvoice />} />
            <Route exact path="/billingInfo" element={<BillingInformation />} />


            <Route path="/list" element={<List2/>}/>
            <Route path='/pooja' element={<Translator/>}/>
          </Routes>
        </APIContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
