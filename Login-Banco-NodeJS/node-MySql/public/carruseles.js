function configurarCarrusel(botonIzqId, botonDerId, carruselId, desplazamiento) {
        const btnLeft = document.getElementById(botonIzqId);
        const btnRight = document.getElementById(botonDerId);
        const carrusel = document.getElementById(carruselId);

        btnLeft.addEventListener('click', () => {
            carrusel.scrollLeft -= desplazamiento;
        });

        btnRight.addEventListener('click', () => {
            carrusel.scrollLeft += desplazamiento;
        });
    }

    configurarCarrusel('btn-left-carrusel-1', 'btn-right-carrusel-1', 'carrusel-1', 220); // Carrusel 2
    configurarCarrusel('btn-left-carrusel-2', 'btn-right-carrusel-2', 'carrusel-2', 380); // Carrusel 3
    configurarCarrusel('btn-left-carrusel-3', 'btn-right-carrusel-3', 'carrusel-3', 440); // Carrusel 4
 const carrusel = document.getElementById('carrusel-3');
const elementos = carrusel.querySelectorAll('.carousel-productos-elementos');
const indicadores = document.querySelectorAll('.indicador');

function esMovil() {
  return window.innerWidth <= 500;
}

indicadores.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (esMovil()) {
      const elemento = elementos[index];
      if (elemento) {
        carrusel.scrollTo({
          left: elemento.offsetLeft,
          behavior: 'smooth'
        });
      }
    } else {
      carrusel.style.transform = `translateX(-${index * 100}%)`;
    }
    indicadores.forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
  });
});
indicadores[0].classList.add('active');
