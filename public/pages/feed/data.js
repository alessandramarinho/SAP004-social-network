export const logout = () => {
  firebase.auth()
    .signOut()
    .then(function () {
      alert('Sessão encerrada!');
      window.location.hash = '#home';
    });
};

export const printUser = (callback) => {
  firebase.firestore().collection('users')
    .onSnapshot(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if (firebase.auth().currentUser.uid === doc.data().user_uid) {
          callback({ id: doc.id, user_uid: doc.user_uid, ...doc.data() });
        };
      });
    });
};

export const updateProfile = (id, name, location) => {
  return firebase.firestore().collection('users').doc(id).update({
    name: name.value,
    location: location.value,
  });
};

export function printImg(event, id, func, divImg) {
  let user = firebase.auth().currentUser.uid;
  let arquivo = event.target.files[0];
  let ref = firebase.storage().ref('Usuarios/' + user + '/profile.jpg');
  ref.put(arquivo).then(function () {
    ref.getDownloadURL().then(function (url) {  // Now I can use url
      firebase.firestore().collection('users').doc(id).update({
        photoURL: url
      }).then(url => {
        func(divImg, url);
      });
    });
  });
};

export const createPost = (text, privacy) => {
  const posts = {
    text,
    user: firebase.auth().currentUser.displayName,
    user_uid: firebase.auth().currentUser.uid,
    likes: 0,
    comments: [],
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
        if (doc.data().privacy === 'public' || doc.data().user_uid === firebase.auth().currentUser.uid) {
          posts.push({ id: doc.id, user_uid: doc.user_uid, ...doc.data() })
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
};

export const likePost = (id) => {
  let likesPost = firebase.firestore().collection('post').doc(id);
  likesPost.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
};

export const saveEditedPost = (id, text, privacy) => {
  return firebase.firestore().collection('post').doc(id).update({
    text: text.value,
    privacy: privacy.value,
  });
};

export const createComment = (text, id) => {
  const comment = {
    text,
    user: firebase.auth().currentUser.displayName,
    user_uid: firebase.auth().currentUser.uid,
    date: new Date().toLocaleString('pt-BR'),
  };
  firebase.firestore()
    .collection('post').doc(id).collection('comments').doc().set(comment)
    .then(function () {
    })
    .catch(function (error) {
      window.erro(error);
    });
};

export const readComment = (id, callback) => {
  firebase.firestore().collection('post').doc(id).collection('comments')
    .orderBy('date', 'desc')
    .onSnapshot(function (querySnapshot) {
      const comment = [];
      querySnapshot.forEach(function (doc) {
        comment.push({ id: doc.id, user_uid: doc.user_uid, ...doc.data() })
      });
      callback(comment);
    });
};

export const deleteComments = (postId, docId) => {
  firebase.firestore().collection('post').doc(postId).collection('comments').doc(docId).delete().then(function () {
    console.log('Document successfully deleted!');
  }).catch(function (error) {
    console.error('Error removing document: ', error);
  });
};

export const saveEditedComment = (postId, docId, text) => {
  return firebase.firestore().collection('post').doc(postId).collection('comments').doc(docId).update({
    text: text.value,
  });
};
