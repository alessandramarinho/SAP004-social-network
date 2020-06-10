import {logout, createPost, timeline}  from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="container-feed">
    <label for="page-feed">
      <input id="post-input" class="btn" placeholder='O que você está pensando' type='text'>
    </label>
      <button id='post-btn' type='submit' class="feed-btn-postar">Postar</button>
      <button id='logout-btn' class="feed-btn-logout">Logout</button>
    </form>
    <section id='all-posts'></section>
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
    allPosts.innerHTML = "";
    timeline(template);
    inputPost.value = "";

  });
  const template = (arrayPosts) => {
    allPosts.innerHTML = arrayPosts.map(post => `
    <div>${post.text}</div>
    <div>${post.email} ${post.date}</div>
    <button id='like-btn'><img class='likes' src='../../assets/001-paw.png' width='30'>${post.likes}</button>'
    `).join("")
  }

  return container;
};
