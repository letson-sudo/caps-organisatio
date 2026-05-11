// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('main-navigation');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const donateButton = document.getElementById('nav-donate-button');
    
    let scrolled = false;
    
    // Handle scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50 && !scrolled) {
            nav.classList.add('scrolled');
            scrolled = true;
        } else if (window.scrollY <= 50 && scrolled) {
            nav.classList.remove('scrolled');
            scrolled = false;
        }
    });
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // Change icon
        const icon = mobileMenuButton.querySelector('svg');
        if (!isExpanded) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        }
    });
    
    // Donate button scroll
    if (donateButton) {
        donateButton.addEventListener('click', function(e) {
            e.preventDefault();
            const donateSection = document.getElementById('donate');
            if (donateSection) {
                donateSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuButton.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
        });
    });
});