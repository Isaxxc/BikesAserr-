// Cargar usuarios del localStorage y mostrarlos en la página
function loadUsers() {
   const users = JSON.parse(localStorage.getItem('users')) || [];
   const userList = document.getElementById('user-list');
   userList.innerHTML = '';
 
   users.forEach((user, index) => {
     const li = document.createElement('li');
     li.innerHTML = `
       ${user.username} 
       <button class="edit-btn" data-index="${index}">Editar</button>
       <button class="delete-btn" data-index="${index}">Eliminar</button>
     `;
     userList.appendChild(li);
   });
 }
 
 // Guardar o modificar un usuario
 function saveUser(event) {
   event.preventDefault();
 
   const username = document.getElementById('username').value;
   const password = document.getElementById('password').value;
   let users = JSON.parse(localStorage.getItem('users')) || [];
 
   const existingUserIndex = users.findIndex(user => user.username === username);
 
   if (existingUserIndex !== -1) {
     // Modificar usuario existente
     users[existingUserIndex].password = password;
     alert('Usuario modificado exitosamente');
   } else {
     // Crear nuevo usuario
     users.push({ username, password });
     alert('Usuario creado exitosamente');
   }
 
   localStorage.setItem('users', JSON.stringify(users));
   document.getElementById('user-form').reset();
   loadUsers(); // Recargar la lista de usuarios
 }
 
 // Eliminar un usuario
 function deleteUser(index) {
   let users = JSON.parse(localStorage.getItem('users')) || [];
   users.splice(index, 1); // Eliminar el usuario por su índice
   localStorage.setItem('users', JSON.stringify(users));
   loadUsers(); 
 }
 
 // Editar usuario (cargarlo en el formulario)
 function editUser(index) {
   const users = JSON.parse(localStorage.getItem('users')) || [];
   const user = users[index];
 
   document.getElementById('username').value = user.username;
   document.getElementById('password').value = user.password;
 }
 
 // Event Listeners
 document.addEventListener('DOMContentLoaded', function() {
   loadUsers(); 
 
   const userForm = document.getElementById('user-form');
   userForm.addEventListener('submit', saveUser); 
 
   // Delegar eventos de edición y eliminación
   document.getElementById('user-list').addEventListener('click', function(event) {
     if (event.target.classList.contains('edit-btn')) {
       const index = event.target.getAttribute('data-index');
       editUser(index); 
     }
 
     if (event.target.classList.contains('delete-btn')) {
       const index = event.target.getAttribute('data-index');
       if (confirm('¿Estás seguro de eliminar este usuario?')) {
         deleteUser(index); 
       }
     }
   });
 });
 

 // Función para verificar si hay un usuario logueado y actualizar la navegación
function updateNav() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutLink = document.getElementById('logout-link');
  const historialLink = document.getElementById('historial-link');
  const welcomeMessage = document.getElementById('welcome-message');

  if (loggedInUser) {
    // Si hay un usuario logueado
    loginLink.style.display = 'none';  
    registerLink.style.display = 'none';  
    historialLink.style.display = 'inline';
    welcomeMessage.style.display = 'inline';  
    welcomeMessage.textContent = `Bienvenido, ${loggedInUser}`;  
    logoutLink.style.display = 'inline';  
  } else {
    // Si no hay usuario logueado
    loginLink.style.display = 'inline';  
    registerLink.style.display = 'inline'; 
    welcomeMessage.style.display = 'none';  
    logoutLink.style.display = 'none';  
  }
}

