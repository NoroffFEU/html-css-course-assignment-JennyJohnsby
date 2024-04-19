        async function fetchData() {
            try {
                const response = await fetch('https://api.noroff.dev/api/v1/rainy-days');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Function to add item to cart
        function addToCart(item) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }

        // Function to display cart items
        function displayCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartDiv = document.getElementById('cart');
            cartDiv.innerHTML = '<h2>Cart</h2>';
            cart.forEach(item => {
                cartDiv.innerHTML += `<p>${item.name} - ${item.price}</p>`;
            });
            displaySummary();
        }

        // Function to display cart summary
        function displaySummary() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const summaryDiv = document.getElementById('summary');
            let total = 0;
            cart.forEach(item => {
                total += item.price;
            });
            summaryDiv.innerHTML = `<h2>Summary</h2><p>Total: ${total}</p>`;
        }

        // Function to handle purchase button click
        document.getElementById('purchaseBtn').addEventListener('click', () => {
            // Redirect to checkout confirmation page
            window.location.href = 'checkout-confirmation.html';
        });

        // Load data and display cart on page load
        window.onload = async () => {
            const data = await fetchData();
            displayProducts(data);
        };

        // Function to display products with "Add to Cart" button
        function displayProducts(products) {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = '<h2>Products</h2>';
            products.forEach(product => {
                const productElem = document.createElement('div');
                productElem.innerHTML = `<p>${product.name} - ${product.price} <button onclick="addToCart(${JSON.stringify(product)})">Add to Cart</button></p>`;
                productDiv.appendChild(productElem);
            });
            document.body.appendChild(productDiv);
        }