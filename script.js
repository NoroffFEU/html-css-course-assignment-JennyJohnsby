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
  const productList = document.getElementById("products");
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block";

  try {
    const allProducts = await fetchProducts();
    productList.innerHTML = "";
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    randomIndices.forEach((index) => {
      const product = allProducts[index];
      const listItem = document.createElement("li");
      const productLink = document.createElement("a");
      productLink.href = "./shop/index.html";
      productLink.classList.add("product-link");
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.title;
      productLink.appendChild(productImage);
      const productTitle = document.createElement("h3");
      productTitle.innerText = product.title;
      productLink.appendChild(productTitle);
      listItem.appendChild(productLink);
      productList.appendChild(listItem);
      listItem.style.opacity = "1";
      listItem.style.transform = "translateY(0)";
    });
    loadingIndicator.style.display = "none";
  } catch (error) {
    console.error("Error displaying products:", error);
    loadingIndicator.style.display = "none";
  }
}
displayRandomProducts();
setInterval(displayRandomProducts, 8000);