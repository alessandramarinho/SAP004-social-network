export const logout = () => {
  firebase.auth()
    .signOut()
    .then(function () {
      alert('Sessão encerrada!');
      window.location.hash = '#home';

      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened.
    });
}
