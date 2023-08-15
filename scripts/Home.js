import { Products } from '../components/Products.js';
import { Header } from '../components/Header.js';
let products;

// Products
axios.get('https://fakestoreapi.com/products').then(resp => {
  if (resp.status === 200) {
    products = resp.data;
    document.querySelector('.products').innerHTML = Products(products);
  }
});

// Search
const searchInput = document.querySelector('.search input');
if (searchInput) {
  searchInput.addEventListener('keyup', async e => {
    e.preventDefault();

    if (e.keyCode === 13) {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        if (response.status === 200) {
          const products = response.data;
          const searchText = e.target.value.toLowerCase();
          
          const matchedProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchText)
          );

          const productsContainer = document.querySelector('.products');
          if (matchedProducts.length === 0) {
            productsContainer.innerHTML = 'No matching products found.';
          } else {
            productsContainer.innerHTML = Products(matchedProducts);
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  Header();

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const sortingSelect = document.getElementById('sort-select');

  sortingSelect.addEventListener('change', function () {
    const selectedValue = sortingSelect.value;

    const sortedProducts = [...products]; // shallow copy

    if (selectedValue === 'cheapest') {
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedValue === 'expensive') {
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      sortedProducts.sort((a, b) => a.id - b.id);
    }

    document.querySelector('.products').innerHTML = Products(sortedProducts);
  });
});

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
  cartLink.innerHTML = `Cart (${cartItems.length})`;  
  cartLink.href = 'Checkout.html';
});