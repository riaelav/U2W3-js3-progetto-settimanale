const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzhhMDFjMjUwNDAwMTUxYWI2NGQiLCJpYXQiOjE3NDYxNzIwNjQsImV4cCI6MTc0NzM4MTY2NH0.02Vc7s2513ZyFdIKVrDWeUYfHuHd80llc9QhaKnH6SQ";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const loading = document.getElementById("loading");
const container = document.getElementById("details-container");

const showProductDetails = (product) => {
  container.innerHTML = "";

  const img = document.createElement("img");
  img.src = product.imageUrl;
  img.alt = product.name;
  img.className = "product-img mb-4 rounded shadow-sm";

  const title = document.createElement("h2");
  title.className = "mb-2";
  title.textContent = product.name;

  const brand = document.createElement("p");
  brand.className = "mb-1";
  brand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

  const price = document.createElement("p");
  price.className = "mb-1";
  price.innerHTML = `<strong>Prezzo:</strong> €${product.price}`;

  const description = document.createElement("p");
  description.className = "mb-3";
  description.innerHTML = `<strong>Descrizione:</strong><br>${product.description}`;

  const backBtn = document.createElement("a");
  backBtn.href = "index.html";
  backBtn.className = "btn btn-rosa";
  backBtn.textContent = "Torna alla Home";

  container.appendChild(img);
  container.appendChild(title);
  container.appendChild(brand);
  container.appendChild(price);
  container.appendChild(description);
  container.appendChild(backBtn);
};

const fetchProduct = () => {
  if (!productId) {
    container.innerHTML = `<div class="alert alert-danger">ID prodotto mancante.</div>`;
    return;
  }

  loading.classList.remove("d-none");

  fetch(apiUrl + productId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((product) => {
      showProductDetails(product);
    })
    .catch((err) => {
      container.innerHTML = `<div class="alert alert-danger">Errore: ${err.message}</div>`;
    })
    .finally(() => {
      loading.classList.add("d-none");
    });
};

fetchProduct();
