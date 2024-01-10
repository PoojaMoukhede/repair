import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const APIContext = createContext();

export function APIContextProvider({ children }) {
  const URL = "http://localhost:8000/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [employeeData, setEmployeedata] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [isInProcess, setIsInProcess] = useState();
  const [isReady, setIsReady] = useState();
  const [isBilled, setIsBilled] = useState();
  const [orderData, setOderData] = useState([]);

  const SignUpUrl = `${URL}register`;
  const loginUrl = `${URL}login`;
  const addCustomerURL = `${URL}customer`;
  const EditCustomer = `${URL}customer`;
  const orderURL = `${URL}order-item-list`;
  const processURL = `${URL}in-process`;
  const readyURL = `${URL}ready`;
  const billURL = `${URL}billing`;
  const postOrderURL = `${URL}orders`;
  // const scrapURL=`${URL}scrape`

  const signUpUser = (userData) => {
    try {
      axios
        .post(SignUpUrl, userData)
        .then((res) => {
          setEmployeedata(userData);
          window.alert(`Registeration Completed`);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert(`Registeration Failed`, err);
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

  const loginUser = (loginData) => {
    axios
      .post(loginUrl, loginData)
      .then((res) => {
        const myToken = res.data.token;
        const AdminEmail = res.data.user.email
        localStorage.setItem("token", myToken);
        localStorage.setItem("email", AdminEmail);
        setUserEmail(AdminEmail);
        navigate("/dashboard");
        document.location.reload();

      })
      .catch((err) => {
        console.log(err);
        window.alert(err);
      });
  };

  const onAddCustomer = (data) => {
    axios
      .post(addCustomerURL, data)
      .then((res) => {
        const {
          CustomeName,
          CustomeEmail,
          CustomeContactNo,
          CustomerCountry,
          CustomerState,
          CustomerCity,
          CustomerAddress,
          CustomerPinCode,
          CustomerGST,
          CustomerPAN,
          CustomerCIN,
          CustomerTAN,
        } = res.data;

        setCustomer(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onCustomerEdit = async (id, data) => {
    await axios
      .put(`${EditCustomer}/${id}`, data)

      .then((res) => {
        const info = res.data;
        setEmployeedata(data);
        window.location.reload();
        console.log(`${EditCustomer}${id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const orderList = async () => {
    await axios
      .get(`${orderURL}`)

      .then((res) => {
        const info = res.data;
        setIsBilled(info);
        console.log(`${orderURL}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const processList = async (id, data) => {
    await axios
      .put(`${processURL}/${id}/move-to-process`, data)

      .then((res) => {
        const info = res.data;
        setIsInProcess(data);
        console.log(`${processURL}${id}/move-to-process`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const readyList = async (id, data) => {
    await axios
      .put(`${readyURL}/${id}`, data)

      .then((res) => {
        const info = res.data;
        setIsReady(data);
        console.log(`${readyURL}${id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const billedList = async (id, data) => {
    await axios
      .put(`${billURL}/${id}`, data)

      .then((res) => {
        const info = res.data;
        setIsBilled(data);
        console.log(`${billURL}${id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const postOrder = (data) => {
    axios
      .post(postOrderURL, data)
      .then((res) => {
        const {
          id,
          productName,
          serialNumber,
          HSN,
          includeHsn,
          rate,
          tax,
          total,
          customerReason,
          orderRemark,
          orderDate,
          orderNumber,
          CustomerName,
          CustomerReferance,
          RefrenceDate,
          CustomeName,
        } = res.data;

        setOderData(data);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <APIContext.Provider
      value={{
        isLoading,
        setIsLoading,
        signUpUser,
        loginUser,
        onAddCustomer,
        onCustomerEdit,
        orderList,
        processList,
        readyList,
        billedList,
        postOrder,
        userEmail,
        // scrapList,
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
