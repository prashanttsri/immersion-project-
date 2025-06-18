document.addEventListener('DOMContentLoaded', () => {
  fetchAllProducts(); // Load all products on start

  // Trigger search on Enter key press
  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchProduct();
    }
  });
});

async function fetchAllProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '<p>Loading products...</p>';

  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error("Failed to load products");

    const data = await response.json();
    displayProducts(data.products);

  } catch (error) {
    console.error(error);
    productList.innerHTML = "<p>⚠️ Could not load products. Try again later.</p>";
  }
}

async function searchProduct() {
  const query = document.getElementById('searchInput').value.trim();
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  if (query === '') {
    alert("❗ Please enter a product name to search.");
    fetchAllProducts(); // fallback: load all products again
    return;
  }

  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Search failed");

    const data = await response.json();
    if (data.products.length === 0) {
      productList.innerHTML = "<p>No products found matching your search.</p>";
    } else {
      displayProducts(data.products);
    }

  } catch (error) {
    console.error(error);
    productList.innerHTML = "<p>⚠️ Error searching products.</p>";
  }
}

function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <span>💰 Price: $${product.price}</span>
      <span>🏷️ Brand: ${product.brand}</span>
    `;

    productList.appendChild(card);
  });
}
