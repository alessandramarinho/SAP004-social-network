import { registerLogin } from './data.js';

export const register = () => {
  const container = document.createElement('div');

  container.innerHTML = `
  <div class='logo'><figure class='image'>
  <img src='../../assets/logo-sos.png' class='img-logo'>
</figure></div>
  <div class='dcontainer-home2'>
  <form class='class='list-home'>
  <label for='page-register' class='list'>
    <input id='name' class='btn' placeholder='Nome' type='text'>
  </label >
  <label for='register-email' class='list'>
    <input id='email' class='btn' placeholder='example@example.com' type='email'>
  </label >
  <label for='register-password' class='list'>
    <input id='password' class='btn' placeholder='senha' type='password'>
  </label >
  <label for='register-password' class='list'>
    <input id='password' class='btn' placeholder='senha' type='password'>
  </label >
    <button id='register-btn' class='register-btn'>Cadastrar</button>
    <p>Já tem cadastro?Faça o <a href='#home'>login</a></p>
  </form>
  </div>
  `;

  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const registerBtn = container.querySelector('#register-btn');
  const name = container.querySelector('#name');

  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value);
  });

  return container;
};
