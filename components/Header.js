export function Header() {
  const headerElement = document.querySelector('#header');

  headerElement.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-white">
      <div class="container">
        <a class="navbar-brand" href="#" style="color: white;">E-Commerce</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="Home.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="Favourites.html">Favourites</a>
            </li>
            <li class="nav-item nav-item-flex">
              <a class="nav-link" href="Checkout.html" id="cart-link">Cart</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}