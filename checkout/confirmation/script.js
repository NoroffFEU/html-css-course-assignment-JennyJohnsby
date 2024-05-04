document.addEventListener("DOMContentLoaded", function () {
    const orderDetailsContainer = document.getElementById("order-details");
  
    // Retrieve order data from localStorage
    const order = JSON.parse(localStorage.getItem("order"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Display order confirmation details
    if (order && cart.length > 0) {
      // Create a div to hold the order summary
      const orderSummary = document.createElement("div");
      orderSummary.innerHTML = "<h2>Your Order</h2>";
  
      // Iterate through each item in the cart
      cart.forEach((product) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart-item");
  
        // Create image element
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.title;
        itemContainer.appendChild(image);
  
        // Create title element
        const title = document.createElement("h3");
        title.innerText = product.title;
        itemContainer.appendChild(title);
  
        // Create price element
        const price = document.createElement("p");
        price.innerText = "Price: $" + product.price.toFixed(2);
        itemContainer.appendChild(price);
  
        orderSummary.appendChild(itemContainer);
      });
  
      // Display total price
      const totalPrice = document.createElement("p");
      totalPrice.innerText = `Total Price: $${order.totalPrice.toFixed(2)}`;
      orderSummary.appendChild(totalPrice);
  
      orderDetailsContainer.appendChild(orderSummary);
    } else {
      // If no order or cart is found, display a message
      orderDetailsContainer.innerHTML = "<p>No order found</p>";
    }
  
    // Clear order data from localStorage
    localStorage.removeItem("order");
  });
  