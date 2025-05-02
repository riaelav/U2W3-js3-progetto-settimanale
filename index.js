const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzhhMDFjMjUwNDAwMTUxYWI2NGQiLCJpYXQiOjE3NDYxNzIwNjQsImV4cCI6MTc0NzM4MTY2NH0.02Vc7s2513ZyFdIKVrDWeUYfHuHd80llc9QhaKnH6SQ";

const productContainer = document.getElementById("product-container");
const loadingSpinner = document.getElementById("loading");

const fetchProducts = () => {
  loadingSpinner.classList.remove("d-none");

  fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Errore nel recupero prodotti");
      }
      return res.json();
    })
    .then((products) => {
      displayProducts(products);
    })
    .catch((err) => {
      productContainer.innerHTML = `<div class="alert alert-danger">Errore: ${err.message}</div>`;
    })
    .finally(() => {
      loadingSpinner.classList.add("d-none");
    });
};

const displayProducts = (products) => {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100 shadow-sm card-rosa";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = product.imageUrl;
    img.alt = product.name;
    img.style.height = "200px";
    img.style.objectFit = "cover";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column justify-content-between";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.name;

    const brand = document.createElement("p");
    brand.className = "card-text mb-1";
    brand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

    const price = document.createElement("p");
    price.className = "card-text";
    price.innerHTML = `<strong>Prezzo:</strong> €${product.price}`;

    const btnContainer = document.createElement("div");
    btnContainer.className = "d-flex flex-wrap gap-2 mt-auto";

    const modifyBtn = document.createElement("a");
    modifyBtn.href = `backoffice.html?id=${product._id}`;
    modifyBtn.className = "btn btn-rosa flex-fill d-flex align-items-center justify-content-center gap-2";
    modifyBtn.innerHTML = `<i class="bi bi-pencil-fill"></i> Modifica`;

    const detailsBtn = document.createElement("a");
    detailsBtn.href = `details.html?id=${product._id}`;
    detailsBtn.className = "btn btn-rosa flex-fill d-flex align-items-center justify-content-center gap-2";
    detailsBtn.innerHTML = `<i class="bi bi-search"></i> Scopri di più`;

    btnContainer.appendChild(modifyBtn);
    btnContainer.appendChild(detailsBtn);

    cardBody.appendChild(title);
    cardBody.appendChild(brand);
    cardBody.appendChild(price);
    cardBody.appendChild(btnContainer);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    productContainer.appendChild(col);
  });
};

fetchProducts();
