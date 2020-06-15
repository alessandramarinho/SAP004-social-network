// Aqui serão criados os eventos de Manipulação de DOM e templates
import { userLogin, loginGoogle } from './data.js';

export const home = () => {
  const container = document.createElement('div');

  container.innerHTML = `<div class='logo'><figure class='image'>
  <img src='../../assets/logo-sos.png' class='img-logo'>
</figure></div>
  <div class='dcontainer-home'> 
  <ul class='list-home'>
  <li><input id='email' class='btn' placeholder=' example@example.com' type='email'></li>
  <li><input id='password' class='btn' placeholder=' Digite sua senha' type='password'></li>
  <li><button id='login-btn' class='login-btn'>Login</button></li>
  <li><p>Ou entre com:</p></li>
  <li><button id='google-btn' class='googleBtn'><img class='google' src='../../assets/004-brands-and-logotypes.png'></button></li>
  <li><p>Ainda não tem conta?<a href='#register'> Registre-se!</a></p></li>
</ul>
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
