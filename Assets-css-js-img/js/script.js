fetch("https://api.noroff.dev/api/v1/rainy-days")
  .then(res => {
    return res.json();
  })
  .then(data => {
    const allProducts = data; // Array of jackets
    const section = document.querySelector("#product-list");
    let currentIndex = 0;

    // Function to display three products at a time with fade-out effect
    const displayThreeProducts = () => {
      // Clear previous products with fade-out effect
      section.classList.add("fade-out");
      setTimeout(() => {
        section.innerHTML = "";
        section.classList.remove("fade-out");

        // Display three products starting from currentIndex
        for (let i = currentIndex; i < currentIndex + 3; i++) {
          if (i >= allProducts.length) {
            break;
          }

          const product = allProducts[i];
          const listItem = document.createElement("li");

          // Create and display the image
          const productImage = document.createElement("img");
          productImage.src = product.image;
          productImage.alt = product.title;
          listItem.appendChild(productImage);

          // Create and display the title
          const productTitle = document.createElement("h3");
          productTitle.innerText = product.title;
          listItem.appendChild(productTitle);

          // Append the list item to the product list
          section.appendChild(listItem);
        }

        // Update currentIndex for the next batch of products
        currentIndex += 3;
        if (currentIndex >= allProducts.length) {
          currentIndex = 0; // Restart from the beginning if reached the end
        }
      }, 500); // Wait for the fade-out animation to complete
    };

    // Initial display
    displayThreeProducts();

    // Rotate products every 5 seconds
    setInterval(displayThreeProducts, 5000);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
