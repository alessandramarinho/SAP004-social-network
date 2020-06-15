import { registerLogin } from './data.js';

export const register = () => {
  const container = document.createElement('div');

  container.innerHTML = `
    <form class="form-register">
    <label for="page-register">
      <input id="name" class="btn" placeholder='Nome' type='text'>
    </label>
    <label for="register-email">
      <input id="email" class="btn" placeholder='example@example.com' type='email'>
    </label>
    <label for="register-password">
      <input id="password" class="btn" placeholder='senha' type='password'>
    </label>
    <label for="register-password">
      <input id="password" class="btn" placeholder='senha' type='password'>
    </label>
      <button id='register-btn'>Cadastrar</button>
      <p>Já tem cadastro?Faça o <a href='#home'>login</a></p>
    </form>
    <div class="cat-feed-img">
    <div class="dog-search-img">
    <div class="dog-hero-img">
  `;

  const email = container.querySelector('#email');
  const password = container.querySelector('#password');
  const registerBtn = container.querySelector('#register-btn');
  const name = container.querySelector('#name');

  registerBtn.addEventListener('click', (event) => {
    event.preventDefault();
    registerLogin(email.value, password.value, name.value)
  });

  return container;
};