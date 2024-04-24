document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch product data from the API
    const res = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    let allProducts = await res.json(); // Store all products in a variable that can be modified

    // Select required elements
    const section = document.querySelector("#jacket-info");
    const cartPopup = document.getElementById("cart-popup");
    const toggleCartBtn = document.getElementById("toggle-cart-btn");
    const cartItems = document.getElementById("cart-items");
    const totalPriceDisplay = document.getElementById("total-price");
    const genderFilter = document.getElementById("gender-filter");
    const priceFilter = document.getElementById("price-filter");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Retrieve cart items from local storage, or initialize as an empty array if not found
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to save cart to local storage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Function to display products on the page
    function displayProducts(products) {
      section.innerHTML = "";
      products.forEach((jacket) => {
        const jacketInfo = document.createElement("div");
        jacketInfo.classList.add("jacket-info");

        // Create image container with link to product page
        const imageContainer = document.createElement("a");
        imageContainer.href = `../product/index.html?jacketId=${jacket.id}`;
        imageContainer.classList.add("image-container");

        // Create image element
        const image = document.createElement("img");
        image.src = jacket.image;
        image.alt = jacket.title + " image";
        image.classList.add("image");
        imageContainer.appendChild(image);
        jacketInfo.appendChild(imageContainer);

        // Create title element with click event to navigate to product page
        const title = document.createElement("h3");
        title.innerText = jacket.title;
        title.classList.add("title");
        title.addEventListener("click", function () {
          navigateToProduct(jacket.id);
        });
        jacketInfo.appendChild(title);

        // Create size dropdown menu
        const sizeDropdown = document.createElement("select");
        sizeDropdown.classList.add("size-dropdown");
        jacket.sizes.forEach((size) => {
          const option = document.createElement("option");
          option.value = size;
          option.text = size;
          sizeDropdown.appendChild(option);
        });
        jacketInfo.appendChild(sizeDropdown);

        // Create element for base color
        const baseColor = document.createElement("p");
        baseColor.innerText = "Base Color: " + jacket.baseColor;
        baseColor.classList.add("info");
        jacketInfo.appendChild(baseColor);

        // Create element for price
        const price = document.createElement("p");
        price.innerText = "Price: $" + jacket.price;
        price.classList.add("info", "price");
        jacketInfo.appendChild(price);

        // Create "Add to Cart" button
        const addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.addEventListener("click", function () {
          const selectedSize = sizeDropdown.value;
          if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
          }
          const productToAdd = { ...jacket, size: selectedSize };
          cart.push(productToAdd);
          saveCart();
          updateCart();
        });
        jacketInfo.appendChild(addToCartBtn);

        section.appendChild(jacketInfo);
      });
    }

    // Function to update the cart display
    function updateCart() {
      cartItems.innerHTML = "";

      cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productTitle = document.createElement("span");
        productTitle.innerText = product.title + " - Size: " + product.size;
        productTitle.classList.add("product-title");
        cartItem.appendChild(productTitle);

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", function () {
          cart.splice(index, 1);
          saveCart();
          updateCart();
        });
        cartItem.appendChild(removeBtn);

        cartItems.appendChild(cartItem);
      });

      const totalPrice = cart.reduce((total, product) => total + product.price, 0);
      totalPriceDisplay.innerText = "Total Price: $" + totalPrice.toFixed(2);
    }

    // Function to navigate to product page
    function navigateToProduct(productId) {
      window.location.href = `../product/index.html?jacketId=${productId}`;
    }

    // Function to show cart popup
    function showCartPopup() {
      cartPopup.style.display = "block";
    }

    // Function to hide cart popup
    function hideCartPopup() {
      cartPopup.style.display = "none";
    }

    // Event listener for toggle cart button
    toggleCartBtn.addEventListener("click", function () {
      if (cartPopup.style.display === "none" || cartPopup.style.display === "") {
        showCartPopup();
      } else {
        hideCartPopup();
      }
    });

    // Filter products based on gender and price
    genderFilter.addEventListener("change", updateFilteredProducts);
    priceFilter.addEventListener("input", updateFilteredProducts);

    // Function to update the displayed products based on the selected gender and price range
    function updateFilteredProducts() {
      const selectedGender = genderFilter.value;
      const selectedPrice = parseInt(priceFilter.value);

      let filteredProducts = allProducts.filter((product) => {
        if (selectedGender !== "all" && product.gender !== selectedGender) {
          return false;
        }
        if (product.price > selectedPrice) {
          return false;
        }
        return true;
      });

      displayProducts(filteredProducts);
    }

    // Event listener for checkout button
    checkoutBtn.addEventListener("click", function () {
      window.location.href = "../checkout/index.html"; // Redirect to checkout page
    });

    // Initial display of products and cart
    displayProducts(allProducts);
    updateCart();

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
