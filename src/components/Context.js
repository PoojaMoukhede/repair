import React, { useContext, useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const APIContext = createContext();

export function APIContextProvider({ children }) {
  const URL = "http://192.168.1.211:8000/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [employeeData, setEmployeedata] = useState([]);
  const [customer, setCustomer] = useState([]);

  const SignUpUrl = `${URL}register`;
  const loginUrl = `${URL}login`;
  const addCustomerURL = `${URL}customer`;
  const EditCustomer = `${URL}customer`

  //post user
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

  //Login USER
  const loginUser = (loginData) => {
    axios
      .post(loginUrl, loginData)
      .then((res) => {
        const myToken = res.data.token;
        localStorage.setItem("token", myToken);
        localStorage.setItem("email", loginData.email);
        navigate("/dashboard");
        document.location.reload();
        setUserEmail(loginData.email);
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
          customerName,
          customerEmail,
          customerPhone,
          customerCountry,
          customerState,
          customerCity,
          customerAddress,
          customerPinCode,
          customerGST,
          customerPAN,
          customerCIN,
          customerTAN,
        } = res.data;

        setCustomer(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onCustomerEdit = async(id, data) => { 
   await axios           
      .put(`${EditCustomer}/${id}`,data)
 
      .then((res) => {
        const info = res.data;
        setEmployeedata(data)
        window.location.reload()
        console.log(`${EditCustomer}${id}`);
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
