import { logout, createPost, timeline, deletePost, likePost, saveEditedPost } from './data.js';

export const feed = () => {
  const container = document.createElement('div');
  // document.querySelector('body').className = 'fundo'
  container.innerHTML = `
  <div class = 'fundo'>
  <nav id='' class='navbar'>
  <button id='logout-btn' class="feed-btn-logout">Logout</button>
</nav>
<section>
  <form class='class='postfeed'>
    <div id='profile-template' class='profile'>Perfil</div>
      <label for="page-feed" class='postcont'>
        <input id="post-input" class="btn post" placeholder='O que você está pensando' type='text'>
        <button id='post-btn' type='submit' class="feed-btn-postar"> Compartilhar </button>
      </label>
  </form>
</section>
<main id='all-posts'>
</main>
<footer>
</footer>
</div>
`;
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
      <div class='posted-for'>Postado por: ${post.user}, em ${post.date}</div>
      <textarea id='text-area' data-id=${post.id} class='post' disabled>${post.text}</textarea>
      <button id='like-btn' class='likes-btn' data-id= ${post.id}>
      <img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'
    <button id='delete-btn' data-id= ${post.id}>Deletar</button>
    <button id='edit-btn' data-id= ${post.id}>Editar</button>
    <button id='save-btn' data-id= ${post.id}>Salvar</button>
    </div>
    `
      allPosts.appendChild(template);
    }).join('');
    const deleteBtn = allPosts.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', (event) => {
      event.preventDefault();
      deletePost(deleteBtn.dataset.id);
    })
    const likeBtn = allPosts.querySelector("#like-btn");
    likeBtn.addEventListener('click', (event) => {
      event.preventDefault();
      likePost(likeBtn.dataset.id);
    })
  const editPost = () => {
    const textArea = allPosts.querySelector('#text-area');
    textArea.disabled = false;
    textArea.style.color = 'black';
  };
  const editBtn = allPosts.querySelector("#edit-btn")
  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    editPost(editBtn.dataset.id)
  })
  const saveBtn = allPosts.querySelector('#save-btn');
  saveBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const textArea = allPosts.querySelector('#text-area');
    textArea.disabled = true;
    saveEditedPost(saveBtn.dataset.id, textArea)
  })
};
  return container;
};