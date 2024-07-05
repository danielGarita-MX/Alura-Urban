import { operacionesAPI } from "./useAPI.js"; // Importación de las operaciones de la API

/*
  ! Archivo que permite enviar datos a la API a través de un formulario
*/

/* Formulario de registro de nuevo producto */
const formulario = document.querySelector("[data-formulario]");

/* Función que envia los datos del formulario a la API */
async function registrarProducto(evento){
  evento.preventDefault(); // Evita que la página se recargue al enviar el formulario

  /* Capura de los valores de los campos de entrada */
  const nombreP = document.querySelector("[data-nombre]").value;
  const precioP = document.querySelector("[data-precio]").value;
  const imagenP = document.querySelector("[data-imagen]").value;

  /* Se envian los datos */
  try {
    /* Se envian los datos y se espera la respuesta */
    await operacionesAPI.enviarDatosAPI(nombreP, precioP, imagenP);

    window.location.reload(true); // Forza la actualización de la página
  } catch (error) {
    alert("No se puedo procesar la solicitud...")
  }
}

/* Captura del envio del formulario */
formulario.addEventListener("submit", evento => registrarProducto(evento));