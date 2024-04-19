document.addEventListener("DOMContentLoaded", async function() {
  try {
      const loadingIcon = document.getElementById('loading-icon');
      loadingIcon.style.display = 'block';

      const params = new URLSearchParams(window.location.search);
      const jacketId = params.get('jacketId');

      const res = await fetch(`https://api.noroff.dev/api/v1/rainy-days/${jacketId}`);
      const jacketData = await res.json();

      const jacketDetails = document.getElementById('jacket-details');
      jacketDetails.innerHTML = `
          <h2>${jacketData.title}</h2>
          <img src="${jacketData.image}" alt="${jacketData.title} image">
          <p>Description: ${jacketData.description}</p>
          <p>Gender: ${jacketData.gender}</p>
          <p>Sizes: ${jacketData.sizes.join(', ')}</p>
          <p>Price: $${jacketData.price}</p>
      `;

      loadingIcon.style.display = 'none';
  } catch (error) {
      console.error('Error fetching jacket data:', error);
  }
});
