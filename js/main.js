// main.js - Combined functionality for CAPS Malawi website

document.addEventListener('DOMContentLoaded', function() {
    console.log('CAPS Malawi website loaded successfully');
    
    // ============================================
    // 1. BACK TO TOP FUNCTIONALITY
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ============================================
    // 2. DONATION BUTTONS FUNCTIONALITY
    // ============================================
    document.querySelectorAll('.donation-option').forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            if (amount === 'custom') {
                const customAmount = prompt('Enter donation amount (MK):');
                if (customAmount) {
                    alert(`Thank you for your donation of MK ${customAmount}! Bank details are listed below.`);
                }
            } else {
                alert(`Thank you for your donation of MK ${amount}! Bank details are listed below.`);
            }
        });
    });
    
    // ============================================
    // 3. SERVICE CARD HOVER EFFECTS
    // ============================================
    const serviceCards = document.querySelectorAll('#services [class*="hover:scale-110"]');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ============================================
    // 4. NAVIGATION SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or external links
            if (href === '#' || href.includes('mailto:') || href.includes('tel:')) {
                return;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, href);
            }
        });
    });
    
    // ============================================
    // 5. FORM VALIDATION HELPERS
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Add your form validation logic here
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Remove error class when user starts typing
                    field.addEventListener('input', function() {
                        this.classList.remove('border-red-500');
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // ============================================
    // 6. IMAGE ERROR HANDLING
    // ============================================
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            this.style.backgroundColor = '#f3f4f6';
            this.style.padding = '2rem';
            this.alt = 'Image not available';
            
            // Create a fallback div with text
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.image-fallback')) {
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'image-fallback bg-slate-100 p-4 rounded-lg text-center';
                fallbackDiv.innerHTML = `<p class="text-slate-600">Image: ${this.alt}</p>`;
                parent.appendChild(fallbackDiv);
            }
        });
    });
    
    // ============================================
    // 7. PAGE LOAD ANIMATIONS
    // ============================================
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Add fade-in animation to sections
        const sections = document.querySelectorAll('section, .bg-white');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }, 100);
    
    // ============================================
    // 8. CLEAR CACHES ON PAGE LOAD
    // ============================================
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
            });
        });
        
        // Clear cache
        if ('caches' in window) {
            caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                    caches.delete(cacheName);
                });
            });
        }
    }
    
    // ============================================
    // 9. RESPONSIVE MENU TOGGLE (if not in navigation.js)
    // ============================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
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
    }
    
    // ============================================
    // 10. INITIALIZE ALL COMPONENTS
    // ============================================
    console.log('All website components initialized successfully');
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-MW', {
        style: 'currency',
        currency: 'MWK'
    }).format(amount);
}

// Debounce function for scroll/resize events
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}