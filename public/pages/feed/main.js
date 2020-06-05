export const feed = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="container-feed">
    <label for="page-feed">
      <input id="post" class="btn" placeholder='O que você está pensando' type='text'>
    </label>
      <button id='login-btn' class="feed-btn-postar">Postar</button>
      <button id='google-btn' class="feed-btn-logout">Logout</button>
    </form>
`;

  /*   const email = container.querySelector('#email');
    const password = container.querySelector('#password');
    const loginBtn = container.querySelector('#login-btn');
    const googleBtn = container.querySelector('#google-btn') */


  /*  loginBtn.addEventListener('click', (event) => {
     event.preventDefault();
     userLogin(email.value, password.value)
   });
 
   googleBtn.addEventListener('click', (event) => {
     event.preventDefault();
     loginGoogle()
   }) */

  return container;
};