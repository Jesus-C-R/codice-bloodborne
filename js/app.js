let pantallaInicio = document.getElementById("pantalla-inicio");
let botonInicio = document.getElementById("btn-entrar");
let pantallaMapa = document.getElementById("pantalla-mapa");
let lucidez = 0;
let barraLucidez = document.getElementById("barra-lucidez");
let toastLucidez = document.getElementById("toast-lucidez");
let toastLucidezB = new bootstrap.Toast(toastLucidez);
let spinner = document.querySelector(".spinner-grow");

const listaNodosPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
const listaPopovers = [...listaNodosPopovers].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

const listaNodosTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

const listaTooltips = [...listaNodosTooltips].map(nodoTooltip => new bootstrap.Tooltip(nodoTooltip));

function iniciarTransicion() {
    console.log("¡Botón pulsado! Iniciando magia...");

    botonInicio.classList.add("d-none");
    spinner.classList.remove("d-none");

    pantallaInicio.classList.add("desvanecer");
    
    setTimeout(function () {
        pantallaInicio.classList.remove("d-flex"); 
        pantallaInicio.classList.add("d-none");    
        pantallaMapa.classList.remove("d-none");   
    }, 2000);
};

botonInicio.addEventListener("click", iniciarTransicion);

const modalLore = document.getElementById('modalLore');

modalLore.addEventListener('show.bs.modal', function (event) {

    let puntoRojo = event.relatedTarget;

    let tituloHistoria = puntoRojo.getAttribute('data-bs-title');
    let textoHistoria = puntoRojo.getAttribute('data-texto');

    let zonaTitulo = document.getElementById('tituloModal');
    let zonaCuerpo = document.getElementById('cuerpoModal');

    zonaTitulo.textContent = tituloHistoria;
    zonaCuerpo.innerHTML = textoHistoria;

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

const modalArma = document.getElementById('modalArma');

modalArma.addEventListener('show.bs.modal', function (event) {
    let botonArma = event.relatedTarget;

    let nombre = botonArma.getAttribute('data-arma-nombre');
    let descripcion = botonArma.getAttribute('data-arma-desc');
    let imagenRuta = botonArma.getAttribute('data-arma-img');

    let zonaTitulo = document.getElementById('tituloArma');
    let zonaTexto = document.getElementById('textoArma');
    let zonaImagen = document.getElementById('imagenArma');

    zonaTitulo.textContent = nombre;
    zonaTexto.textContent = descripcion;
    zonaImagen.src = imagenRuta;

    let menuLateral = bootstrap.Offcanvas.getInstance(document.getElementById('menuArsenal'));
    if (menuLateral) {
        menuLateral.hide();
    }
});

