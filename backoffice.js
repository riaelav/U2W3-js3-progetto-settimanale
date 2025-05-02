const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0NzhhMDFjMjUwNDAwMTUxYWI2NGQiLCJpYXQiOjE3NDYxNzIwNjQsImV4cCI6MTc0NzM4MTY2NH0.02Vc7s2513ZyFdIKVrDWeUYfHuHd80llc9QhaKnH6SQ";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const form = document.getElementById("product-form");
const resetBtn = document.getElementById("reset-btn");
const deleteBtn = document.getElementById("delete-btn");
const alertContainer = document.getElementById("alert-container");

const showAlert = (message, type = "danger") => {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
};

// Modifico prodotto
if (productId) {
  fetch(apiUrl + productId, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Prodotto non trovato");
      return res.json();
    })
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch(() => showAlert("Errore nel caricamento del prodotto."));
} else {
  form.reset();
  deleteBtn.style.display = "none";
}

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  const method = productId ? "PUT" : "POST";
  const finalUrl = productId ? apiUrl + productId : apiUrl;

  fetch(finalUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Errore durante il salvataggio");
      return response.json();
    })
    .then(() => showAlert("Prodotto salvato con successo!", "success"))
    .catch((err) => showAlert(err.message));
});

// Metodo DELETE
deleteBtn.addEventListener("click", () => {
  if (confirm("Sei sicuro di voler cancellare il prodotto?")) {
    fetch(apiUrl + productId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella cancellazione");
        showAlert("Prodotto eliminato con successo", "success");
      })
      .catch((err) => showAlert(err.message));
  }
});
