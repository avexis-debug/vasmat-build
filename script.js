document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const navBrand = document.getElementById('nav-brand');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const footerYear = document.getElementById('footer-year');

    // Footer year
    footerYear.textContent = '\u00A9 ' + new Date().getFullYear() + ' TS PRO-TECH. VOTRE PARTENAIRE AM\u00C9NAGEMENT & FINITION.';

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.remove('bg-transparent', 'py-5');
            navbar.classList.add('bg-white/95', 'shadow-md', 'py-3', 'border-b', 'border-logo-green/10');
            navBrand.classList.remove('text-logo-green/90');
            navBrand.classList.add('text-logo-green');
        } else {
            navbar.classList.remove('bg-white/95', 'shadow-md', 'py-3', 'border-b', 'border-logo-green/10');
            navbar.classList.add('bg-transparent', 'py-5');
            navBrand.classList.remove('text-logo-green');
            navBrand.classList.add('text-logo-green/90');
        }
    });

    // Mobile menu toggle
    let isMenuOpen = false;

    menuToggle.addEventListener('click', function () {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            menuIconOpen.classList.add('hidden');
            menuIconClose.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        });
    });
});
