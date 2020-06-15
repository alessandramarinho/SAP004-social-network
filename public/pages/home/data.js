// Aqui serão exportadas as funções que irão ser usadas
export const userLogin = (email, password) => {
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      const name = firebase.auth().currentUser.displayName;
      alert(`Olá, ${name}!`);
      window.location.hash = '#feed';
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const msgError = 'Senha inválida ou usuário não cadastrado!';
      console.log(errorCode);
      console.log(errorMessage);
      alert(msgError);
      // ...
    }); email - password.html;
};

export function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      const name = firebase.auth().currentUser.displayName;
      alert(`Olá, ${name}!`);
      window.location.hash = '#feed';
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
}