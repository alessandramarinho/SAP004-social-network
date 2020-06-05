import {logout}  from './data.js'

export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="container-feed">
    <label for="page-feed">
      <input id="post" class="btn" placeholder='O que você está pensando' type='text'>
    </label>
      <button id='post-btn' class="feed-btn-postar">Postar</button>
      <button id='logout-btn' class="feed-btn-logout">Logout</button>
    </form>
`;

  const logoutBtn = container.querySelector('#logout-btn');
  const postBtn = container.querySelector('#post-btn');

  logoutBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    logout();
  });

  return container;
};

