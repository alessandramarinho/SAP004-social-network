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

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((currentUser) => {
    firebase.firestore()
      .collection('users')
      .where('user_uid', '==', currentUser.user.uid)
      .get()
      .then((snap) => {
        if (snap.size === 0) {
          const user = {
            name: currentUser.additionalUserInfo.profile.given_name,
            emailUser: currentUser.additionalUserInfo.profile.email,
            photoURL: currentUser.additionalUserInfo.profile.picture,
            user_uid: currentUser.user.uid
          };
          firebase.firestore().collection('users').add(user);
          window.location = '#feed';
        } else {
          window.location = '#feed';
        };
      });
  });
};
