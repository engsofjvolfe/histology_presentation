/**
 * NAVEGAÇÃO DE SLIDES - APRESENTAÇÃO REGENERAÇÃO E REMODELAÇÃO ÓSSEA
 * Navegação por teclado (setas, espaço, Page Up/Down)
 * Total: 26 slides
 */

(function() {
  'use strict';

  // Estado da apresentação
  let currentSlideIndex = 0;
  const totalSlides = 26;
  const slides = [];

  // Inicialização
  function init() {
    // Coletar todos os slides
    for (let i = 1; i <= totalSlides; i++) {
      const slide = document.getElementById(`slide-${i}`);
      if (slide) {
        slides.push(slide);
      }
    }

    if (slides.length === 0) {
      console.error('Nenhum slide encontrado');
      return;
    }

    // Mostrar primeiro slide
    showSlide(0);

    // Adicionar event listeners
    document.addEventListener('keydown', handleKeyPress);

    console.log(`Apresentação inicializada: ${slides.length} slides`);
  }

  // Mostrar slide específico
  function showSlide(index) {
    // Validar índice
    if (index < 0 || index >= slides.length) {
      return;
    }

    // Remover classe active de todos os slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Adicionar classe active ao slide atual
    slides[index].classList.add('active');

    // Atualizar índice atual
    currentSlideIndex = index;

    // Log para debug
    console.log(`Slide ${index + 1}/${totalSlides}`);
  }

  // Próximo slide
  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      showSlide(currentSlideIndex + 1);
    }
  }

  // Slide anterior
  function prevSlide() {
    if (currentSlideIndex > 0) {
      showSlide(currentSlideIndex - 1);
    }
  }

  // Primeiro slide
  function firstSlide() {
    showSlide(0);
  }

  // Último slide
  function lastSlide() {
    showSlide(slides.length - 1);
  }

  // Manipulador de eventos de teclado
  function handleKeyPress(event) {
    switch(event.key) {
      // Próximo slide
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
      case 'Enter':
        event.preventDefault();
        nextSlide();
        break;

      // Slide anterior
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        prevSlide();
        break;

      // Primeiro slide
      case 'Home':
        event.preventDefault();
        firstSlide();
        break;

      // Último slide
      case 'End':
        event.preventDefault();
        lastSlide();
        break;

      // Ir para slide específico (1-9)
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        event.preventDefault();
        const slideNum = parseInt(event.key) - 1;
        if (slideNum < slides.length) {
          showSlide(slideNum);
        }
        break;

      // ESC para sair do modo fullscreen (se aplicável)
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;

      // F para fullscreen
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFullscreen();
        break;
    }
  }

  // Toggle fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Erro ao entrar em fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor funções globalmente (opcional, para debug no console)
  window.slideNav = {
    next: nextSlide,
    prev: prevSlide,
    goto: showSlide,
    first: firstSlide,
    last: lastSlide
  };

})();
