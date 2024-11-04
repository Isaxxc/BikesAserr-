// Función para agregar productos
function addProduct(event) {
  event.preventDefault();

  const category = document.getElementById('product-category').value;
  const name = document.getElementById('product-name').value;
  const price = document.getElementById('product-price').value;
  const description = document.getElementById('product-description').value;
  const quantity = document.getElementById('product-quantity').value;
  const imageFile = document.getElementById('product-image').files[0];

  // Verificar que se haya ingresado todo
  if (!category || !name || !price || !description || !quantity || !imageFile) {
    alert('Por favor, ingrese todos los campos');
    return;
  }

  // Convertir la imagen en base64 para guardarla
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageDataUrl = event.target.result;

    // Recuperar los productos de localStorage (o un arreglo vacío si no hay productos)
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Crear el nuevo producto
    const newProduct = {
      category,
      name,
      price,
      description,
      quantity,
      image: imageDataUrl,  // Guardar la imagen en base64
    };

    // Agregar el producto al arreglo y guardar en localStorage
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    // Actualizar la lista de productos en pantalla
    displayProducts();

    alert('Producto agregado exitosamente');
    document.getElementById('add-product-form').reset();
  };

  reader.readAsDataURL(imageFile);
}

// Agregar el evento al formulario de productos
document.addEventListener('DOMContentLoaded', function () {
  const addProductForm = document.getElementById('add-product-form');
  if (addProductForm) {
    addProductForm.addEventListener('submit', addProduct);
  }
});

// Al cargar la página de administrador, verificamos si es el admin
function checkAdminAccess() {
  const loggedInUser = localStorage.getItem('loggedInUser');

  // Verificar si el usuario está logueado y si es admin
  if (!loggedInUser || loggedInUser !== 'admin') {
    alert('Acceso denegado. Solo el administrador puede acceder a esta página.');
    window.location.href = '/index.html';
  }
}

// Agregar los event listeners en los formularios
document.addEventListener('DOMContentLoaded', function () {
  // Si estamos en la página de administración, verificamos el acceso
  if (window.location.pathname.includes('admin.html')) {
    checkAdminAccess();
  }
});

// Función para mostrar los productos en la página
function displayProducts() {
  
  let allProducts = JSON.parse(localStorage.getItem('products')) || {};

  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.innerHTML = ''; 

  let products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    categoriesContainer.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }

  // Agrupar productos por categoría
  const categories = {};

  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  });

  // Crear tarjetas por categoría
  for (const category in categories) {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category-section');

    const categoryTitle = document.createElement('h2');
    categoryTitle.innerText = category;
    categoryDiv.appendChild(categoryTitle);

    const productList = document.createElement('div');
    productList.classList.add('product-grid');

    // Al recorrer las categorías
    categories[category].forEach((product, index) => {
      const productIndex = allProducts.findIndex(p => p.name === product.name); // Obtener el índice absoluto
      const productCard = document.createElement('div');
      productCard.classList.add('product-item');
      productCard.innerHTML = `
    <h3>${product.name}</h3>
    <p>Precio: ₡${product.price}</p>
    <p>Cantidad: ${product.quantity}</p>
    <img src="${product.image}" alt="${product.name}">
    <button onclick="editProduct(${productIndex})" class="edit-btn">Editar</button> <!-- Usar el índice absoluto -->
    <button onclick="deleteProduct(${productIndex})" class="delete-btn">Eliminar</button>
  `;
      productList.appendChild(productCard);
    });


    categoryDiv.appendChild(productList);
    categoriesContainer.appendChild(categoryDiv);
  }
}

// Llamar a la función para mostrar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
  displayProducts();
});

// Función para eliminar un producto
function deleteProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Eliminar el producto del array
  products.splice(index, 1);

  // Guardar el nuevo array en localStorage
  localStorage.setItem('products', JSON.stringify(products));

  // Actualizar la lista de productos en pantalla
  displayProducts();

  alert('Producto eliminado correctamente.');
}

// Función para editar un producto
function editProduct(index) {
  let products = JSON.parse(localStorage.getItem('products')) || [];

  // Cargar la información del producto en el formulario
  const product = products[index];
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-description').value = product.description;
  document.getElementById('product-quantity').value = product.quantity;

  // Cambiar el comportamiento del botón de agregar a actualizar
  const form = document.getElementById('add-product-form');
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = 'Actualizar Producto';

  // Remover el evento de agregar producto si existe
  form.removeEventListener('submit', addProduct);

  // Almacenar el índice en el contexto de la función
  form.onsubmit = function (event) {
    event.preventDefault();

    // Crear un nuevo objeto con los valores del formulario
    const updatedProduct = {
      category: document.getElementById('product-category').value,
      name: document.getElementById('product-name').value,
      price: document.getElementById('product-price').value,
      description: document.getElementById('product-description').value,
      quantity: document.getElementById('product-quantity').value,
      image: product.image // Mantener la imagen previa inicialmente
    };

    // Verificar si se ha seleccionado una nueva imagen
    const imageInput = document.getElementById('product-image');
    if (imageInput.files && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        updatedProduct.image = e.target.result; 

        // Actualizar el producto en el array
        products[index] = updatedProduct;
        localStorage.setItem('products', JSON.stringify(products));

        alert('Producto actualizado correctamente.');
        resetForm(form, submitButton);
        displayProducts();
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      // Si no se seleccionó una nueva imagen, mantener la imagen anterior
      products[index] = updatedProduct; 
      localStorage.setItem('products', JSON.stringify(products));

      alert('Producto actualizado correctamente.');
      resetForm(form, submitButton);
      displayProducts(); 
    }
  };
}

function resetForm(form, submitButton) {
  form.reset(); 
  submitButton.textContent = "Agregar Producto";
}