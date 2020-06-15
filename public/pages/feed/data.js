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

export const createPost = (text) => {
  const name = firebase.auth().currentUser.displayName;
  const email = firebase.auth().currentUser.email;
  const posts = {
    text: text,
    user: name,
    email: email,
    likes: 0,
    comments: [],
    date: new Date().toLocaleString('pt-BR'),
  }

  firebase.firestore()
    .collection('post').add(posts)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

export const timeline = (callback) => {
  firebase.firestore().collection("post")
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      var posts = [];
      querySnapshot.forEach(function (doc) {
        posts.push(doc.data());
      });
      callback(posts);
    });
}
