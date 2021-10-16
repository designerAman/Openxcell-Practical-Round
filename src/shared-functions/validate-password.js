module.exports = function makeValidatePassword() {
  return function validatePassword({ password }) {
    if (password.length < 8) {
      return {
        isValidPassword: false,
        message: 'Password should contain atleast 8 characters'
      }
    }

    if (password.match(new RegExp(/^[A-Za-z0-9 ]+$/))) {
      return {
        isValidPassword: false,
        message: 'Password should contain atleast one special character'
      }
    }

    let isPasswordContainsNumber = false;
    let isPasswordContainsUpperCaseLetter = false;
    let isPasswordContainsLowerCaseLetter = false;
    password = password.replace(/[^a-zA-Z0-9]/g, "");

    for (let i = 0; i < password.length; i++) {
      if (!isNaN(password.charAt(i)) && !isPasswordContainsNumber) {
        isPasswordContainsNumber = true;
      }

      if (isNaN(password.charAt(i)) && password.charAt(i) === password.charAt(i).toUpperCase() && !isPasswordContainsUpperCaseLetter) {
        isPasswordContainsUpperCaseLetter = true;
      }

      if (isNaN(password.charAt(i)) && password.charAt(i) === password.charAt(i).toLowerCase() && !isPasswordContainsLowerCaseLetter) {
        isPasswordContainsLowerCaseLetter = true;
      }
    }

    if (!isPasswordContainsNumber) {
      return {
        isValidPassword: false,
        message: 'Password should contain atleast one number'
      }
    }

    if (!isPasswordContainsUpperCaseLetter) {
      return {
        isValidPassword: false,
        message: 'Password should contain atleast one upper case letter'
      }
    }

    if (!isPasswordContainsLowerCaseLetter) {
      return {
        isValidPassword: false,
        message: 'Password should contain atleast lower case letter'
      }
    }

    return {
      isValidPassword: true,
    }
  }
}