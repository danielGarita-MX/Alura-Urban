/* 
  ! Archivo de conexión y operación de la API
*/

/* Variable para almacenar el enlace de la API */
const enlaceAPI = "http://localhost:3001/productos";
/* Contenedor para mostrar error */
const mostrarError = document.querySelector("[data-lista-productos]").parentNode;

/* Función asincrona para comunicarse con la API y obtener los datos a partir del método 'GET' */
async function obtenerDatosAPI(){
  try { // Intento de obtención de los datos con éxito
    const respuestaAPI = await fetch(enlaceAPI); // Respuesta de la API
    const datosAPI = await respuestaAPI.json(); // Conversión de la respuesta a un objeto tipo 'JSON'
    
    return datosAPI; // Se devuelven los datos
  } catch (error) { // Fallo al obtener los datos
    mostrarError.innerHTML = 
    `
      <div class="info-message" data-info-message>
        <img src="../images/error-icon.png" class="img-message">
        <h1 class="message">Upss... Algo no esta bien</h1>
      </div>
    `
  }
}

/* Función asincrona para comunicarse con la API y enviar los datos a partir del método 'POST' */
async function enviarDatosAPI(nombreProducto, precioProducto, imagenProducto){
  try { // Intento de enviar datos a la API
    /* Conexión con la API para enviar los datos del nuevo producto */
    const solicitudEnvio = await fetch(enlaceAPI, 
      {
        method: "POST", // Método de envio
        /* Encabezado de la solicitud con el tipo de contenido a enviar */
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ // Cuerpo de la solicitud con los datos a enviar
          nombre: nombreProducto,
          precio: precioProducto,
          imagen: imagenProducto
        })
      }
    )

    /* Respuesta de la API */
    const respuestaEnvio = await solicitudEnvio.JSON();

    return respuestaEnvio; // Retorno de los datos enviados a la API
  } catch (error) {
  }
}

/* Función asincrona para eliminar datos de la API dado su 'ID' */
async function eliminarDatos(idProducto){
  try { // Intento de solicitud
    const solicitudEliminar = await fetch(`${enlaceAPI}/${idProducto}`,
      {
        method: "DELETE",
        headers: {"Content-type": "application/json"}
      }
    )

    const respuestaAPI = await solicitudEliminar.JSON();

    return respuestaAPI;
  } catch (error) { // Gestión del error
  }
}

/* Objeto que almacena las funciones de operación con la API */
export const operacionesAPI = 
{
  obtenerDatosAPI, // Función para obtener datos
  enviarDatosAPI, // Función para enviar datos
  eliminarDatos // Función para eliminar datos
}