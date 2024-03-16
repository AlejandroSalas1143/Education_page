// Obtener el valor actual de currentSlide desde localStorage
let currentSlide = localStorage.getItem('currentSlide') || 0;

function initSlides() {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const sliderContent = document.querySelector('.slider-content');
  const prevButton = document.querySelectorAll('.btn-prev');
  const nextButton = document.querySelectorAll('.btn-next');

  prevButton.forEach(button => {
    button.addEventListener('click', () => {
      prevSlide();
    });
  });

  nextButton.forEach(button => {
    button.addEventListener('click', () => {
      nextSlide();
    });
  });

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    console.log(currentSlide);
    updateSlider();
    // Almacenar el nuevo valor de currentSlide en localStorage
    localStorage.setItem('currentSlide', currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    console.log(currentSlide);
    updateSlider();
    // Almacenar el nuevo valor de currentSlide en localStorage
    localStorage.setItem('currentSlide', currentSlide);
  }

  function updateSlider() {
    const offset = currentSlide * -100;
    sliderContent.style.transform = `translateX(${offset}%)`;
  }
}

// Llamada inicial para asegurar que las funciones de slides estén listas
initSlides();
