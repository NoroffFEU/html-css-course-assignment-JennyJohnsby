document.addEventListener("DOMContentLoaded", async function() {
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    const data = await res.json();
    let allProducts = data;
    const section = document.querySelector("#jacket-info");
    function displayProducts(products) {
      console.log("Displaying products:", products);
      section.innerHTML = '';
      products.forEach(jacket => {
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
        
        const title = document.createElement("h3");
        title.innerText = jacket.title;
        title.classList.add("title");
        jacketInfo.appendChild(title);

        const sizes = document.createElement("p");
        sizes.innerText = "Sizes: " + jacket.sizes.join(", ");
        sizes.classList.add("info");
        jacketInfo.appendChild(sizes);
        
        const baseColor = document.createElement("p");
        baseColor.innerText = "Base Color: " + jacket.baseColor;
        baseColor.classList.add("info");
        jacketInfo.appendChild(baseColor);

        const price = document.createElement("p");
        price.innerText = "Price: $" + jacket.price;
        price.classList.add("info", "price");
        jacketInfo.appendChild(price);
        section.appendChild(jacketInfo);
      });
    }
    displayProducts(allProducts);
    const genderFilter = document.getElementById("gender-filter");
    const priceFilter = document.getElementById("price-filter");
    genderFilter.addEventListener("change", updateFilteredProducts);
    priceFilter.addEventListener("input", updateFilteredProducts);
    function updateFilteredProducts() {
      const selectedGender = genderFilter.value;
      const selectedPrice = priceFilter.value;
      console.log("Selected gender:", selectedGender);
      console.log("Selected price:", selectedPrice);
      let filteredProducts = allProducts.filter(product => {
        if (selectedGender !== "all" && product.gender !== selectedGender) {
          return false;
        }
        if (product.price > selectedPrice) {
          return false;
        }
        return true;
      });
      console.log("Filtered products:", filteredProducts);
      displayProducts(filteredProducts);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

