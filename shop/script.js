document.addEventListener("DOMContentLoaded", async function () {
  try {
    const loadingIndicator = document.getElementById("loading-indicator");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");

    loadingIndicator.style.display = "block";
    const res = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    const allProducts = await res.json();
    loadingIndicator.style.display = "none";
    const section = document.querySelector("#jacket-info");
    const cartPopup = document.getElementById("cart-popup");
    const toggleCartBtn = document.getElementById("toggle-cart-btn");
    const cartItems = document.getElementById("cart-items");
    const totalPriceDisplay = document.getElementById("total-price");
    const genderFilter = document.getElementById("gender-filter");
    const priceFilter = document.getElementById("price-filter");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    genderFilter.addEventListener("change", updateFilteredProducts);
    priceFilter.addEventListener("input", updateFilteredProducts);

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
    function displayProducts(products) {
      section.innerHTML = "";
      products.forEach((jacket) => {
        const jacketInfo = document.createElement("div");
        jacketInfo.classList.add("jacket-info");
        const imageContainer = document.createElement("a");
        imageContainer.href = `../product/index.html?jacketId=${jacket.id}`;
        imageContainer.classList.add("image-container");
        const image = document.createElement("img");
        image.src = jacket.image;
        image.alt = jacket.title + " image";
        image.classList.add("image");
        imageContainer.appendChild(image);
        jacketInfo.appendChild(imageContainer);

        const titleLink = document.createElement("a");
        titleLink.href = `../product/index.html?jacketId=${jacket.id}`;
        titleLink.innerText = jacket.title;
        titleLink.classList.add("title");

        const title = document.createElement("h3");
        title.appendChild(titleLink);
        jacketInfo.appendChild(title);
        const sizeDropdown = document.createElement("select");
        sizeDropdown.classList.add("size-dropdown");
        jacket.sizes.forEach((size) => {
          const option = document.createElement("option");
          option.value = size;
          option.text = size;
          sizeDropdown.appendChild(option);
        });
        jacketInfo.appendChild(sizeDropdown);
        const baseColor = document.createElement("p");
        baseColor.innerText = "Base Color: " + jacket.baseColor;
        baseColor.classList.add("info");
        jacketInfo.appendChild(baseColor);
        const price = document.createElement("p");
        price.innerText = "Price: $" + jacket.price;
        price.classList.add("info", "price");
        jacketInfo.appendChild(price);
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
          showPopupNotification(`${jacket.title} added to cart!`);
        });
        jacketInfo.appendChild(addToCartBtn);

        section.appendChild(jacketInfo);
      });
    }
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

      const totalPrice = cart.reduce(
        (total, product) => total + product.price,
        0
      );
      totalPriceDisplay.innerText = "Total Price: $" + totalPrice.toFixed(2);
    }

    function showCartPopup() {
      cartPopup.style.display = "block";
    }
    function hideCartPopup() {
      cartPopup.style.display = "none";
    }
    function showPopupNotification(message) {
      popupText.innerText = message;
      popup.style.display = "block";
      setTimeout(function () {
        popup.style.display = "none";
      }, 3000);
    }
    toggleCartBtn.addEventListener("click", function () {
      if (
        cartPopup.style.display === "none" ||
        cartPopup.style.display === ""
      ) {
        showCartPopup();
      } else {
        hideCartPopup();
      }
    });

    displayProducts(allProducts);
    updateCart();
  } catch (error) {
    console.error("Error fetching data:", error);
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "none";
    const section = document.querySelector("#jacket-info");
    const errorHeading = document.createElement("h2")
    errorHeading.innerText = "Looks like RainyDays was hit by a storm, please seek shelter and check back later!"
    section.appendChild (errorHeading)
  }
});
