fetch("https://api.noroff.dev/api/v1/rainy-days")
  .then(res => {
    return res.json()
  })
  .then(data => {
    const allProducts = data; // Array of jackets
    
    // Select the section where you want to display the jacket information
    const section = document.querySelector("#jacket-info");

    // Loop through all the jackets and display their information
    allProducts.forEach(jacket => {
      const jacketInfo = document.createElement("div");
      jacketInfo.classList.add("jacket-info");

       // Create and display the image
       const image = document.createElement("img");
       image.src = jacket.image;
       image.alt = jacket.title + " image";
       image.classList.add("image");
       jacketInfo.appendChild(image);
 

      // Create and display the title
      const title = document.createElement("h3");
      title.innerText = jacket.title;
      title.classList.add("title");
      jacketInfo.appendChild(title);

      // Create and display the sizes
      const sizes = document.createElement("p");
      sizes.innerText = "Sizes: " + jacket.sizes.join(", ");
      sizes.classList.add("info");
      jacketInfo.appendChild(sizes);

      // Create and display the base color
      const baseColor = document.createElement("p");
      baseColor.innerText = "Base Color: " + jacket.baseColor;
      baseColor.classList.add("info");
      jacketInfo.appendChild(baseColor);

      // Create and display the price
      const price = document.createElement("p");
      price.innerText = "Price: $" + jacket.price;
      price.classList.add("info", "price");
      jacketInfo.appendChild(price);

      // Create description element (initially hidden)
      const description = document.createElement("p");
      description.innerText = "Description: " + jacket.description;
      description.classList.add("description");
      description.style.display = "none"; // Initially hide description
      jacketInfo.appendChild(description);

     
      // Create "See more" button
      const seeMoreButton = document.createElement("button");
      seeMoreButton.innerText = "See more";
      seeMoreButton.classList.add("see-more-button");
      jacketInfo.appendChild(seeMoreButton);

      // Add event listener to button
      seeMoreButton.addEventListener("click", () => {
        // Toggle visibility of description
        if (description.style.display === "none") {
          description.style.display = "block";
        } else {
          description.style.display = "none";
        }
      });

      // Append the jacket info to the section
      section.appendChild(jacketInfo);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
