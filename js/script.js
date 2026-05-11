// script.js - General utilities and helper functions for CAPS Malawi website

class CAPSUtils {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('CAPS Utilities initialized');
        this.setupGlobalEventListeners();
        this.initializeComponents();
        this.setupErrorHandling();
    }
    
    // ============================================
    // 1. GLOBAL EVENT LISTENERS
    // ============================================
    setupGlobalEventListeners() {
        // Handle all external links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes(window.location.hostname)) {
                e.preventDefault();
                const confirmLeave = confirm('You are leaving CAPS Malawi website. Continue?');
                if (confirmLeave) {
                    window.open(link.href, '_blank');
                }
            }
        });
        
        // Add loading state to all buttons
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && !button.hasAttribute('disabled')) {
                const originalText = button.innerHTML;
                button.innerHTML = `
                    <span class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </span>
                `;
                button.setAttribute('disabled', 'true');
                
                // Reset button after 2 seconds (simulate loading)
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.removeAttribute('disabled');
                }, 2000);
            }
        });
    }
    
    // ============================================
    // 2. COMPONENT INITIALIZATION
    // ============================================
    initializeComponents() {
        this.initCounters();
        this.initTooltips();
        this.initLazyLoading();
        this.initScrollAnimations();
    }
    
    // Animated counters for statistics
    initCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                    this.animateCounter(counter, target, duration);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = this.formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = this.formatNumber(Math.floor(start));
            }
        }, 16);
    }
    
    // Tooltip system
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            const tooltipText = element.getAttribute('data-tooltip');
            
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg';
                tooltip.textContent = tooltipText;
                
                const rect = element.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - 10}px`;
                tooltip.style.transform = 'translate(-50%, -100%)';
                
                tooltip.id = 'active-tooltip';
                document.body.appendChild(tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                const tooltip = document.getElementById('active-tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    }
    
    // Lazy loading for images
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img.lazy-load').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Scroll animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ============================================
    // 3. ERROR HANDLING
    // ============================================
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error caught:', e.error);
            // You could send this to an error tracking service
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // ============================================
    // 4. HELPER FUNCTIONS
    // ============================================
    
    // Format numbers with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // Format currency (Malawian Kwacha)
    formatCurrency(amount) {
        return `MK ${this.formatNumber(amount)}`;
    }
    
    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-MW', options);
    }
    
    // Debounce function
    debounce(func, wait = 100) {
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
    
    // Throttle function
    throttle(func, limit = 100) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Copy to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            this.showNotification('Failed to copy', 'error');
        });
    }
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };
        
        notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${colors[type]} transition-transform transform translate-x-full`;
        notification.textContent = message;
        notification.id = 'caps-notification';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Get current year for footer
    getCurrentYear() {
        return new Date().getFullYear();
    }
    
    // Check if mobile device
    isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Detect preferred color scheme
    getColorScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Set theme based on preference
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('caps-theme', theme);
    }
    
    // Toggle theme
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// ============================================
// 5. INITIALIZE UTILITIES WHEN DOCUMENT IS READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    window.CAPS = new CAPSUtils();
    
    // Update footer year automatically
    const yearElements = document.querySelectorAll('[data-current-year]');
    yearElements.forEach(el => {
        el.textContent = window.CAPS.getCurrentYear();
    });
    
    // Initialize theme
    const savedTheme = localStorage.getItem('caps-theme');
    if (savedTheme) {
        window.CAPS.setTheme(savedTheme);
    } else {
        window.CAPS.setTheme(window.CAPS.getColorScheme());
    }
    
    console.log('All utilities loaded successfully');
});