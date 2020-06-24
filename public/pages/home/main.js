import { userLogin, loginGoogle } from './data.js';

export const home = () => {
  const container = document.createElement('div');
  container.classList.add('main-div')
  container.innerHTML = `
  <div class='logo'>
    <figure>
      <img class='img-logo' src='../../assets/logo-sos.png' >
    </figure>
  </div>
  <div class='dcontainer-home'> 
    <form class='form-home'>
      <figure>
        <img class='img-pets' src='../../assets/pets.png' >
      </figure>
    <label for='home-email' class='list-home'>
      <input id='email' class='btn' placeholder=' example@example.com' type='email'>
    </label>
    <label for='home-password' class='list-home'>
      <input id='password' class='btn' placeholder=' Digite sua senha' type='password'>
    </label>
    <button id='login-btn' class='login-btn'>Login</button>
      <p class='line-none'>Ou entre com:</p>
    <button id='google-btn' class='googleBtn'><img class='google' src='../../assets/google.png'></button>
      <p class='line-none'>Ainda não tem conta?<a href='#register'> Registre-se!</a></p></li>
    </form>
  </div>
  `;

  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const loginBtn = container.querySelector('#login-btn');
  const googleBtn = container.querySelector('#google-btn');

  loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    userLogin(email.value, password.value);
    email.value = '';
    password.value = '';
  });

  googleBtn.addEventListener('click', (event) => {
    event.preventDefault();
    loginGoogle();
  });

  return container;
};