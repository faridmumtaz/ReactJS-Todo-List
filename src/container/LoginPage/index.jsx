import React, { useState, useContext, useRef, useEffect } from "react";
import logo from "../../assets/logo/hero-logo.png";
import { PASSWORD_LENGTH } from "../../utils/constants";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import { UserContext } from "../../App";

import * as bootstrap from 'bootstrap'

import Modal from "../../components/Modal";


function LoginPage(props) {
  const { setLoginPage, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({})
  const [errorModal, setErrorModal] = useState();
  useEffect(() => {
    setErrorModal(new bootstrap.Modal(document.getElementById('errorModal')))
  },[])
  const handleSubmit = () => {
    console.log(formData)
    if (formData.email && formData.password) {
      
    } else {
      errorModal.show()
    }
  }

  return (
    <div className="d-flex justify-content-around align-items-center" style={{ height: "100vh" }}>
      <Modal id="errorModal" type="alert" message="Fields cannot be empty!" />
      <div className="form-area">
        <div className="top d-flex justify-content-between py-3">
          <div className="d-flex flex-column justify-content-between">
            <h3>Login</h3>
            <p className="m-0">Please Enter Your Cred</p>
          </div>
          <img src={logo} alt="Logo" className="image" />
        </div>
        <form>
          <div className="mb-3">
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              autoFocus="autofocus"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <div className="py-3">
              <a href="#" className="text-dark">
                <p className="float-end">Forgot Password?</p>
              </a>
            </div>
          </div>
          <Button type="button" value="Login" className="w-100" operationType="primary" onClick={handleSubmit} />
          <p className="text-center mx-0 my-3">
            Don't have an account?{" "}
            <span className="text-decoration-underline text-dark" onClick={() => setLoginPage(false)}>
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
