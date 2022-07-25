$(document).ready(function () {

    //burger menu and navigation
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu-mobile');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('.menu-mobile__list a');
    const body = document.querySelector('body');


    menuBtn.addEventListener('click', function () {
        this.classList.toggle('menu-btn--active');
        menu.classList.toggle('menu-mobile--active');
        body.classList.toggle('no-scroll');
        overlay.classList.toggle('overlay--active');
    });

    navLinks.forEach(function (item) {
        item.addEventListener('click', function () {
            turnOffMobileNav();
        })
    })

    overlay.addEventListener('click', function () {
        turnOffMobileNav();
    })


    //function for removing all active objects
    function turnOffMobileNav() {
        if (menuBtn.classList.contains('menu-btn--active')) {
            menuBtn.classList.remove('menu-btn--active');
        }

        if (overlay.classList.contains('overlay--active')) {
            overlay.classList.remove('overlay--active');
        }

        if (menu.classList.contains('menu-mobile--active')) {
            menu.classList.remove('menu-mobile--active');
        }

        if (body.classList.contains('no-scroll')) {
            body.classList.remove('no-scroll');
        }
    }



    //resize
    window.addEventListener('resize', function () {
        menuBtn.classList.remove('menu-btn--active');
        menu.classList.remove('menu-mobile--active');
        body.classList.remove('no-scroll');
        overlay.classList.remove('overlay--active');
    })



    //parallax mousemove effect in contacts section
    let prxArea = document.querySelector('.contacts');
    let prxItem = document.querySelectorAll('.move-quote');
    let prxItem2 = document.querySelectorAll('.move-quote--small');

    prxArea.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;

        for (let item of prxItem) {
            item.style.transform = 'translate(-' + x * 100 + 'px, -' + y * 70 + 'px)';
        }

        for (let item of prxItem2) {
            item.style.transform = 'translate(-' + x * 40 + 'px, -' + y * 40 + 'px)';
        }
    });



    //mixitup
    let blockMix = document.querySelector('#mix-items');
    let mixer = mixitup(blockMix);



    //fixed scroll header
    $(window).scroll(function () {
        if ($(document).scrollTop() > 60) {
            $(".header__fix").addClass("header__scroll");
        } else {
            $(".header__fix").removeClass("header__scroll");
        }

        // if ($(document).scrollTop() > 60) {
        //     $(".header__fix").addClass("header__scroll--mobile");
        // } else {
        //     $(".header__fix").removeClass("header__scroll--mobile");
        // }
    });


    //plagin pageNav

    $('#header-menu').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    })


    //plagin type js for type effect

    var typed = new Typed('.auto-type', {
        strings: [
            'Верстальщик сайтов, веб-разработчик. Работаю с соблюдением сроков и выполнением ТЗ. ^1500',
            'Сделаю для Вас лендинг, сайт-визитку, личный сайт, корпоративный лендинг и др.',
            'Напишите мне, буду рад сотрудничеству! ^1000'
        ],
        typeSpeed: 50,
        backSpeed: 20,
        loop: true
    })

    //form

    const formItems = document.querySelectorAll('.form__field');

    for (let item of formItems) {
        const thisParent = item.closest('.form__item');
        const thisPlaceholder = thisParent.querySelector('.form__fake-placeholder');

        //if input/textarea is focused
        item.addEventListener('focus', function () {
            thisPlaceholder.classList.add('form__fake-placeholder--active');
        });

        //if not focused
        item.addEventListener('blur', function () {
            if (item.value.length > 0) {
                thisPlaceholder.classList.add('form__fake-placeholder--active');

            } else {
                thisPlaceholder.classList.remove('form__fake-placeholder--active');
            }
        });
    }

    //form validate
    $('.contacts__form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Введите email",
                email: "Имейл написан неверно"
            },
            message: {
                required: "Поле не должно быть пустым"
            }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();
        }

    });


    //*************************************************** */
    // Функция AJAX запрса на сервер

    function ajaxFormSubmit() {

        let string = $(".contacts__form").serialize(); // Соханяем данные введенные в форму в строку.

        //Формируем ajax запрос
        $.ajax({
            type: "POST", // Тип запроса - POST
            url: "php/mail.php", // Куда отправляем запрос
            data: string, // Какие даные отправляем, в данном случае отправляем переменную string

            // Функция если все прошло успешно
            success: function (html) {
                $(".contacts__form").slideUp(800);
                $('#answer').html(html);
            }
        });
        // Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
        return false;
    }
})



