import {
  logout, createPost, timeline, deletePost, likePost, saveEditedPost, printImg,
  createComment, readComment, deleteComments, saveEditedComment, printUser, updateProfile,
} from './data.js';

export const feed = () => {
  const container = document.createElement('div');
  container.classList.add('main-feed')
  container.innerHTML = ` 
  <div class='fundo'>
  <div class='navbar'>
    <button id='logout-btn' class='feed-btn-logout'>
      <img class='exit' src='../../assets/exit.png'>
    </button>
  <figure class='img-nav'>
    <img class='img-nav' src='../../assets/logo-sos.png'>
  </figure> 
  </div>
  <aside class='profile'>
    <div id='profile'>
    </div>
  </aside>
  <main class ='feed'>
  <form  id='form' class='postfeed'>
    <div id='privacy' class='privacy'>
        <input type='radio' name='privacy' id='public' class='btn-privacy' value='public' checked>
        <img class='public' src='../../assets/public.png' width='30'>
        <input type='radio' name='privacy' id='private' class='btn-privacy' value='private'>
        <img class='private' src='../../assets/private.png' width='30'>
      </div>  
      <fieldset class='postcont'>   
      <input id='post-input' class='btn post' placeholder=' O que você está pensando' type='text'>
      <button id='post-btn' type='submit' class='feed-btn-postar'>Postar</button>
    </fieldset>
  <main id='all-posts'>
  </form>
  </main>
  </div>
  `
  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const allPosts = container.querySelector('#all-posts');
  const inputPost = container.querySelector('#post-input');
  const form = container.querySelector('#form');
  const profile = container.querySelector('#profile');


  const templateProfile = (user) => {
    profile.innerHTML = '';
      const userProfile = document.createElement('div');
      userProfile.innerHTML = `
    <fieldset class='textarea-perfil'>
      <input id='foto-perfil' type='file'>
    <div class='img-perfil'>
      <img id='img-perfil' data-id=${user.id} src=${user.photoURL}>
    </div>
    </fieldset>${user.id} type='text' disabled>${user.name}</textarea></div>
    </fieldset>
    <fieldset class="textarea-location">
      <div class="textarea-location">Localização: <img class='size' src='../../assets/pin.png'><textarea id='location' class='textarea-location' type='text' data-id=${user.id} disabled>${user.location}</textarea></div>
    </fieldset> 
    <div class='bnt-
    spaceProfile'>
      <button id='edit-btn' class='edit size' data-id= ${user.id}>
        <img class='save size' src='../../assets/edit.png'>
      </button>
      <button id='save-btn' class='save size' data-id= ${user.id}>
        <img class='save size' src='../../assets/tick.png'>
      </button>
    </div>
    `
      profile.appendChild(userProfile)

      const textName = userProfile.querySelector('#first-name');
      const textLocation = userProfile.querySelector('#location');
      const inputImg = userProfile.querySelector('#foto-perfil');
      const divImg = userProfile.querySelector('#img-perfil');
      const editProfileBtn = userProfile.querySelector('#edit-btn');
      const saveEditedProfileBtn = userProfile.querySelector('#save-btn');

      inputImg.onchange = function (event) {
        printImg(event, user.id, divImagem, divImg)
      }
      const divImagem = (divImg, url) => {
        return divImg.innerHTML += `<img src ="${url}">`
      }

      editProfileBtn.addEventListener('click', (event) => {
        event.preventDefault();
        textName.disabled = false;
        textLocation.disabled = false;
        return editProfileBtn.dataset.id
      })
      saveEditedProfileBtn.addEventListener('click', (event) => {
        event.preventDefault();
        textName.disabled = true;
        textLocation.disabled = true;
        updateProfile(saveEditedProfileBtn.dataset.id, textName, textLocation)
      })
    

  }
  
  printUser(templateProfile);
  

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });

  postBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createPost(inputPost.value, form.privacy.value);
    allPosts.innerHTML = '';
    timeline(templatePost);
    inputPost.value = '';
  });

  const templatePost = (arrayPosts) => {
    allPosts.innerHTML = '';
    arrayPosts.map(post => {
      const template = document.createElement('div');
      template.classList.add('template');
      template.innerHTML = `
      <div class='postedfeed'>
        <p id ='datePost'class='posted-for'>${post.user}, em ${post.date}
        </p>
      <form id='privacy' class='privacy'>
        <input type="radio" name="privacy" id="public" class="btn-privacy" value="public" checked><img class='public btn-privacy' src='../../assets/public.png'>
      <input type="radio" name="privacy" id="private" class="btn-privacy" value="private"><img class='private btn-privacy' src='../../assets/private.png'>
      </form>
      <button id='delete-btn' class ='delet-btn'data-id= ${post.id}><img class='close' src='../../assets/close.png'></button>
      <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea> 
      <div class='bnt-space'>
      <button id='like-btn' class='likes-btn size' data-id= ${post.id}>
      <img class='likes size' src='../../assets/001-paw.png' width='20'>${post.likes}</button>'
      <button id='comment-btn' class ='comment-btn' data-id= ${post.id}><img class='likes size' src='../../assets/comment.png' width='20'></button> <br>
      <button id='edit-btn' class='edit size' data-id= ${post.id}><img class='save size' src='../../assets/edit.png'></button>
      <button id='save-btn' class='save size' data-id= ${post.id}><img class='save size' src='../../assets/tick.png'></button>
      </div>
      <div class='comments-area' id='all-comments' style="display: none;">
      <input class='comment-input' placeholder=' Digite seu comentário' type='text'>
      <button class='commentBtn' type='submit' class=''>Comentar</button>
      </div>
      </div>
      <div id='commented' class='commented2'>
      </div>`

      allPosts.appendChild(template);

      const commentBtn = template.querySelector('#comment-btn');
      const privacyForm = template.querySelector('#privacy');
      const commentButton = template.querySelector('.commentBtn');
      const allComments = template.querySelector('#commented')
      const inputComments = template.querySelector('.comment-input');

      const templateComment = (arrayComments) => {
        allComments.innerHTML = '';
        arrayComments.map(comment => {
          const containerComment = document.createElement('div')
          containerComment.innerHTML = `
        <div class='commented'>
        <button id='delete-comment' class ='delet-btn'data-id= ${comment.id}><img class='close' src='../../assets/close.png'></button>
        <textarea id='text-area' class='comment-area' data-id=${comment.id} disabled>${comment.text}</textarea>
        <div class='btn-comment'>
        <button id='edit-comment' class='edit size' data-id= ${comment.id}><img class='save size' src='../../assets/edit.png'></button>
      <button id='save-comment' class='save size' data-id= ${comment.id}><img class='save size' src='../../assets/tick.png'></button>
      </div>
        </div>
        `
          allComments.appendChild(containerComment)

          const deleteComment = containerComment.querySelector('#delete-comment');
          const editComments = containerComment.querySelector('#edit-comment');
          const saveComment = containerComment.querySelector('#save-comment');

          deleteComment.addEventListener('click', (event) => {
            event.preventDefault();
            deleteComments(post.id, deleteComment.dataset.id);
          })

          const editComment = () => {
            const textComment = containerComment.querySelector('#text-area');
            textComment.disabled = false;
            textComment.style.color = 'black';
          };

          editComments.addEventListener('click', (event) => {
            event.preventDefault();
            editComment(editComments.dataset.id);
            saveComment.style.display = 'flex';
          })

          saveComment.addEventListener('click', (event) => {
            event.preventDefault();
            const textComment = containerComment.querySelector('#text-area');
            textComment.disabled = true;
            saveEditedComment(post.id, saveComment.dataset.id, textComment)
          })

        })
      }

      commentButton.addEventListener('click', (event) => {
        event.preventDefault();
        createComment(inputComments.value, post.id);
        allComments.innerHTML = '';
        readComment(post.id, templateComment);
        inputComments.value = '';
      });


      commentBtn.addEventListener('click', () => {
        template.querySelector('.comments-area').style.display = 'flex';
      })

      const likeBtn = template.querySelector("#like-btn");
      const deleteBtn = template.querySelector('#delete-btn');
      const editBtn = template.querySelector("#edit-btn");
      const saveBtn = template.querySelector('#save-btn');
      const privacyBtn = template.querySelector('#privacy')
      const datePost = template.querySelector('#datePost')
      saveBtn.style.display = 'none';
      privacyBtn.style.display = 'none';

      if (post.userUid === firebase.auth().currentUser.uid) {
        deleteBtn.addEventListener('click', (event) => {
          event.preventDefault();
          deletePost(deleteBtn.dataset.id);
        })
        const editPost = () => {
          const textArea = template.querySelector('#text-area');
          textArea.disabled = false;
          textArea.style.color = 'black';
        };
        editBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editPost(editBtn.dataset.id)
          saveBtn.style.display = 'flex'
          privacyBtn.style.display = 'flex'
          datePost.style.display = 'none'
        })
        saveBtn.addEventListener('click', (event) => {
          event.preventDefault();
          const textArea = template.querySelector('#text-area');
          textArea.disabled = true;
          saveEditedPost(saveBtn.dataset.id, textArea, privacyForm.privacy)
        })
      } else {
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
        privacyBtn.style.display = 'none';
        datePost.style.display = 'flex'
        likeBtn.addEventListener('click', (event) => {
          event.preventDefault();
          likePost(likeBtn.dataset.id);
        })
      }
    }).join('');
  };
  timeline(templatePost);
  return container;
};