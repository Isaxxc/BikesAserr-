// Función para cargar y mostrar los productos en la página principal
function loadProducts() {
  const productList = document.getElementById('product-list');
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Limpiar el contenedor de productos
  productList.innerHTML = '';

  // Crear las tarjetas de productos
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <h3>${product.category}</h3>
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Precio: $${product.price}</p>
      <p>Cantidad disponible: ${product.quantity}</p>
      ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
      <button class="add-to-cart-btn" ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>
    `;

    productList.appendChild(productCard);
  });

  // Agregar eventos a los botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productIndex = this.getAttribute('data-index');
      const selectedProduct = products[productIndex];
      agregarAlCarrito(selectedProduct);
    });
  });
}

 // Cargar los productos cuando se cargue la página principal
 document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('index.html')) {
    loadProducts();
  }
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

 document.getElementById('hamburger-btn').addEventListener('click', function() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active'); // Activa o desactiva la clase "active" para mostrar/ocultar el menú
});


/* 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */
/* Cambio de modo oscuro - claro vs claro - oscuro */
document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Aplicar el tema guardado en localStorage
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = 'Modo Claro';
  } else {
    themeToggleBtn.textContent = 'Modo Oscuro';
  }

  // Evento de clic en el botón para alternar el tema
  themeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Verificar el estado actual y actualizar el botón
    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = 'Modo Claro';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = 'Modo Oscuro';
      localStorage.setItem('theme', 'light');
    }
  });
});
/* 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888 */
