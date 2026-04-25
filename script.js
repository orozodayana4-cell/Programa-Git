// =====================
// INICIO
// =====================
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  eventoCarritoLateral();

  // 🔥 SIEMPRE ACTIVAR
  eventosCatalogo();

  if (document.body.classList.contains("pagina-catalogo")) {
    activarModalProducto();
  }
});


// =====================
// EVENTOS (INDEX + CATALOGO)
// =====================
function eventosCatalogo() {

  document.addEventListener("click", (e) => {

    // 🔥 NUEVO BLOQUE (ARRIBA DE TODO)
    const card = e.target.closest(".product-card");

    if (card && document.body.classList.contains("pagina-index")) {

      const btn = card.querySelector(".agregar-carrito");
      const categoria = btn.dataset.categoria;

      if (categoria === "femenino") {
        window.location.href = "catalogo-femenino.html";
      } else {
        window.location.href = "catalogo-masculino.html";
      }

      return;
    }

    // 🔽 TU CÓDIGO NORMAL
    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    e.stopPropagation();

    if (document.body.classList.contains("pagina-index")) {

      const categoria = btn.dataset.categoria;

      if (categoria === "femenino") {
        window.location.href = "catalogo-femenino.html";
      } else {
        window.location.href = "catalogo-masculino.html";
      }

      return;
    }

    // 🛒 AGREGAR EN CATÁLOGO
    animarAlCarrito(btn);

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);
    const img = btn.closest(".product-card").querySelector(".card-img-top").src;

    let existe = carrito.find(p => p.nombre === nombre);

    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1, img });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
  });
}

// =====================
// CONTADOR
// =====================
function actualizarContador() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador-carrito");

  if (!contador) return;

  let total = 0;
  carrito.forEach(p => total += p.cantidad);

  contador.textContent = total;
}


// =====================
// ANIMACIÓN VOLAR
// =====================
function animarAlCarrito(btn) {

  const img = btn.closest(".product-card").querySelector(".card-img-top");
  const carrito = document.getElementById("toggleMiniCarrito");

  if (!img || !carrito) return;

  const imgRect = img.getBoundingClientRect();
  const carritoRect = carrito.getBoundingClientRect();

  const clon = img.cloneNode(true);

  clon.style.position = "fixed";
  clon.style.top = imgRect.top + "px";
  clon.style.left = imgRect.left + "px";
  clon.style.width = imgRect.width + "px";
  clon.style.height = imgRect.height + "px";
  clon.style.zIndex = "9999";
  clon.style.transition = "all 0.7s ease";

  document.body.appendChild(clon);

  setTimeout(() => {
    clon.style.top = carritoRect.top + "px";
    clon.style.left = carritoRect.left + "px";
    clon.style.width = "30px";
    clon.style.height = "30px";
    clon.style.opacity = "0.5";
  }, 10);

  setTimeout(() => clon.remove(), 700);
}


// =====================
// MODAL
// =====================
function activarModalProducto() {

  const modal = document.getElementById("modalProducto");
  const cerrar = document.getElementById("cerrarModal");
  const btnAgregar = document.getElementById("modalAgregar");

  const modalImg = document.getElementById("modalImg");
  const modalNombre = document.getElementById("modalNombre");
  const modalPrecio = document.getElementById("modalPrecio");

  let productoActual = null;

  document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", (e) => {

      if (e.target.closest("button")) return;

      const nombre = card.querySelector("h5").innerText;
      const precio = card.querySelector("p").innerText;
      const img = card.querySelector(".card-img-top").src;

      productoActual = { nombre, precio, img };

      modalImg.src = img;
      modalNombre.innerText = nombre;
      modalPrecio.innerText = precio;

      modal.classList.add("activo");
    });

  });

  // ❌ CERRAR
  cerrar.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.remove("activo");
  });

  // ❌ CLICK FUERA
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo");
    }
  });

  // 🛒 AGREGAR DESDE MODAL
  btnAgregar.addEventListener("click", () => {

    if (!productoActual) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let precioNum = parseInt(productoActual.precio.replace(/\D/g, ""));

    let existe = carrito.find(p => p.nombre === productoActual.nombre);

    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({
        nombre: productoActual.nombre,
        precio: precioNum,
        cantidad: 1,
        img: productoActual.img
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
    modal.classList.remove("activo");
  });
}


// =====================
// CARRITO LATERAL
// =====================
function eventoCarritoLateral() {

  const btn = document.getElementById("toggleMiniCarrito");
  const carrito = document.getElementById("carritoLateral");
  const overlay = document.getElementById("overlayCarrito");
  const cerrar = document.getElementById("cerrarCarrito");

  if (!btn) return;

  btn.addEventListener("click", () => {
    carrito.classList.add("abierto");
    overlay.classList.add("activo");
    renderCarritoLateral(); 
  });

  cerrar.addEventListener("click", () => {
    carrito.classList.remove("abierto");
    overlay.classList.remove("activo");
  });

  overlay.addEventListener("click", () => {
    carrito.classList.remove("abierto");
    overlay.classList.remove("activo");
  });
}

function renderCarritoLateral() {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contenedor = document.getElementById("carrito-items");
  const totalEl = document.getElementById("carrito-total");

  if (!contenedor || !totalEl) return;

  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((p, i) => {

    const img = p.img ? p.img : "https://via.placeholder.com/60";
    const precio = Number(p.precio) || 0;
    const cantidad = Number(p.cantidad) || 1;

    const subtotal = precio * cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="item-carrito">

        <img src="${img}" class="img-carrito">

        <div class="info-carrito">
          <strong>${p.nombre || "Producto"}</strong>
          <p>$${precio.toLocaleString()}</p>

          <div class="controles">
            <button onclick="restar(${i})">−</button>
            <span>${cantidad}</span>
            <button onclick="sumar(${i})">+</button>
            <button onclick="eliminar(${i})" class="eliminar">✖</button>
          </div>
        </div>

        <div class="precio-total">
          $${subtotal.toLocaleString()}
        </div>

      </div>
    `;
  });

  totalEl.textContent = total.toLocaleString();
}

function sumar(i) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito[i].cantidad++;

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarritoLateral();
  actualizarContador();
}

function restar(i) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito[i].cantidad > 1) {
    carrito[i].cantidad--;
  } else {
    carrito.splice(i, 1);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarritoLateral();
  actualizarContador();
}

function eliminar(i) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(i, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarritoLateral();
  actualizarContador();
}

document.addEventListener("click", function (e) {

  if (e.target && e.target.id === "finalizarCompra") {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    window.location.href = "pago.php";
  }

});