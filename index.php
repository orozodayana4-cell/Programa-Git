<?php ?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Capa Cero</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">

  <style>
    html {
      scroll-behavior: smooth;
    }
  </style>
</head>

<body class="pagina-index">

  <!-- 🔹 NAVBAR -->
  <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="container">

      <a class="navbar-brand fw-bold" href="#">🛍️ Capa Cero</a>

      <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">

        <ul class="navbar-nav ms-auto align-items-center gap-3">

          <li class="nav-item">
            <a class="nav-link nav-scroll" href="#productos">Productos</a>
          </li>

          <li class="nav-item">
            <a class="nav-link nav-scroll" href="#nosotros">Nosotros</a>
          </li>

          <li class="nav-item">
            <a class="nav-link nav-scroll" href="#contacto">Contacto</a>
          </li>

          <li class="nav-item">
            <input type="text" id="buscador" class="form-control buscador" placeholder="Buscar...">
          </li>

          <li class="nav-item">
            <a href="pedidos.html" class="btn btn-pedidos">
              📦 Mis pedidos
            </a>
          </li>

          <!-- 🛒 BOTÓN CARRITO -->
          <li class="nav-item">
            <div id="toggleMiniCarrito" class="carrito-fijo">
              🛒 <span id="contador-carrito">0</span>
            </div>
          </li>

        </ul>

      </div>
    </div>
  </nav>

  <!-- 🔹 HERO -->
  <section class="hero">
    <div class="container">
      <h1>Comodidad y Estilo para el Hombre Moderno</h1>
      <p>Descubre nuestra colección de ropa interior masculina de alta calidad</p>
      <a href="#" id="btnVerProductos" class="btn btn-light mt-3">Ver Productos</a>
    </div>
  </section>

  <!-- 🔹 PRODUCTOS -->
  <section id="productos" class="py-5">
    <div class="container">
      <h2 class="text-center mb-4">Nuestros Productos</h2>
      <div class="row g-4">

<?php
include("db/conexion.php");

$sql = "SELECT * FROM productos";
$resultado = $conn->query($sql);
?>

<?php while($producto = $resultado->fetch_assoc()): ?>

<div class="col-md-3">
  <div class="card product-card">

    <div style="position:relative;">
      <img src="<?= $producto['imagen'] ?>" class="card-img-top">
      <div class="img-overlay"></div>
      <div class="texto-overlay">Ver producto</div>
    </div>

    <div class="card-body text-center">
      <h5><?= $producto['nombre'] ?></h5>
      <p>$<?= number_format($producto['precio'], 0, ',', '.') ?></p>

      <button 
        class="btn btn-dark agregar-carrito"
        data-nombre="<?= $producto['nombre'] ?>"
        data-precio="<?= $producto['precio'] ?>"
        data-categoria="<?= $producto['categoria'] ?>"
      >
        Ver producto
      </button>
    </div>

  </div>
</div>

<?php endwhile; ?>

      </div>
    </div>
  </section>

  <!-- 🔹 NOSOTROS -->
  <section id="nosotros" class="py-5 text-center">
    <div class="container">
      <h2>Sobre Nosotros</h2>
      <p>Somos una tienda dedicada a ofrecer productos de alta calidad.</p>
    </div>
  </section>

  <!-- 🔹 CONTACTO -->
  <section id="contacto" class="py-5">
    <div class="container">
      <h3 class="text-center">Contáctanos</h3>
    </div>
  </section>

  <!-- 🔹 FOOTER -->
  <footer>
    <p>&copy; <?php echo date('Y'); ?> Tienda Masculina</p>
  </footer>

  <!-- 🛒 CARRITO LATERAL (SIEMPRE AQUÍ) -->
  <div id="carritoLateral" class="carrito-lateral">
    <div class="carrito-header">
      <h5>🛒 Carrito</h5>
      <button id="cerrarCarrito">✖</button>
    </div>

    <div id="carrito-items"></div>

    <div class="carrito-footer">
      <strong>Total: $<span id="carrito-total">0</span></strong>
      <button id="finalizarCompra" class="btn-finalizar">Finalizar compra</button>
    </div>
  </div>

  <!-- 🌫️ OVERLAY -->
  <div id="overlayCarrito" class="overlay-carrito"></div>

  <!-- JS -->
  <script src="script.js"></script>

</body>
</html>