// Este é o ponto de entrada de sua aplicação
import { home } from './pages/home/main.js';
import { register } from './pages/register/main.js';
import { feed } from './pages/feed/main.js';

const main = document.querySelector('#root')

const routes = {
  home: home(),
  register: register(),
  feed: feed()
}

const init = () => {
  window.addEventListener("hashchange", () => {
    renderPage();
  })
}

/* const renderPage = () => {
  main.innerHTML = "";
    const page = validateHash(window.location.hash)
    main.appendChild(routes[page]);
} */
const renderPage = () => {
  const page = validateHash(window.location.hash)
  firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    main.innerHTML = "";
    if(page === 'home'){
      main.appendChild(routes.home)
    } else if (page === 'register'){
      main.appendChild(routes.register)
    } 
  }else if (user){
    main.innerHTML = "";
    main.appendChild(routes[page]);
  }
});
 
}
const validateHash = (hash) => hash === "" ? "home" : hash.replace("#","")

window.addEventListener("load", () => {
  renderPage();
  init();
})
