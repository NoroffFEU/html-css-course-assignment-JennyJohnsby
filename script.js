//This part of the code gets the data for a special internet adress(API)
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
//This part of the code pick 3 products for the list randomly. Then it creates a area where it fills the space with the products name and title. This funticon is called twice.
async function displayRandomProducts() {
  const allProducts = await fetchProducts();
  const productList = document.getElementById("products");
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

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;
    listItem.appendChild(productImage);

    const productTitle = document.createElement("h3");
    productTitle.innerText = product.title;
    listItem.appendChild(productTitle);

    productList.appendChild(listItem);
  });
}
//This code loads 3 products when the webpage is first loaded, then 3 new ones every 5 seconds.
displayRandomProducts();

setInterval(displayRandomProducts, 5000);