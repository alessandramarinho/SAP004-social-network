export const registerLogin = (email, password, name) => {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.hash = ('#feed');
      firebase.auth().currentUser.updateProfile({
        displayName: name,
      });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    }); email - password.html;
};
