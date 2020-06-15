// Aqui serão exportadas as funções que irão ser usadas
export const userLogin = (email, password) => {
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const name = firebase.auth().currentUser.displayName;
      alert(`Olá, ${name}!`);
      window.location.hash = '#feed';
    })
    .catch(function (error){
      var errorCode = error.code;
      var errorMessage = error.message;
      var msgError = 'Senha inválida ou usuário não cadastrado!'
      console.log(errorCode);
      console.log(errorMessage);
      alert(msgError);
      // ...
    }); email - password.html
}

export function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth()
  .signInWithPopup(provider)
  .then(function(result) {
    const name = firebase.auth().currentUser.displayName;
      alert(`Olá, ${name}!` );
    window.location.hash = '#feed';
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}