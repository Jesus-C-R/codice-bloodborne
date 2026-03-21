const pantallaInicio = document.getElementById("pantalla-inicio");
const botonInicio = document.getElementById("btn-entrar");
const pantallaMapa = document.getElementById("pantalla-mapa");
const barraLucidez = document.getElementById("barra-lucidez");
const toastLucidez = document.getElementById("toast-lucidez");
const toastLucidezB = new bootstrap.Toast(toastLucidez, { delay: 2000 });
const spinner = document.querySelector(".spinner-grow");

let lucidez = 0; 

// Inicialización de componentes Bootstrap
const listaNodosPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
[...listaNodosPopovers].forEach(el => new bootstrap.Popover(el));

const listaNodosTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...listaNodosTooltips].forEach(el => new bootstrap.Tooltip(el));

// Lógica de transición de inicio
function iniciarTransicion() {
    botonInicio.classList.add("d-none");
    spinner.classList.remove("d-none");
    pantallaInicio.classList.add("desvanecer");
    
    setTimeout(() => {
        pantallaInicio.classList.remove("d-flex"); 
        pantallaInicio.classList.add("d-none");    
        pantallaMapa.classList.remove("d-none");   
    }, 2000);
}

botonInicio.addEventListener("click", iniciarTransicion);

// Lógica del modal de Lore y sistema de Lucidez
const modalLore = document.getElementById('modalLore');

modalLore.addEventListener('show.bs.modal', function (event) {
    const puntoRojo = event.relatedTarget;
    const tituloHistoria = puntoRojo.getAttribute('data-bs-title');
    const textoHistoria = puntoRojo.getAttribute('data-texto');

    const zonaTitulo = document.getElementById('tituloModal');
    const zonaCuerpo = document.getElementById('cuerpoModal');

    zonaTitulo.textContent = tituloHistoria;
    zonaCuerpo.innerHTML = textoHistoria;

    if (!puntoRojo.classList.contains("leido")) {
        lucidez += 20;
        puntoRojo.classList.add("leido");
        barraLucidez.style.width = lucidez + "%";
        barraLucidez.setAttribute('aria-valuenow', lucidez);

        toastLucidezB.show();

        if (lucidez === 100) {
            const puntoOculto = document.querySelector(".punto-oculto");
            puntoOculto.classList.remove("punto-oculto", "d-none");
            puntoOculto.style.display = "block"; 
        }
    }
});

// Lógica del modal de Armas
const modalArma = document.getElementById('modalArma');

modalArma.addEventListener('show.bs.modal', function (event) {
    const botonArma = event.relatedTarget;
    const nombre = botonArma.getAttribute('data-arma-nombre');
    const descripcion = botonArma.getAttribute('data-arma-desc');
    const imagenRuta = botonArma.getAttribute('data-arma-img');

    document.getElementById('tituloArma').textContent = nombre;
    document.getElementById('textoArma').textContent = descripcion;
    
    const zonaImagen = document.getElementById('imagenArma');
    zonaImagen.src = imagenRuta;
    zonaImagen.alt = "Ilustración del arma: " + nombre; 

    // Cerrar el offcanvas al abrir el modal para evitar superposición
    const menuLateral = bootstrap.Offcanvas.getInstance(document.getElementById('menuArsenal'));
    if (menuLateral) {
        menuLateral.hide();
    }
});
