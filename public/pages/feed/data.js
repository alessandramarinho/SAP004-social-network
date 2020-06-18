export const logout = () => {
  firebase.auth()
    .signOut()
    .then(function () {
      alert('Sessão encerrada!');
      window.location.hash = '#home';
    })
    .catch(function (error) {
      // An error happened.
    });
}
export const createPost = (text, privacy) => {
  const posts = {
    text,
    user: firebase.auth().currentUser.displayName,
    userUid: firebase.auth().currentUser.uid,
    likes: 0,
    comments: 0,
    date: new Date().toLocaleString('pt-BR'),
    privacy
  };
  firebase.firestore()
    .collection('post').add(posts)
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}
export const timeline = (callback) => {
  firebase.firestore().collection('post')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      const posts = [];
      querySnapshot.forEach(function (doc) {
        if (doc.data().privacy === 'public' || doc.data().userUid === firebase.auth().currentUser.uid) {
          posts.push({ id: doc.id, userUid: doc.userUid, ...doc.data() })
        };
      });
      callback(posts);
    });
}
export const deletePost = (id) => {
  firebase.firestore().collection('post').doc(id).delete().then(function () {
    console.log('Document successfully deleted!');
  }).catch(function (error) {
    console.error('Error removing document: ', error);
  });
}
export const likePost = (id) => {
  let likesPost = firebase.firestore().collection('post').doc(id);
  likesPost.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}
export const saveEditedPost = (id, text /* privacy */) => {
  return firebase.firestore().collection("post").doc(id).update({
    text: text.value,
    /* privacy: privacy.value, */
  })
};
export const createComment = (text) => {
  const comment = {
    text: text,
    user: firebase.auth().currentUser.displayName,
    userUid: firebase.auth().currentUser.uid,
    date: new Date().toLocaleString('pt-BR'),
  };
  firebase.firestore()
    .collection('comments').add(comment)
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
}
export const loadComments = (callback) => {
  firebase.firestore().collection('comments')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      const comment = [];
      querySnapshot.forEach(function (doc) {
        comment.push({ id: doc.id, userUid: doc.userUid, ...doc.data() });
      });
      callback(comment);
    });
}



