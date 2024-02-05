
let products = [];


const localDataUrl = 'data.json';


function loadProductsFromLocalFile() {
  return fetch(localDataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos desde el archivo local.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}


let cart = [];

function displayProducts() {
  const productsContainer = document.getElementById('products');


  loadProductsFromLocalFile()
    .then(data => {
      products = data.products;

      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product'); // Agregar la clase 'product'
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Precio: $${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
      });
    });
}


function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
  saveCartToStorage();
}


function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
    saveCartToStorage();
  }
}

function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  cartItemsContainer.innerHTML = '';
  
  let total = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(listItem);
    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);
}


function saveCartToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCartFromStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
}

// Use la libreria Sweet Alert para el mensaje del Pago Exitoso. 
function checkout() {
  Swal.fire({
    title: '¡Gracias por tu compra!',
    text: '¡Tu pedido se ha realizado con éxito!',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  }).then(() => {
    cart = [];
    updateCart();
    saveCartToStorage();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  displayProducts();
  loadCartFromStorage();
});
