import { registerLogin } from './data.js';

export const register = () => {
  const container = document.createElement('div');
  container.classList.add('main-div')
  container.innerHTML = `
  <div class='logo'>
    <figure class='image'>
      <img src='../../assets/logo-sos.png' class='img-logo'>
    </figure> 
  </div>
  <div class='dcontainer-home2'>
    <form class='form-register'>
      <fieldset class='list'>
        <input id='name' class='btn' placeholder='Nome e Sobrenome' type='text'>
      </fieldset>
      <fieldset class='list'>
        <input id='email' class='btn' placeholder='example@example.com' type='email'>
      </fieldset>
      <fieldset class='list'>
        <input id='password' class='btn' placeholder='Senha' type='password'>
      </fieldset>
      <fieldset class='list'>
        <input id='location-register' class='btn' placeholder='Localização' type='text' >
      </fieldset>
      <button id='register-btn' class='register-btn'>Cadastrar </button>
        <p class='line-none'>Já tem cadastro? Faça o <a href='#home'>Login</a></p>
    </form>
  </div>
  `;

  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const registerBtn = container.querySelector('#register-btn');
  const name = container.querySelector('#name');
  const location = container.querySelector('#location-register');

  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value, location.value);
  });

  return container;
};