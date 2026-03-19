let pantallaInicio = document.getElementById("pantalla-inicio");
let botonInicio = document.getElementById("btn-entrar");
let pantallaMapa = document.getElementById("pantalla-mapa");
let lucidez = 0;
let barraLucidez = document.getElementById("barra-lucidez");
let toastLucidez = document.getElementById("toast-lucidez");
let toastLucidezB = new bootstrap.Toast(toastLucidez);
let spinner = document.querySelector(".spinner-grow");
// Activar los Popovers del Bestiario
const listaNodosPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
const listaPopovers = [...listaNodosPopovers].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

const listaNodosTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

const listaTooltips = [...listaNodosTooltips].map(nodoTooltip => new bootstrap.Tooltip(nodoTooltip));

function iniciarTransicion() {
    console.log("¡Botón pulsado! Iniciando magia...");

    // 1. Escondemos el botón y revelamos el Spinner de carga
    botonInicio.classList.add("d-none");
    spinner.classList.remove("d-none");

    // 2. ¡La magia de la transición vuelve! Activamos el desvanecimiento
    pantallaInicio.classList.add("desvanecer");
    
    // 3. Esperamos 2 segundos y cambiamos de pantalla
    setTimeout(function () {
        pantallaInicio.classList.remove("d-flex"); 
        pantallaInicio.classList.add("d-none");    
        pantallaMapa.classList.remove("d-none");   
    }, 2000);
};

// He cambiado el nombre de la función por si "transition" daba conflicto con el navegador
botonInicio.addEventListener("click", iniciarTransicion);

// --- LÓGICA DEL MANUSCRITO (MODAL) ---
const modalLore = document.getElementById('modalLore');

// 2. Le decimos a Bootstrap que escuche el evento 'show.bs.modal' (cuando el modal empieza a abrirse)
modalLore.addEventListener('show.bs.modal', function (event) {

    let puntoRojo = event.relatedTarget;

    let tituloHistoria = puntoRojo.getAttribute('data-bs-title');
    let textoHistoria = puntoRojo.getAttribute('data-texto');

    let zonaTitulo = document.getElementById('tituloModal');
    let zonaCuerpo = document.getElementById('cuerpoModal');

    // Inyectamos el texto del punto rojo dentro de la ventana Modal
    zonaTitulo.textContent = tituloHistoria;
    zonaCuerpo.innerHTML = textoHistoria; // Usamos innerHTML porque tu texto tiene etiquetas <br> y <span>

    if (puntoRojo.classList.contains("leido")) {
        console.log("Lugar ya descubierto");
    } else {
        lucidez += 20;
        puntoRojo.classList.add("leido");
        barraLucidez.style.width = lucidez + "%";
        barraLucidez.setAttribute('aria-valuenow', lucidez);

        toastLucidezB.show();

        if (lucidez == 100) {
            let puntoOculto = document.querySelector(".punto-oculto");
            puntoOculto.classList.remove("punto-oculto");
        }
    }
});

// --- LÓGICA DEL ARSENAL (MODAL DE ARMAS) ---

const modalArma = document.getElementById('modalArma');

modalArma.addEventListener('show.bs.modal', function (event) {
    // 1. Saber qué botón exacto se ha pulsado
    let botonArma = event.relatedTarget;

    // 2. Extraer la información de la "mochila" del botón
    let nombre = botonArma.getAttribute('data-arma-nombre');
    let descripcion = botonArma.getAttribute('data-arma-desc');
    let imagenRuta = botonArma.getAttribute('data-arma-img');

    // 3. Identificar las zonas vacías del Modal Central
    let zonaTitulo = document.getElementById('tituloArma');
    let zonaTexto = document.getElementById('textoArma');
    let zonaImagen = document.getElementById('imagenArma');

    // 4. Inyectar la información
    zonaTitulo.textContent = nombre;
    zonaTexto.textContent = descripcion;
    zonaImagen.src = imagenRuta; // ¡Cambiamos el atributo src de la etiqueta img!

    // 5. Cerrar automáticamente el Offcanvas (Menú lateral)
    let menuLateral = bootstrap.Offcanvas.getInstance(document.getElementById('menuArsenal'));
    if (menuLateral) {
        menuLateral.hide();
    }
});

