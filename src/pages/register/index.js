import Register from '../../components/Register.js';

const register = new Register();
const registerDOM = register.render();

const root = document.getElementById('app');
root.appendChild(registerDOM);