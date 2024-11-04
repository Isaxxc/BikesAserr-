// Registro de usuarios
function registerUser(event) {
   event.preventDefault();
 
   const username = document.getElementById('register-username').value;
   const password = document.getElementById('register-password').value;
 
   if (!username || !password) {
     alert('Por favor, ingrese un usuario y contraseña válidos');
     return;
   }
 
   let users = JSON.parse(localStorage.getItem('users')) || [];
 
   const userExists = users.some(user => user.username === username);
   
   if (userExists) {
     alert('El nombre de usuario ya está en uso, por favor elija otro.');
     return;
   }
 
   users.push({ username, password });
   localStorage.setItem('users', JSON.stringify(users));
 
   alert('Usuario registrado exitosamente');
   document.getElementById('register-form').reset();
   window.location.href = '../HTML/login.html';
 }

  // Agregar los event listeners en los formularios
  document.addEventListener('DOMContentLoaded', function() {
   const registerForm = document.getElementById('register-form');
 
   if (registerForm) {
     registerForm.addEventListener('submit', registerUser);
   }
 });

 document.getElementById('hamburger-btn').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú
});
