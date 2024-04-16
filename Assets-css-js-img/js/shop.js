document.addEventListener("DOMContentLoaded", function() {
  // Fetch jackets data
  fetch("https://api.noroff.dev/api/v1/rainy-days")
    .then(res => res.json())
    .then(data => {
      const allProducts = data;
      const section = document.querySelector("#jacket-info");

      allProducts.forEach(jacket => {
        const jacketInfo = document.createElement("div");
        jacketInfo.classList.add("jacket-info");

        //The image
        const image = document.createElement("img");
        image.src = jacket.image;
        image.alt = jacket.title + " image";
        image.classList.add("image");
        image.addEventListener("click", function() {
          window.location.href = "jacket.html";
        });
        jacketInfo.appendChild(image);

        //The title
        const title = document.createElement("h3");
        title.innerText = jacket.title;
        title.classList.add("title");
        title.addEventListener("click", function() {
          window.location.href = "jacket.html";
        });
        jacketInfo.appendChild(title);

        //The sizes
        const sizes = document.createElement("p");
        sizes.innerText = "Sizes: " + jacket.sizes.join(", ");
        sizes.classList.add("info");
        sizes.addEventListener("click", function() {
          window.location.href = "jacket.html";
        });
        jacketInfo.appendChild(sizes);

        //The base color
        const baseColor = document.createElement("p");
        baseColor.innerText = "Base Color: " + jacket.baseColor;
        baseColor.classList.add("info");
        baseColor.addEventListener("click", function() {
          window.location.href = "jacket.html";
        });
        jacketInfo.appendChild(baseColor);

        //The price
        const price = document.createElement("p");
        price.innerText = "Price: $" + jacket.price;
        price.classList.add("info", "price");
        price.addEventListener("click", function() {
          window.location.href = "jacket.html";
        });
        jacketInfo.appendChild(price);

        section.appendChild(jacketInfo);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
