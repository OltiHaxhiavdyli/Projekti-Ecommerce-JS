document.addEventListener('DOMContentLoaded', function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const orderSummary = document.querySelector('.order-summary');

  if (cartItems.length === 0) {
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.classList.add('empty-cart-message');
    emptyCartMessage.innerHTML = `
      Your cart is empty.
      <button class="add-products-button button-primary">
        Add more products
      </button>
    `;
    orderSummary.appendChild(emptyCartMessage);

    const addProductsButton = orderSummary.querySelector('.add-products-button');
    addProductsButton.addEventListener('click', function () {
      window.location.href = 'Home.html';
    });
  } else {
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item-container');
      cartItemElement.innerHTML = `
        <div class="cart-item-details-grid">
          <img class="product-image" src="${item.image}">
          <div class="cart-item-details">
            <div class="product-name">
              ${item.title}
            </div>
            <div class="product-price">
              ${item.price}
            </div>
            <div class="product-quantity">
              <button class="delete-item-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      `;
      orderSummary.appendChild(cartItemElement);

      const deleteButton = cartItemElement.querySelector('.delete-item-button');
      deleteButton.addEventListener('click', function() {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.title === item.title);
        if (itemIndex !== -1) {
          cartItems.splice(itemIndex, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          orderSummary.removeChild(cartItemElement);
          cartItemCountElement.textContent = cartItems.length;
        }
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemCountElement = document.getElementById('cart-item-count');
  const cartItemCountElements = document.getElementById('cart-item-counts');

  cartItemCountElement.textContent = cartItems.length === 1 ? '1 item' : `${cartItems.length} items`;;
  cartItemCountElements.textContent = cartItems.length;

  const orderSummary = document.querySelector('.order-summary');

  const itemsTotalElement = document.getElementById('items-total');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const orderTotalElement = document.getElementById('order-total');

  let itemsTotal = 0;

  cartItems.forEach(item => {
    itemsTotal += parseFloat(item.price.replace('$', ''));
  });

  const taxRate = 0.1;

  const subtotal = itemsTotal;
  const tax = subtotal * taxRate;
  const orderTotal = subtotal + tax;

  if (itemsTotalElement) {
    itemsTotalElement.innerHTML = `$${itemsTotal.toFixed(2)}`;
  }

  if (subtotalElement) {
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }

  if (taxElement) {
    taxElement.innerHTML = `$${tax.toFixed(2)}`;
  }

  if (orderTotalElement) {
    orderTotalElement.innerHTML = `$${orderTotal.toFixed(2)}`;
  }
});