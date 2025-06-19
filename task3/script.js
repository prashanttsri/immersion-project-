document.addEventListener('DOMContentLoaded', () => {
  fetchAllProducts();

  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") searchProduct();
  });

  document.getElementById("priceRange").addEventListener("input", () => {
    document.getElementById("priceValue").textContent = document.getElementById("priceRange").value;
    filterProducts();
  });
});

let allProducts = [];

async function fetchAllProducts() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '<p>Loading products...</p>';

  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) throw new Error("Failed to load products");

    const data = await response.json();
    allProducts = data.products;
    populateBrandFilter(allProducts);
    displayProducts(allProducts);

  } catch (error) {
    console.error(error);
    productList.innerHTML = "<p>⚠️ Could not load products. Try again later.</p>";
  }
}

function searchProduct() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (query === '') return displayProducts(allProducts);
  const filtered = allProducts.filter(p => p.title.toLowerCase().includes(query));
  displayProducts(filtered);
}

function sortProducts() {
  const sortValue = document.getElementById('sort').value;
  let sorted = [...allProducts];

  if (sortValue === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}

function populateBrandFilter(products) {
  const brandFilter = document.getElementById("brandFilter");
  const brands = Array.from(new Set(products.map(p => p.brand)));
  brands.forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandFilter.appendChild(opt);
  });
}

function filterProducts() {
  const brand = document.getElementById("brandFilter").value;
  const maxPrice = parseFloat(document.getElementById("priceRange").value);
  let filtered = [...allProducts];

  if (brand !== "all") {
    filtered = filtered.filter(p => p.brand === brand);
  }
  filtered = filtered.filter(p => p.price <= maxPrice);

  displayProducts(filtered);
}

function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = "<p>No products match your filters or search.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <span>💰 Price: $${product.price}</span>
      <span>⭐ Rating: ${product.rating}</span>
      <span>🏷️ Brand: ${product.brand}</span>
    `;

    productList.appendChild(card);
  });
}
