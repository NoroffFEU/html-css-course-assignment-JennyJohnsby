document.addEventListener("DOMContentLoaded", function () {
  const checkoutForm = document.getElementById("checkout-form");
  const cartSummary = document.getElementById("cart-summary");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartSummary.innerHTML = `
    <h1>Order Summary</h1>
  `;
  function renderCartItems() {
    cart.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("cart-product");
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      productElement.appendChild(image);
      const details = document.createElement("div");
      details.classList.add("product-details");
      const title = document.createElement("h3");
      title.innerText = product.title;
      details.appendChild(title);
      const size = document.createElement("p");
      size.innerText = "Size: " + product.size;
      details.appendChild(size);
      const price = document.createElement("p");
      price.innerText = "Price: $" + product.price.toFixed(2);
      details.appendChild(price);
      productElement.appendChild(details);
      cartSummary.appendChild(productElement);
    });
  }
  renderCartItems();
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const totalItems = document.createElement("p");
  totalItems.innerText = `Total Items: ${cart.length}`;
  cartSummary.appendChild(totalItems);
  const totalPriceElement = document.createElement("p");
  totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
  cartSummary.appendChild(totalPriceElement);
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const zipcode = document.getElementById("zipcode").value;
    const country = document.getElementById("country").value;
    const order = {
      name: name,
      address: address,
      city: city,
      zipcode: zipcode,
      country: country,
      totalPrice: totalPrice,
    };
    localStorage.setItem("order", JSON.stringify(order));
    window.location.href = "../checkout/confirmation/index.html";
  });
});
