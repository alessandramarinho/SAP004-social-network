import {
  logout, createPost, timeline, deletePost, likePost, saveEditedPost
} from './data.js';

export const feed = () => {
  const container = document.createElement('div');
container.innerHTML = ` <div class='fundo'>
  <div class='navbar'><button id='logout-btn' class="feed-btn-logout"><img class='exit' src='../../assets/exit.png'></button>
  <figure class='img-nav'><img class='img-nav' src='../../assets/logo-sos.png'></figure> 
  </div>
<section>
  <form class='class='postfeed'>
    <div id='profile-template' class='profile'>Perfil</div>
      <label for="page-feed" class='postcont'>
      <input type="radio" name="privacy" id="public" class="btn-privacy" value="public" checked><img class='public' src='../../assets/public.png' width='30'>
      <input type="radio" name="privacy" id="private" class="btn-privacy" value="private" checked><img class='private' src='../../assets/private.png' width='30'>
        <input id="post-input" class="btn post" placeholder=' O que você está pensando' type='text'>
          <button id='post-btn' type='submit' class="feed-btn-postar">Compartilhar</button>
      </label>
  </form>
</section>
<main id='all-posts'>
</main>
<footer>
</footer>
</div>
`
  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');
  const allPosts = container.querySelector('#all-posts');
  const inputPost = container.querySelector('#post-input');
  logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
  postBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createPost(inputPost.value);
    allPosts.innerHTML = '';
    timeline(templatePost);
    inputPost.value = '';
  });

const templatePost = (arrayPosts) => {
    allPosts.innerHTML = '';
    arrayPosts.map(post => {
      const template = document.createElement('div');
      // container.className = "fundo2"
      template.innerHTML = `
      <div class='postedfeed'>
    <p class='posted-for'>${post.user}, em ${post.date}</p>
    <input type="radio" name="privacy" id="public" class="btn-privacy" value="public" checked><img class='public' src='../../assets/public.png' width='30'>
    <input type="radio" name="privacy" id="private" class="btn-privacy" value="private" checked><img class='private' src='../../assets/private.png' width='30'>
    <button id='delete-btn' class ='delet-btn'data-id= ${post.id}><img class='close' src='../../assets/close.png'></button>
    <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea>    
    <button id='comment-btn' data-id= ${post.id}><img class='likes' src='../../assets/comment.png' width='20'></button>
    <button id='edit-btn' data-id= ${post.id}>Editar</button>
    <button id='save-btn' data-id= ${post.id}>Salvar</button>
    <button id='like-btn' class='likes-btn' data-id= ${post.id}>
    <img class='likes' src='../../assets/001-paw.png' width='20'>${post.likes}</button>'
    <div class='comments-area' style="display: none;"><textarea>olar</textarea></div>
    </div>` 

    allPosts.appendChild(template);

      const deleteBtn = template.querySelector('#delete-btn');
      deleteBtn.addEventListener('click', (event) => {
        event.preventDefault();
        deletePost(deleteBtn.dataset.id);
      })

      const likeBtn = template.querySelector("#like-btn");
      likeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        likePost(likeBtn.dataset.id);
      })

      const editPost = () => {
        const textArea = template.querySelector('#text-area');
        textArea.disabled = false;
        textArea.style.color = 'black';
      };

      const editBtn = template.querySelector("#edit-btn")
      editBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editPost(editBtn.dataset.id)
      })

      const saveBtn = template.querySelector('#save-btn');
      saveBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const textArea = template.querySelector('#text-area');
        textArea.disabled = true;
        saveEditedPost(saveBtn.dataset.id, textArea)
      })

      const commentBtn = template.querySelector('#comment-btn');
      commentBtn.addEventListener('click', ()=>{
        template.querySelector('.comments-area').style.display='flex';
      })
  }).join('');
  };
  timeline(templatePost, likePost, deletePost, saveEditedPost)
  return container;
};
