async function fetchProducts() {
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
async function displayRandomProducts() {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block";
  try {
    const allProducts = await fetchProducts();
    const productList = document.getElementById("products");
    productList.innerHTML = "";
    const randomIndices = [];
    while (randomIndices.length < 4) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    randomIndices.forEach((index) => {
      const product = allProducts[index];
      const listItem = document.createElement("li");
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.title;
      listItem.appendChild(productImage);
      const productTitle = document.createElement("h3");
      productTitle.innerText = product.title;
      listItem.appendChild(productTitle);
      productList.appendChild(listItem);
    });
    loadingIndicator.style.display = "none";
    const carousel = document.querySelector(".carousel");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let scrollAmount = 0;
    const step = 500;
    prevButton.addEventListener("click", function () {
      scrollAmount -= step;
      if (scrollAmount < 0) scrollAmount = 0;
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
    nextButton.addEventListener("click", function () {
      scrollAmount += step;
      if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = carousel.scrollWidth - carousel.clientWidth;
      }
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  } catch (error) {
    console.error("Error displaying products:", error);
    loadingIndicator.style.display = "none";
  }
}
displayRandomProducts();
setInterval(displayRandomProducts, 5000);
