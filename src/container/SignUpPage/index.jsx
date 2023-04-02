import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import logo from "../../assets/logo/hero-logo.png";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { validateEmail, validatePassword, validateUsername } from "../../utils/helper";
import * as bootstrap from 'bootstrap'
import Modal from "../../components/Modal";
import { storeData,getData } from "../../utils/helper";

function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [errorModal, setErrorModal] = useState();
  const [successModal, setSuccessModal] = useState();
  const { loginPage, setLoginPage } = useContext(UserContext)

  useEffect(() => {
    setErrorModal(new bootstrap.Modal(document.getElementById('errorModal')))
    setSuccessModal(new bootstrap.Modal(document.getElementById('successModal')))
  }, [])

  const handleSignUp = () => {
    if (formError.usernameError == '' && formError.emailError == '' && formError.passwordError == '' && formError.confirmPasswordError == '') {
      storeData(formData)
      successModal.show()
    } else {
      errorModal.show()
    }
  }

  const handleChange = (e, fieldName) => {
    const fieldData = e.target.value;

    if (fieldName == 'username') {
      if (validateUsername(fieldData)) {
        setFormError({ ...formError, usernameError: validateUsername(fieldData) })
      } else {
        setFormData({ ...formData, username: fieldData })
        setFormError({ ...formError, usernameError: '' })
      }
    }

    if (fieldName == 'email') {
      if (validateEmail(fieldData)) {
        setFormError({ ...formError, emailError: validateEmail(fieldData) })
      } else {
        setFormData({ ...formData, email: fieldData })
        setFormError({ ...formError, emailError: '' })
      }
    }

    if (fieldName == 'password') {
      if (validatePassword(fieldData)) {
        setFormError({ ...formError, passwordError: validatePassword(fieldData) })
      } else {
        setFormData({ ...formData, password: fieldData })
        setFormError({ ...formError, passwordError: '' })
      }
    }

    if (fieldName == 'confirmPassword') {
      if (fieldData != formData.password) {
        setFormError({ ...formError, confirmPasswordError: 'Confirm password does not match!' })
      } else {
        setFormError({ ...formError, confirmPasswordError: '' })
      }
    }
  }

  return (
    <div className="d-flex justify-content-around align-items-center" style={{ height: "100vh" }}>
      <Modal id="errorModal" type="alert" message="Invalid data!" />
      <Modal id="successModal" onPrimaryAction={() => {
        setLoginPage(true)
        window.location.reload()
      }} title="Successfully Registered!" data={{}} type="confirm" primaryAction="Ok" />
      <div className="form-area">
        <div className="top d-flex justify-content-between py-3">
          <div className="d-flex flex-column justify-content-center">
            <h3>Sign Up</h3>
          </div>
          <img src={logo} alt="Logo" className="image" />
        </div>
        <form>
          <div className="mb-3">
            <InputField
              id="username"
              placeholder="Name"
              autoFocus="autofocus"
              onChange={(e) => handleChange(e, 'username')}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{formError.usernameError}</p>
          </div>
          <div className="mb-3">
            <InputField
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e, 'email')}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{formError.emailError}</p>
          </div>
          <div className="mb-3">
            <InputField
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e, 'password')}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{formError.passwordError}</p>
          </div>
          <div className="mb-3">
            <InputField
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => handleChange(e, 'confirmPassword')}
            />
            <p style={{ color: 'red', textAlign: 'center' }}>{formError.confirmPasswordError}</p>
          </div>
          <Button type="button" value="Sign Up" className="w-100" operationType="primary" onClick={handleSignUp} />
          <p className="text-center mx-0 my-3">
            Already have an account?{" "}
            <span className="text-decoration-underline text-dark" onClick={() => setLoginPage(true)}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
