import React, { useState } from "react";
import logo from "../../assets/logo/hero-logo.png";
import { PASSWORD_LENGTH } from "../../utils/constants";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";


function LoginPage(props) {

  const [emailError, setEmailError] = useState({ message: '' });
  const [passwordError, setPasswordError] = useState({ message: '' });

  const validate = (e) => {
    e.preventDefault();
    if (validateEmail() && validatePassword()) {
      localStorage.setItem("loggedIn","true");
      props.setPage("true");
    } else {
      // document.getElementById('pop').style.display = 'none';
    }
  }

  const validateEmail = () => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    let email = document.getElementById('email').value;

    if (email == '') {
      setEmailError({ message: 'Please Enter Email' });
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError({ message: 'Invalid Email' });
      return false;
    } else {
      setEmailError({ message: '' });
      return true;
    }
  }


  const validatePassword = () => {
    const specialCharsPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const upCharsPattern = /[A-Z]/;
    const lowCharsPattern = /[a-z]/;
    const numbersPattern = /[0-9]/;
    let password = document.getElementById('password').value;

    if (password.length < PASSWORD_LENGTH) {
      setPasswordError({ message: 'Password length must be 10.' });
      return false;
    } else if (!specialCharsPattern.test(password)) {
      setPasswordError({ message: 'Password must contain atleast one special character.' });
      return false;
    } else if (!numbersPattern.test(password)) {
      setPasswordError({ message: 'Password must contain atleast one number' });
      return false;
    } else if (!upCharsPattern.test(password)) {
      setPasswordError({ message: 'Password must contain atleast one uppercase letter.' });
      return false;
    } else if (!lowCharsPattern.test(password)) {
      setPasswordError({ message: 'Password must contain atleast one lowercase letter.' });
      return false;
    } else {
      setPasswordError({ message: '' });
      return true;
    }
  }

  return (
    <div className="d-flex justify-content-around align-items-center" style={{height: "100vh"}}>
      <div className="form-area">
        <div className="text-white bg-success rounded text-center" id="pop">
          <h2>Login Credential Valid</h2>
        </div>
        <div className="top d-flex justify-content-between py-3">
          <div className="d-flex flex-column justify-content-between">
            <h3>Login</h3>
            <p className="m-0">Please Enter Your Cred</p>
          </div>
          <img src={logo} alt="Logo" className="image" />
        </div>
        <form onSubmit={validate}>
          <div className="mb-3">
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              autoFocus="autofocus"
              onChange={validateEmail}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{emailError.message}</p>
          </div>
          <div className="mb-3">
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              onChange={validatePassword}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{passwordError.message}</p>
            <div className="py-3">
              <a href="#" className="text-dark">
                <p className="float-end">Forgot Password?</p>
              </a>
            </div>
          </div>
          <Button type="submit" value="Login" className="w-100" operationType="primary"/>
          <p className="text-center mx-0 my-3">
            Don't have an account?{" "}
            <a href="#" className="text-decoration-none text-dark">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
