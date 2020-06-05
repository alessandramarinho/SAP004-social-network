export const registerLogin = (email, password) => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        window.location.hash('#feed');
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      }); email - password.html
  }
  