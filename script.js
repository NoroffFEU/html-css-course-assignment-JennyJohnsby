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

async function fetchRandomImages() {
  try {
    const res = await fetch("https://api.noroff.dev/api/v1/image-gallery");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

async function displayRandomProducts() {
  const loadingIndicator = document.getElementById("loading");
  loadingIndicator.style.display = "block";
  try {
    const allProducts = await fetchProducts();
    const productList = document.getElementById("products");
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    productList.classList.add("hidden");
    setTimeout(() => {
      productList.innerHTML = randomIndices.map((index) => {
        const product = allProducts[index];
        return `
          <li>
            <a href="./shop/index.html" class="product-link">
              <img src="${product.image}" alt="${product.title}">
              <h3>${product.title}</h3>
            </a>
          </li>
        `;
      }).join("");
      productList.classList.remove("hidden");
      void productList.offsetWidth;
      const products = productList.querySelectorAll("li");
      products.forEach((product) => {
        product.style.opacity = "1";
        product.style.transform = "translateY(0)";
      });
    }, 10);
    loadingIndicator.style.display = "none";
  } catch (error) {
    console.error("Error displaying products:", error);
    loadingIndicator.style.display = "none";
  }
}

async function displayRandomImages() {
  const imgGallery = document.querySelector(".carousel");
  try {
    const imagesData = await fetchRandomImages();
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * imagesData.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    imgGallery.innerHTML = randomIndices.map((index) => {
      const image = imagesData[index];
      return `<img src="${image.url}" alt="${image.alt}">`;
    }).join("");
  } catch (error) {
    console.error("Error displaying random images:", error);
  }
}

function setupCarousel() {
  const carousel = document.querySelector(".carousel");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  let scrollAmount = 0; // Changed initial value to 0
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
}

async function setup() {
  await displayRandomProducts();
  await displayRandomImages();
  setupCarousel();
}

setup();
setInterval(async () => {
  await displayRandomProducts();
  await displayRandomImages();
}, 5000);
