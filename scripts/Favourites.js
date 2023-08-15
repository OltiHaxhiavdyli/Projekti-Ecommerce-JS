import { Header } from '../components/Header.js';

document.addEventListener("DOMContentLoaded", function() {
  Header();
});

const favoriteProductsList = document.querySelector('.favorite-products');
const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

if (savedProducts.length === 0) {
  const cartEmptyMessage = document.createElement('div');
  cartEmptyMessage.classList.add('cart-empty-message');
  cartEmptyMessage.textContent = 'Your favourites list is empty.';

  const addMoreProductsButton = document.createElement('button');
  addMoreProductsButton.setAttribute('id', 'addMoreProductsButton');
  addMoreProductsButton.textContent = 'Add more favourite products';
  
  addMoreProductsButton.addEventListener('click', function () {
    window.location.href = 'Home.html';
  });

  cartEmptyMessage.appendChild(addMoreProductsButton);
  favoriteProductsList.appendChild(cartEmptyMessage);
} else {
  savedProducts.forEach(product => {
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');
    productContainer.innerHTML = `
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        <a style="text-decoration: none; color: black;" href="Product.html?id=${product.id}">
          ${product.title}
        </a>
      </div>
      <div class="product-price">
        $${product.price.toFixed(2)}
      </div>
      <div class="added-to-cart">
        Added
      </div>
      <div class="button-container">
        <button class="add-to-cart-button js-add-to-cart">
            Add to Cart
          </button>
          <button class="delete-from-favoruites-button js-delete-from-favourites">
            <i class="bi bi-trash-fill"></i>
          </button>
      </div>
    `;

    const deleteButton = productContainer.querySelector('.js-delete-from-favourites');
    deleteButton.addEventListener('click', () => {
      const updatedSavedProducts = savedProducts.filter(savedProduct => savedProduct.id !== product.id);
      localStorage.setItem('savedProducts', JSON.stringify(updatedSavedProducts));
      
      productContainer.remove();
    });

    favoriteProductsList.appendChild(productContainer);
  });
}

document.addEventListener('click', function () {
  const addToCartButtons = document.querySelectorAll('.js-add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const productContainer = event.target.closest('.product-container');
      const productId = productContainer.getAttribute('data-product-id');
      const productTitle = productContainer.querySelector('.product-name').textContent;
      const productPrice = productContainer.querySelector('.product-price').textContent;
      const productImage = productContainer.querySelector('.product-image').getAttribute('src');

      const cartItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage 
      };

      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push(cartItem);

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartLink = document.getElementById('cart-link'); 
  cartLink.textContent = `Cart (${cartItems.length})`;  
  cartLink.href = 'Checkout.html';
});