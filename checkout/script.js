document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkout-form");
    const cartSummary = document.getElementById("cart-summary");
  
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Display cart summary
    cartSummary.innerHTML = `
      <h2>Order Summary</h2>
    `;
  
    // Iterate over cart items and add them to the summary
    cart.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("cart-product");
  
      // Product image
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;
      productElement.appendChild(image);
  
      // Product details
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
  
    // Calculate total price
    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  
    // Add total items and total price to the summary
    const totalItems = document.createElement("p");
    totalItems.innerText = `Total Items: ${cart.length}`;
    cartSummary.appendChild(totalItems);
  
    const totalPriceElement = document.createElement("p");
    totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    cartSummary.appendChild(totalPriceElement);
  
    checkoutForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get form values
      const name = document.getElementById("name").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const zipcode = document.getElementById("zipcode").value;
      const country = document.getElementById("country").value;
  
      // Create order object
      const order = {
        name: name,
        address: address,
        city: city,
        zipcode: zipcode,
        country: country,
        totalPrice: totalPrice // Add total price to order object
      };
  
      // Save order data to localStorage
      localStorage.setItem("order", JSON.stringify(order));
  
      // Redirect to payment page
      window.location.href = "payment.html";
    });
  });
  