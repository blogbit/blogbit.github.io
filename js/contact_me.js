// Contact Form Script
(function($) {
  "use strict";

  // Валидация контактной формы
  window.validateForm = function() {
    var name = document.forms["sentMessage"]["name"].value;
    var email = document.forms["sentMessage"]["email"].value;
    var message = document.forms["sentMessage"]["message"].value;
    
    if (name == "" || email == "" || message == "") {
      alert("Please fill in all required fields.");
      return false;
    }
    
    // Простая валидация email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    
    return true;
  };

  // Отправка формы (заглушка)
  $(function() {
    $("#contactForm").submit(function(event) {
      event.preventDefault();
      
      if (validateForm()) {
        // Здесь будет реальная отправка AJAX
        // Для примера просто показываем сообщение
        $("#success").html('<div class="alert alert-success">Thank you for your message! I will get back to you soon.</div>');
        $("#success").show();
        
        // Очищаем форму
        $("#contactForm")[0].reset();
        
        // Скрываем сообщение через 5 секунд
        setTimeout(function() {
          $("#success").hide();
        }, 5000);
      }
    });
  });

})(jQuery);
