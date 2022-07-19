//burger menu and navigation

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-mobile');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.menu-mobile__list a');


menuBtn.addEventListener('click', function () {
    this.classList.toggle('menu-btn--active');
    menu.classList.toggle('menu-mobile--active');
    document.querySelector('body').classList.toggle('no-scroll');
    overlay.classList.toggle('overlay--active');
});

navLinks.forEach(function (item) {
    item.addEventListener('click', function () {
        menuBtn.classList.remove('menu-btn--active');
        menu.classList.remove('menu-mobile--active');
        document.querySelector('body').classList.remove('no-scroll');
        overlay.classList.remove('overlay--active');
    })
})





