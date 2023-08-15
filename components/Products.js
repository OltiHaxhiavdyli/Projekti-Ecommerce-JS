export function Products(products) {
  let productsHTML = '';

  products.forEach(product => {
    productsHTML += `
    <div class="product-container" id="product-list" data-product-id="${product.id}">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        <a style="text-decoration: none; color: black;" href="Product.html?id=${product.id}">
          ${product.title}
        </a>
      </div>

      <div class="product-rating-container">
        <div class="product-rating-count">
          ${product.rating.rate} <i class="bi bi-star-fill"></i>
        </div>
      </div>

      <div class="product-price">
        $${product.price.toFixed(2)}
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <!-- <img src="images/icons/checkmark.png"> -->
        Added
      </div>

      <div class="button-container">
        <button class="add-to-cart-button js-add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
    `
  });
  return productsHTML;
}