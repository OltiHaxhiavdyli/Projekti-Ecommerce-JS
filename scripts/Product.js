import { Product } from '../components/Product.js';
import { Header } from '../components/Header.js';

document.addEventListener("DOMContentLoaded", function() {
  Header();
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let product = {};

axios.get(`https://fakestoreapi.com/products/${id}`)
  .then(resp => {
    if (resp.status === 200) {
      product = resp.data;
      document.querySelector('.product').innerHTML = Product(product);
    }
  })
  .catch(error => {
    console.error("Error fetching product:", error);
});

document.addEventListener('click', (event) => {
  if (event.target.matches('.js-add-to-favourites')) {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

    if (!savedProducts.some(savedProduct => savedProduct.id === product.id)) {
      savedProducts.push(product);
      localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
      alert('Product added to favorites!');
    } else {
      alert('Product is already in favorites!');
    }
  }
});

document.addEventListener('click', function (event) {
  if (event.target.id === 'copyButton') {
    navigator.clipboard.writeText(window.location.href)
      .then(function () {
        alert('Copying to clipboard was successful!');
      })
      .catch(function (err) {
        alert('Could not copy text: ' + err);
      });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartLink = document.getElementById('cart-link'); 
  cartLink.textContent = `Cart (${cartItems.length})`;  
  cartLink.href = 'Checkout.html';
});