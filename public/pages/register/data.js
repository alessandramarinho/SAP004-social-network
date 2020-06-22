export const registerLogin = (email, password, name, location) => {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => cred.user.updateProfile({ displayName: name }))
    .then(() => {
      window.location.hash = ('#feed');
      const uid = firebase.auth().currentUser.uid;
      const user = {
        location: location,
        emailUser: email,
        user_uid: firebase.auth().currentUser.uid,
        name: name,
      };
      firebase.firestore().collection('users').doc(uid).set(user);
    })
    .catch(() => {
    });
};
