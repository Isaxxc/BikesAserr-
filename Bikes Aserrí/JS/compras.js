
function mostrarComprasRealizadas() {
   const comprasList = document.getElementById('compras-list');
   let comprasRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
   const usuarioActual = localStorage.getItem('loggedInUser'); // Obtener el usuario que está logueado
 
   if (comprasRealizadas.length === 0) {
     comprasList.innerHTML = '<p>No se han realizado compras.</p>';
     return;
   }
 
   // Limpiar el contenido previo
   comprasList.innerHTML = '';
 
   comprasFiltradas = comprasRealizadas.filter(compra => compra.usuario === usuarioActual);

   // Iterar sobre las compras realizadas
   comprasFiltradas.forEach(compra => {
     const compraDiv = document.createElement('div');
     compraDiv.classList.add('compra');
 
     // Crear la lista de productos
     let productosHTML = '<ul>';
     compra.productos.forEach(item => {
       productosHTML += `<li>${item.name} - $${item.price} - Cantidad: ${item.quantity}</li>`;
     });
     productosHTML += '</ul>';
 
     compraDiv.innerHTML = `
       <h3>Compra realizada por ${compra.usuario} el ${compra.fecha}</h3>
       ${productosHTML}
       <p>Total: $${compra.total}</p>
     `;
 
     comprasList.appendChild(compraDiv);
   });
 }
 
 function mostrarComprasRealizadas2() {
  const comprasList2 = document.getElementById('compras-list2');
  let comprasRealizadas2 = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];


  if (comprasRealizadas2.length === 0) {
      comprasList2.innerHTML = '<p>No se han realizado compras.</p>';
      return;
  }

  // Limpiar el contenido previo
  comprasList2.innerHTML = '';

  // Iterar sobre las compras realizadas
  comprasRealizadas2.forEach(compra => {
      const compraDiv = document.createElement('div');
      compraDiv.classList.add('compra');
      
      // Crear la lista de productos
      let productosHTML = '<ul>';
      compra.productos.forEach(item => {
          productosHTML += `<li>${item.name} - $${item.price} - Cantidad: ${item.quantity}</li>`;
      });
      productosHTML += '</ul>';

      // Mostrar el nombre del usuario que realizó la compra
      compraDiv.innerHTML = `
          <h3>Compra realizada por ${compra.usuario} el ${compra.fecha}</h3>
          ${productosHTML}
          <p>Total: $${compra.total}</p>
      `;

      comprasList2.appendChild(compraDiv);
  });
}

 document.addEventListener('DOMContentLoaded', function() {
   const comprasList = document.getElementById('compras-list');
   const usuarioActual = localStorage.getItem('loggedInUser');
   if (comprasList) {
       mostrarComprasRealizadas();

   }

   if (usuarioActual === "admin"){
    mostrarComprasRealizadas2();
   }


 });
