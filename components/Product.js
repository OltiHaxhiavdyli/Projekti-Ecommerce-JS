export function Product(product) {
  return `
    <div class="column left-column">
        <img class="image" src="${product.image}" alt="Product Image">
    </div>
    <div class="column right-column">
        <div class="product-info">
            <p class="title">${product.title}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <p class="category">Category: ${product.category}</p>
            <p class="rating">Rating: ${product.rating.rate} (${product.rating.count} reviews)</p>
        </div>
        <div class="button-container">
        <button class="add-to-favoruites-button js-add-to-favourites">
          <i class="bi bi-heart-fill"></i>
        </button>
        <button id="copyButton">
          <i class="bi bi-share-fill"></i>
        </button>
      </div>
    </div>
  `;
}