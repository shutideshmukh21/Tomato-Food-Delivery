import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../Contexts/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Sign Up");
  const {url,token, setToken } = useContext(StoreContext);
  //created an empty object to store all the input data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  //changeHandler for adding all the input data to the setdata object
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login" ;
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log(token);
      console.log("success");
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => {
              setShowLogin(false);
            }}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )} 
          {/* here name is for event.taget.name="email", event.target.value = data.email email: data.email */}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p> By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            {" "}
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Cick here</span>
          </p>
        ) : (
          <p>
            {" "}
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
