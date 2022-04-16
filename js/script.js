$(document).ready(function(){
    $('.carousel__inner').slick({
        dots: true,  /* точки под картинкой */
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.svg"></button>',
 
        responsive: [
            {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
                }
            }
        ]
    });



    $(document).ready(function() {
        $('.test-popup1').magnificPopup({type:'image'});
      });
    
    

 




    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

/*     $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });

    $('.catalog-item__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }); 
*/
    //Функция с оптимизацией этих двух функций
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // Модальные окна
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow'); //показ окна медленно
     });
 

     $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });



    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__deskr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

/*     $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__deskr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    }); */
 
/* 
    $('#consultation-form').validate({   //консультационная форма
        rules: {
            name: "required", //обязательное поле
            phone: "required", //обязательное поле
            email: {
                required: true,  //обязательное поле
                email: true   // проверка эмал ли это
            }
        },
        messages: {
            name: "Пожалуйста введите свое имя!!! ",
            phone: "Пожалуйста введите свой телефон!!!",
            email: {
              required: "Пожалуйста введите свою почту!!!",
              email: "Неправильно введен адрес почты"
            }
          }
    });
    

    $('#order form').validate({   //форма для табов
        rules: {
            name: "required", //обязательное поле
            phone: "required", //обязательное поле
            email: {
                required: true,  //обязательное поле
                email: true   // проверка эмал ли это
            }
        },
        messages: {
            name: "Пожалуйста введите свое имя",
            phone: "Пожалуйста введите свой телефон",
            email: {
              required: "Пожалуйста введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
    });
  

    $('#consultation form').validate({   // форма для модальных окон
        rules: {
            name: "required", //обязательное поле
            phone: "required", //обязательное поле
            email: {
                required: true,  //обязательное поле
                email: true   // проверка эмал ли это
            }
        },
        messages: {
            name: "Пожалуйста введите свое имя",
            phone: "Пожалуйста введите свой телефон",
            email: {
              required: "Пожалуйста введите свою почту",
              email: "Неправильно введен адрес почты"
            }
          }
    });
*/ 

    function validateForms(form) {  // функция для трех
        $(form).validate({
            rules: {
            name: "required", //обязательное поле
            phone: "required", //обязательное поле
            email: {
                required: true,  //обязательное поле
                email: true   // проверка эмал ли это
            }
        },
        messages: {
            name: "Пожалуйста введите свое имя!!! ",
            phone: "Пожалуйста введите свой телефон!!!",
            email: {
              required: "Пожалуйста введите свою почту!!!",
              email: "Неправильно введен адрес почты"

                }
              }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
   
/*     
    $('#consultation form').validateForms(); // форма для модальных окон
    $('#consultation-form').validateForms();  //консультационная форма
    $('#order form').validateForms();  //форма для табов
 */
    $('input[name=phone]').mask("+7 (999) 999-99-99");  //маска для телефонов


    // отправка данных из формы на почту
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });


    // плавный скролинг страницы и клавиша ВВЕРХ
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // плавная прокрутка
    $("a[href^=#up]").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();

});


        /* arrows: false, выключение стрелок */ 

        /* autoplay: true,
        autoplaySpeed: 2000  автоскроллинг*/

        /* fade: true,   
        cssEase: 'linear'  */ /* проявление картинки */

/* const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    }); */

/* document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
}); */


