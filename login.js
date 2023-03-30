const loginForm = document.getElementById('login');
const chatInterface = document.getElementById('chat-interface');

loginForm.addEventListener('submit', event => {
    // Prevent form submission and page reload
    event.preventDefault(); 
    // Show chat interface
    chatInterface.style.display = 'block'; 
    // Hide login form
    loginForm.style.display = 'none'; 
});