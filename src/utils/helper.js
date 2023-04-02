import { regularExpressionPatterns,PASSWORD_LENGTH } from "./constants";

const validateUsername = (username) => {
    if (username == '') {
        return 'Field cannot be empty!'
    } else {
        return false
    }
}

const validateEmail = (email) => {
    if (email == '') {
        return 'Please Enter Email'
    } else if (!regularExpressionPatterns.emailPattern.test(email)) {
        return 'Invalid Email'
    } else {
        return false;
    }
}

const validatePassword = (password) => {
    if (password.length < PASSWORD_LENGTH) {
      return 'Password length must be 10.'
    } else if (!regularExpressionPatterns.specialCharsPattern.test(password)) {
      return 'Password must contain atleast one special character.'
    } else if (!regularExpressionPatterns.numbersPattern.test(password)) {
      return 'Password must contain atleast one number'
    } else if (!regularExpressionPatterns.upCharsPattern.test(password)) {
      return 'Password must contain atleast one uppercase letter.'
    } else if (!regularExpressionPatterns.lowCharsPattern.test(password)) {
      return 'Password must contain atleast one lowercase letter.'
    } else {
      return false;
    }
  }


  const storeData = (data) => {
    const dataArray = getData();
    dataArray.push(data)
    localStorage.setItem('users',JSON.stringify(dataArray))
  }

  const getData = () => {
    return JSON.parse(localStorage.getItem('users')) ?? []
  }

export {
    validateUsername,
    validateEmail,
    validatePassword,
    storeData,
    getData,
}