// Función para cerrar sesión
function logoutUser() {
   localStorage.removeItem('loggedInUser');  
   alert('Has cerrado sesión exitosamente.');
   updateNav();  // Actualizar la barra de navegación
   window.location.href = 'index.html';  // Redirigir a la página principal
 }
 
 // Evento para gestionar el cierre de sesión
 document.addEventListener('DOMContentLoaded', function() {
   updateNav();  // Llamar a la función para actualizar la navegación cuando la página cargue
 
   const logoutLink = document.getElementById('logout-link');
   if (logoutLink) {
     logoutLink.addEventListener('click', logoutUser);
   }
 });