function toggleMenu() {
    var mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu.style.left === "-200px") {
        mobileMenu.style.left = "0";
    } else {
        mobileMenu.style.left = "-200px";
    }
}