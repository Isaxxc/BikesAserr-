let carrito = [];
let subtotal = 0;
let total = 0;
let iva = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.name === producto.name);

    if (productoExistente) {
        if (productoExistente.quantity < producto.quantity) {
            productoExistente.quantity++;
        } else {
            alert('No hay más stock disponible para este producto');
        }
    } else {
        carrito.push({ ...producto, quantity: 1 });
    }

    subtotal += parseFloat(producto.price);
    iva = subtotal * 0.13;
    total = subtotal + iva;
    actualizarCarrito();
}

// Actualizar la visualización del carrito
function actualizarCarrito() {
    const cartBtn = document.getElementById('cart-btn');
    const cartItems = document.getElementById('cart-items');
    const cartSubTotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');

    cartBtn.innerText = `Carrito (${carrito.length})`;
    cartItems.innerHTML = '';

    carrito.forEach(item => {
        let li = document.createElement('li');
        
        // Imagen del producto
        let img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.style.width = '50px'; 
        img.style.height = '50px';

        // Detalles del producto
        let text = document.createTextNode(` - ${item.name} - ₡${item.price} - Cantidad: ${item.quantity}`);

        // Agregar la imagen y el texto al elemento de lista
        li.appendChild(img);
        li.appendChild(text);
        
        cartItems.appendChild(li);
    });

    cartSubTotal.innerText = subtotal.toFixed(2);
    cartTax.innerText = iva.toFixed(2);
    cartTotal.innerText = total.toFixed(2);
}

// Mostrar/Ocultar carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.getElementById('cart-btn'); // Botón para mostrar el carrito
    const overlay = document.getElementById('overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart'); // Botón de cierre

    // Agregar evento para el botón del carrito
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    // Ocultar carrito al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open'); 
        overlay.classList.remove('active'); //
    });

        // Ocultar carrito al hacer clic en el botón de cierre
        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open'); 
            overlay.classList.remove('active');
        });

});

// Función para finalizar la compra
function finalizarCompra() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    let productos = JSON.parse(localStorage.getItem('products')) || [];
    let compraValida = true;

    carrito.forEach(item => {
        let producto = productos.find(p => p.name === item.name);
        if (producto) {
            if (producto.quantity >= item.quantity) {
                producto.quantity -= item.quantity;
            } else {
                compraValida = false;
                alert(`No hay suficiente stock para ${item.name}`);
            }
        }
    });

    if (compraValida) {
        let comprasRealizadas = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];
        let nuevaCompra = {
            usuario: loggedInUser,
            productos: carrito,
            total: total.toFixed(2),
            fecha: new Date().toLocaleString()
        };

        comprasRealizadas.push(nuevaCompra);
        localStorage.setItem('comprasRealizadas', JSON.stringify(comprasRealizadas));
        localStorage.setItem('products', JSON.stringify(productos));

        carrito = [];
        subtotal = 0;
        iva = 0;
        total = 0;
        actualizarCarrito();

        alert('Compra realizada con éxito.');
        loadProducts();
    }
}

// Evento para el botón de finalizar compra, solo agregado una vez
document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (!loggedInUser) {
                alert('Debes iniciar sesión para realizar una compra.');
                window.location.href = '/HTML/login.html';
                return;
            }
            finalizarCompra();
        });
    } else {
        console.error('El elemento checkout-btn no existe en el DOM');
    }
    
    loadProducts();
});

function verificarRolUsuario() {
    let usuarioActual = localStorage.getItem('loggedInUser');

    if (usuarioActual === 'admin') {
        document.getElementById('admin-options').style.display = 'block';
    } else {
        document.getElementById('admin-options').style.display = 'none';
    }
}

function loadProducts() {
    const productList = document.getElementById('product-list');

    if (!productList) {
        //console.error('El contenedor "product-list" no se encontró en el DOM');
        return;
    }

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
            <p>Precio: ₡${product.price}</p>
            <p>Cantidad disponible: ${product.quantity}</p>
            ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
            <button class="add-to-cart-btn" ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>
        `;

        productList.appendChild(productCard);
    });

    // Agregar eventos a los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-index');
            const selectedProduct = products[productIndex];
            agregarAlCarrito(selectedProduct);
        });
    });
}


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
        <p>Precio: ₡${product.price}</p>
        <p>Cantidad disponible: ${product.quantity}</p>
        ${product.quantity === '0' ? '<p class="sold-out">PRODUCTO AGOTADO</p>' : ''}
        <button class="add-to-cart-btn" ${product.quantity === '0' ? 'disabled' : ''} data-index="${index}">Agregar al carrito</button>`;

        productList.appendChild(productCard);
    });

    // Agregar eventos a los botones "Agregar al carrito"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-index');
            const selectedProduct = products[productIndex];
            agregarAlCarrito(selectedProduct);
        });
    });
}