<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Pago</title>

  <link rel="stylesheet" href="styles.css">
</head>
<body>

<div class="checkout-container">

  <!-- RESUMEN -->
  <div class="checkout-card">
    <h2>Resumen de compra</h2>

    <div id="resumen"></div>

    <div class="checkout-total">
      Total: $<span id="total"></span>
    </div>
  </div>

  <!-- FORMULARIO -->
  <div class="checkout-card">
    <h2>Datos de pago</h2>

    <form id="formPago">

      <input type="text" placeholder="Nombre completo" required>
      <input type="text" placeholder="Número de tarjeta" required>
      <input type="text" placeholder="MM/AA" required>
      <input type="text" placeholder="CVV" required>

      <button type="submit" class="btn-pagar">
        Pagar ahora
      </button>

    </form>
  </div>

</div>

<script>
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("resumen");
const totalEl = document.getElementById("total");

let total = 0;

carrito.forEach(p => {
  total += p.precio * p.cantidad;

  contenedor.innerHTML += `
    <div class="item-resumen">
      <span>${p.nombre} x${p.cantidad}</span>
      <span>$${(p.precio * p.cantidad).toLocaleString()}</span>
    </div>
  `;
});

totalEl.textContent = total.toLocaleString();

document.getElementById("formPago").addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Pago realizado con éxito ✅");

  localStorage.removeItem("carrito");
  window.location.href = "index.php";
});
</script>

</body>
</html>