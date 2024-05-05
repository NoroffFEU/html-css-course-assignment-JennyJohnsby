document.addEventListener("DOMContentLoaded", function () {
  const orderDetailsContainer = document.getElementById("order-details");

  const order = JSON.parse(localStorage.getItem("order"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (order && cart.length > 0) {
    const orderSummary = document.createElement("div");
    orderSummary.innerHTML = "<h2>Your Order</h2>";

    cart.forEach((product) => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("cart-item");

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      itemContainer.appendChild(image);

      const title = document.createElement("h3");
      title.innerText = product.title;
      itemContainer.appendChild(title);

      const price = document.createElement("p");
      price.innerText = "Price: $" + product.price.toFixed(2);
      itemContainer.appendChild(price);

      orderSummary.appendChild(itemContainer);
    });

    const totalPrice = document.createElement("p");
    totalPrice.innerText = `Total Price: $${order.totalPrice.toFixed(2)}`;
    orderSummary.appendChild(totalPrice);

    orderDetailsContainer.appendChild(orderSummary);
  } else {
    orderDetailsContainer.innerHTML = "<p>No order found</p>";
  }

  localStorage.removeItem("order");
});
