import { operacionesAPI } from "./useAPI.js"; /* Importación de operaciones con la API */

/*
  ! Archivo que permite obtener los datos de una API y mostrarlos en una lista de productos
*/

/* Contenedor padre de las tarjetas de los productos */
const contenedorPadre = document.querySelector("[data-lista-productos]");
/* Contenedor para mostrar error */
const mostrarError = contenedorPadre.parentNode;

/* Función que muestra los productos devueltos por la API */
async function listarProductos() {
  try { // Intento de listar los productos con éxito
    const productos = await operacionesAPI.obtenerDatosAPI();
    console.log(productos.length === 0);

    /* Verificación de que haya datos almacenados en la API */
    if (productos.length === 0) { // Si no hay productos por mostrar, se maneja la excepción
      mostrarError.innerHTML = 
      `
        <div class="info-message" data-info-message>
          <img src="../images/no-data-icon.png" class="img-message">
          <h1 class="message">Nada por aquí....</h1>
        </div>
      `;
    } else { // Si hay productos a mostrar, entonces, se cargan en la página
      productos.forEach(producto => {
          contenedorPadre.appendChild(crearTarjetaProducto(producto.id, producto.nombre, producto.precio, producto.imagen));
        }
      );
    }
  } catch (error) { // Fallo al listar los productos
    mostrarError.innerHTML = 
    `
      <div class="info-message" data-info-message>
        <img src="../images/error-icon.png" class="img-message">
        <h1 class="message">Upss... Algo no esta bien</h1>
      </div>
    `
  }
}

/* Función que permite crear la tarjeta (li) para cada nuevo producto */
function crearTarjetaProducto(idProducto, nombreProducto, precioProducto, imagenProducto){
  /* Creación de la tarjeta */
  const tarjetaProducto = document.createElement("li");
  /* Asignación de estilos */
  tarjetaProducto.classList.add("product-card");

  /* Asignación de la estructura semántica  */
  tarjetaProducto.innerHTML = 
  `
    <img src="${imagenProducto}" class="img-product">

    <div class="info-product">
      <p class="attributes-product">${nombreProducto}</p>

      <div class="price-delete-product">
        <p class="attributes-product">$${precioProducto}</p>

        <img src="./images/trash-product.png" alt="Eliminar producto" title="Eliminar producto"
             class="trash-icon" data-eliminar>
      </div>
    </div>
  `

  /* Acción de borrar productor */
  const botonEliminar = tarjetaProducto.querySelector("[data-eliminar]")
  botonEliminar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    try {
      await operacionesAPI.eliminarDatos(idProducto);
      await tarjetaProducto.remove();
    } catch (error) {
      alert("No se pudo procesar la solicitud...");
    }
  })

  /* Se devuelve la tarjeta del producto ya creado */
  return tarjetaProducto;
}

/* Se obtienen y se muestran los productos */
listarProductos();
