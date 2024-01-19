document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.getElementById('products');
    const cartList = document.getElementById('cart');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
  
    // Lista de productos en Stock
    const products = [
      { id: 1, name: 'Manilla Elefante', price: 20 },
      { id: 2, name: 'Manilla Ojo Turco', price: 30 },
      { id: 3, name: 'Manilla Oro Rosa', price: 45 },
      { id: 4, name: 'Manilla 7 nudos', price: 15 },
      { id: 5, name: 'Manilla de Cristal', price: 40 },
      { id: 6, name: 'Manilla 7 esferas', price: 16 },
      { id: 7, name: 'Manilla Perrito', price: 20 },
      { id: 8, name: 'Manilla trenzada', price: 18 },
      { id: 9, name: 'Manilla Oro Golfi', price: 38 },
    ];
  
    // Carga los productos al HTML.
    loadProducts();
  
    // Uso Eventlistener para manejar los clicks en los productos en stock.
    productsContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'), 10);
        const product = products.find(p => p.id === productId);
  
        if (product) {
          // Agrego el producto al carrito y actualizo el html. 
          addToCart(product);
          updateCart();
        }
      }
    });
  
    // Uso Eventlistener para manejar clicks en los elementos del carrito. 
    cartList.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(event.target.getAttribute('data-id'), 10);
        
        // Elimino producto del carrito y actualizo el html. 
        removeFromCart(productId);
        updateCart();
      }
    });
  
    // Mensaje al darle click en pagar.
    checkoutBtn.addEventListener('click', function () {
      alert('¡Gracias por tu compra!');
      clearCart();
      updateCart();
    });
  
    // Función para cargar productos en la página
    function loadProducts() {
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Precio: $${product.price}</p>
          <button class="add-to-cart" data-id="${product.id}">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
      });
    }
  
    // Función para agregar productos al carrito
    function addToCart(product) {
      const cart = getCartFromStorage();
      cart.push(product);
      saveCartToStorage(cart);
    }
  
    // Función para eliminar productos del carrito
    function removeFromCart(productId) {
      let cart = getCartFromStorage();
      cart = cart.filter(product => product.id !== productId);
      saveCartToStorage(cart);
    }
  
    // Función para obtener el carrito desde el almacenamiento local
    function getCartFromStorage() {
      const cartJSON = localStorage.getItem('cart');
      return cartJSON ? JSON.parse(cartJSON) : [];
    }
  
    // Función para guardar el carrito en el almacenamiento local
    function saveCartToStorage(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    }
  
    // Función para limpiar el carrito
    function clearCart() {
      localStorage.removeItem('cart');
    }
  
    // Función para actualizar la visualización del carrito en la página
    function updateCart() {
      const cart = getCartFromStorage();
      cartList.innerHTML = '';
  
      let total = 0;
      cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span>${product.name} - $${product.price}</span>
          <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
        `;
        cartList.appendChild(cartItem);
        total += product.price;
      });
  
      cartTotalElement.textContent = total;
    }
  
    // Actualizar la visualización del carrito al cargar la página
    updateCart();
  });
  