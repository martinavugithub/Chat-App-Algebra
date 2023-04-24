const loginForm = document.getElementById('login');
const chatInterface = document.getElementById('chat-interface');

loginForm.addEventListener('submit', event => {
    event.preventDefault(); 
    chatInterface.style.display = 'block'; 
    loginForm.style.display = 'none'; 
});