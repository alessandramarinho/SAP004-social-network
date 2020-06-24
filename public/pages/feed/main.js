import {
  logout, createPost, timeline, deletePost, likePost, saveEditedPost, printImg,
  createComment, readComment, deleteComments, saveEditedComment, printUser, updateProfile,
} from './data.js';

export const feed = () => {
  const container = document.createElement('div');
  document.body.className = 'main-feed';
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
      <textarea id='post-input' class='btn post' placeholder='Compartilhe sua mensagem' type='text'></textarea>
      <button id='post-btn' type='submit' class='feed-btn-postar'>Postar</button>
    </fieldset>
  <div id='all-posts'>
  </form>
  </main>
</div>
  `;

  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const allPosts = container.querySelector('#all-posts');
  const inputPost = container.querySelector('#post-input');
  const form = container.querySelector('#form');
  const profile = container.querySelector('#profile');

  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });

  const templateProfile = (user) => {
    profile.innerHTML = '';
    const userProfile = document.createElement('div');
    userProfile.className = 'profileBox';
    userProfile.innerHTML = `
    <div class='img-perfil'>
      <figure class='pic-profile'> 
        <img id='img-perfil' class='pic-profile' data-id=${user.id} src=${user.photoURL || '../../assets/pri.jpeg'}>
      </figure>   
      <div>
        <textarea id='first-name' class='personal-info' data-id= ${user.id} type='text' disabled>${user.name}</textarea>
        <div class='textarea-location'>Localização: 
          <img class='pin' src='../../assets/pin.png'> <textarea id='location' class='textarea-location' type='text' data-id=${user.id} disabled>${user.location}</textarea>
      </div>          
    </div>
  </div>
  <div class='edit-btn'>
    <label for='foto-perfil' class='btn-profile'><strong>Editar Foto</strong>
      <input id='foto-perfil' type='file'>
    </label>
  <div class='bnt-spaceProfile'>
    <button id='edit-btn' class='edit-profile' data-id= ${user.id}>
      <img class='edit-profile' src='../../assets/edit.png'>
    </button>
    <button id='save-btn' class='edit-profile' data-id= ${user.id}>
      <img class='edit-profile' src='../../assets/tick.png'>
    </button>
  </div>
</div>
  `;

    profile.appendChild(userProfile);

    const textName = userProfile.querySelector('#first-name');
    const textLocation = userProfile.querySelector('#location');
    const inputImg = userProfile.querySelector('#foto-perfil');
    const divImg = userProfile.querySelector('#img-perfil');
    const editProfileBtn = userProfile.querySelector('#edit-btn');
    const saveEditedProfileBtn = userProfile.querySelector('#save-btn');

    inputImg.onchange = function (event) {
      printImg(event, user.id, divImagem, divImg)
    };

    const divImagem = (divImg, url) => {
      return divImg.innerHTML += `<img src ='${url}'>`
    };

    editProfileBtn.addEventListener('click', (event) => {
      event.preventDefault();
      textName.disabled = false;
      textLocation.disabled = false;
      return editProfileBtn.dataset.id;
    });

    saveEditedProfileBtn.addEventListener('click', (event) => {
      event.preventDefault();
      textName.disabled = true;
      textLocation.disabled = true;
      updateProfile(saveEditedProfileBtn.dataset.id, textName, textLocation);
    });
  };

  postBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputPost.value === '') {
      console.log('campo vazio');
    } else {
      createPost(inputPost.value, form.privacy.value);
      allPosts.innerHTML = '';
      timeline(templatePost);
      inputPost.value = '';
    };
  });

  const templatePost = (arrayPosts) => {
    allPosts.innerHTML = '';
    arrayPosts.map(post => {
      const template = document.createElement('div');
      template.classList.add('template');
      template.innerHTML = `
      <div class='postedfeed'>
        <div class='userPost'>
          <p id ='datePost'class='posted-for'>${post.user}, em ${post.date}</p>
          <button id='delete-btn' class ='delet-btn'data-id= ${post.id}><img class='close' src='../../assets/close.png'></button>
        </div>
        <form id='privacy' style='display: none;' class='privacy'>
          <input type='radio' name='privacy' id='public' class='btn-privacy' value='public' checked>
            <img class='public btn-privacy' src='../../assets/public.png'>
          <input type='radio' name='privacy' id='private' class='btn-privacy' value='private'>
            <img class='private btn-privacy' src='../../assets/private.png'>
        </form>
        <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea>
        <div class='bnt-space'>
          <button id='like-btn' class='likes-btn size' data-id= ${post.id}>
            <img class='likes size' src='../../assets/001-paw.png' width='20'>${post.likes}</button>
          <button id='comment-btn' class ='comment-btn' data-id= ${post.id}>
            <img class='likes size' src='../../assets/comment.png' width='20'></button> <br>
          <button id='edit-btn' class='edit size' data-id= ${post.id}>
            <img class='save size' src='../../assets/edit.png'></button>
          <button id='save-btn' style='display: none;' class='save size' data-id= ${post.id}>
            <img class='save size' src='../../assets/tick.png'></button>
        </div>
        <div class='comments-area' id='all-comments' style='display: none;'>
          <textarea class='comment-input' placeholder=' Digite seu comentário' type='text'></textarea>
          <button class='commentBtn' id='btnComment' type='submit' >Comentar</button>
        </div>
      </div>
      <div id='commented' class='commented2' style='display: none;'>${post.comments}
      </div>
      `;

      allPosts.appendChild(template);

      const commentBtn = template.querySelector('#comment-btn');
      const privacyForm = template.querySelector('#privacy');
      const commentButton = template.querySelector('#btnComment');
      const allComments = template.querySelector('#commented');
      const inputComments = template.querySelector('.comment-input');
      const likeBtn = template.querySelector('#like-btn');
      const deleteBtn = template.querySelector('#delete-btn');
      const editBtn = template.querySelector('#edit-btn');
      const saveBtn = template.querySelector('#save-btn');
      const privacyBtn = template.querySelector('#privacy');
      const datePost = template.querySelector('#datePost');

      if (post.user_uid === firebase.auth().currentUser.uid) {
        deleteBtn.addEventListener('click', (event) => {
          event.preventDefault();
          deletePost(deleteBtn.dataset.id);
        });
        const editPost = () => {
          const textArea = template.querySelector('#text-area');
          textArea.disabled = false;
          textArea.style.color = 'black';
        };
        editBtn.addEventListener('click', (event) => {
          event.preventDefault();
          editPost(editBtn);
          saveBtn.style.display = 'flex';
          privacyBtn.style.display = 'flex';
          datePost.style.display = 'none';
        });
        saveBtn.addEventListener('click', (event) => {
          event.preventDefault();
          const textArea = template.querySelector('#text-area');
          textArea.disabled = true;
          saveEditedPost(saveBtn.dataset.id, textArea, privacyForm.privacy);
        });
      } else {
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
        privacyBtn.style.display = 'none';
        datePost.style.display = 'flex';
      };
      likeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        likePost(likeBtn.dataset.id);
      });

      const templateComment = (arrayComments) => {
        allComments.innerHTML = '';
        arrayComments.map(comment => {
          const containerComment = document.createElement('div');
          containerComment.innerHTML = `
        <div class='commented'>
          <div class='commentedInfo'><p>${comment.user}, em ${comment.date}</p>
            <button id='delete-comment' class ='delet-btn'data-id= ${comment.id}>
              <img class='close' src='../../assets/close.png'></button>
            </div><hr>
          <textarea id='text-area' class='comment-area post-comment' data-id=${comment.id} disabled>${comment.text}</textarea>
          <div class='btn-comment'>
            <button id='edit-comment' class='edit size' data-id= ${comment.id}>
              <img class='save size' src='../../assets/edit.png'></button>
            <button id='save-comment' style='display: none;' class='save size' data-id= ${comment.id}>
              <img class='save size' src='../../assets/tick.png'></button>
          </div>
        </div>
        `;

          allComments.appendChild(containerComment);

          const deleteComment = containerComment.querySelector('#delete-comment');
          const editComments = containerComment.querySelector('#edit-comment');
          const saveComment = containerComment.querySelector('#save-comment');

          if (comment.user_uid === firebase.auth().currentUser.uid) {
            deleteComment.addEventListener('click', (event) => {
              event.preventDefault();
              deleteComments(post.id, deleteComment.dataset.id);
            });

            const editComment = () => {
              const textComment = containerComment.querySelector('#text-area');
              textComment.disabled = false;
              textComment.style.color = 'black';
            };

            editComments.addEventListener('click', (event) => {
              event.preventDefault();
              editComment(editComments.dataset.id);
              saveComment.style.display = 'flex';
            });
            saveComment.addEventListener('click', (event) => {
              event.preventDefault();
              const textComment = containerComment.querySelector('#text-area');
              textComment.disabled = true;
              saveEditedComment(post.id, saveComment.dataset.id, textComment);
            });
          } else {
            editComments.style.display = 'none';
            deleteComment.style.display = 'none';
          };
        });
      };

      commentButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (inputComments.value === '') {
          console.log('campo vazio');
        } else {
          createComment(inputComments.value, post.id);
          allComments.innerHTML = '';
          readComment(post.id, templateComment);
          inputComments.value = '';
        };
      });

      commentBtn.addEventListener('click', (event) => {
        event.preventDefault();
        toHideDivs('#all-comments', '#commented');
      });

      function toHideDivs(divPost, divCom) {
        let displayPost = template.querySelector(divPost).style.display;
        let displayComment = template.querySelector(divCom).style.display;
        if (displayPost == 'none') {
          template.querySelector(divPost).style.display = 'flex';
          template.querySelector(divCom).style.display = 'block';
          readComment(post.id, templateComment);
        } else if (displayPost == 'flex' || displayComment == 'block') {
          template.querySelector(divPost).style.display = 'none';
          template.querySelector(divCom).style.display = 'none';
        };
      };

    }).join('');
  };
  timeline(templatePost);
  printUser(templateProfile);
  return container;
};