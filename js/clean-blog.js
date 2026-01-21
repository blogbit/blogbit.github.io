// Clean Blog Scripts
(function($) {
  "use strict"; // Запускаем строгий режим JavaScript

  // Плавная прокрутка при клике на якорные ссылки
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Закрываем меню при клике на ссылку
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Активируем scrollspy для навигации
  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });

  // Сворачиваем навигацию
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  
  // Сворачиваем если страница не на верху
  navbarCollapse();
  
  // Сворачиваем при скролле
  $(window).scroll(navbarCollapse);

  // Инициализация tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Обработчик для кнопки меню
  $('.navbar-toggler').click(function() {
    $('.navbar-toggler').toggleClass('active');
  });

})(jQuery); // Конец использования jQuery
