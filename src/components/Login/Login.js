import React, { useState } from "react";
import "./Login.css";
import loginImg from "../../Images/Login-bro.svg";
import register from "../../Images/Mobile login-pana (1).svg";
import logo from "../../Images/logo.png";
import { useAPI } from "../Context";

export default function Login() {
  const { loginUser } = useAPI();
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive((prev) => !prev);
  };

  const [login, setLogin] = useState({
    adminEmail: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const UserLogin = () => {
    loginUser(login);
  };

  return (
    <>
      <section>
        <img src={logo} alt="Logo" className="logo mb-2" />
        <div className={`container ${isActive ? "active" : ""}`}>
          <div className="user signinBx">
            <div className="imgBx">
              <img src={loginImg} alt="" />
            </div>
            <div className="formBx">
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <h2>Sign In</h2>
                <input
                  type="text"
                  name="adminEmail"
                  placeholder="Username"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="submit"
                  name=""
                  value="Login"
                  onClick={UserLogin}
                />
                <p className="signup">
                  Don't have an account ?
                  <a href="#/" onClick={toggleForm}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form action="" onSubmit={(e) => e.preventDefault()}>
                <h2>Create an account</h2>
                <input type="text" name="" placeholder="Username" />
                <input type="email" name="" placeholder="Email Address" />
                <input type="password" name="" placeholder="Create Password" />
                <input type="password" name="" placeholder="Confirm Password" />
                <input type="submit" name="" value="Sign Up" />
                <p className="signup">
                  Already have an account ?
                  <a href="#/" onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img src={register} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
