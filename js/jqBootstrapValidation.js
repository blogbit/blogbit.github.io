// Упрощенная версия jqBootstrapValidation
(function($) {
  "use strict";
  
  $.fn.jqBootstrapValidation = function(options) {
    var defaults = {
      filter: function() {
        return $(this).is(":visible");
      }
    };
    
    var settings = $.extend({}, defaults, options);
    
    return this.each(function() {
      var $element = $(this);
      
      $element.on("input change", function() {
        var $this = $(this);
        var value = $this.val();
        var isValid = true;
        
        // Проверка на заполненность
        if ($this.prop("required") && !value.trim()) {
          isValid = false;
          $this.next(".help-block").text("This field is required.");
        } else {
          $this.next(".help-block").text("");
        }
        
        // Проверка email
        if ($this.attr("type") === "email" && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            $this.next(".help-block").text("Please enter a valid email address.");
          }
        }
        
        // Обновление классов
        if (isValid) {
          $this.removeClass("is-invalid").addClass("is-valid");
        } else {
          $this.removeClass("is-valid").addClass("is-invalid");
        }
      });
      
      // Инициализация
      $element.trigger("change");
    });
  };
  
})(jQuery);
