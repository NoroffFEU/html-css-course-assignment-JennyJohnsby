document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch data from API
    const res = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    const data = await res.json();
    let allProducts = data;
    const section = document.querySelector("#jacket-info");
    const cart = [];

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

        // Create dropdown menu for sizes
        const sizes = document.createElement("select");
        sizes.classList.add("sizes");
        jacket.sizes.forEach((size) => {
          const option = document.createElement("option");
          option.value = size;
          option.text = size;
          sizes.appendChild(option);
        });
        jacketInfo.appendChild(sizes);

        // Create element for base color
        const baseColor = document.createElement("p");
        baseColor.innerText = "Base Color: " + jacket.baseColor;
        baseColor.classList.add("info");
        jacketInfo.appendChild(baseColor);

        // Create element for price with click event to navigate to product page
        const price = document.createElement("p");
        price.innerText = "Price: $" + jacket.price;
        price.classList.add("info", "price");
        price.addEventListener("click", function () {
          navigateToProduct(jacket.id);
        });
        jacketInfo.appendChild(price);

        // Create "Add to Cart" button with click event to add product to cart
        const addToCartBtn = document.createElement("button");
        addToCartBtn.innerText = "Add to Cart";
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.addEventListener("click", function () {
          const selectedSize = sizes.value;
          if (selectedSize === "") {
            alert("Please select a size before adding to cart.");
            return;
          }
          addToCart({ ...jacket, size: selectedSize });
        });
        jacketInfo.appendChild(addToCartBtn);

        section.appendChild(jacketInfo);
      });
    }

    // Display all products initially
    displayProducts(allProducts);

    // Filter products based on gender and price
    const genderFilter = document.getElementById("gender-filter");
    const priceFilter = document.getElementById("price-filter");

    genderFilter.addEventListener("change", updateFilteredProducts);
    priceFilter.addEventListener("input", updateFilteredProducts);

    function updateFilteredProducts() {
      const selectedGender = genderFilter.value;
      const selectedPrice = priceFilter.value;

      let filteredProducts = allProducts.filter((product) => {
        if (selectedGender !== "all" && product.gender !== selectedGender) {
          return false;
        }
        if (product.price > selectedPrice) {
          return false;
        }
        return true;
      });

      // Display filtered products
      displayProducts(filteredProducts);
    }

    // Add product to cart
    function addToCart(product) {
      cart.push(product);
      updateCartSummary();
    }

    // Remove product from cart
    function removeFromCart(productIndex) {
      cart.splice(productIndex, 1);
      updateCartSummary();
    }

    // Update cart summary
    function updateCartSummary() {
      const cartSummary = document.getElementById("cart-items");
      cartSummary.innerHTML = "";

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
          removeFromCart(index);
        });
        cartItem.appendChild(removeBtn);

        cartSummary.appendChild(cartItem);
      });

      const totalPriceDisplay = document.getElementById("total-price");
      const totalPrice = cart.reduce(
        (total, product) => total + product.price,
        0
      );
      totalPriceDisplay.innerText = "Total Price: $" + totalPrice.toFixed(2);
    }

    // Navigate to product page
    function navigateToProduct(productId) {
      window.location.href = `../product/index.html?jacketId=${productId}`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});