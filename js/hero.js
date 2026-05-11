// hero.js - Hero section functionality for CAPS Malawi website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Hero component initialized');
    
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    // 1. TYPING ANIMATION FOR HERO TEXT (Optional)
    const heroTitle = heroSection.querySelector('h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent || 'CAPS';
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after 500ms
        setTimeout(typeWriter, 500);
    }
    
    // 2. PARALLAX SCROLL EFFECT
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Adjust this value for more/less effect
        
        // Apply parallax to hero elements
        const heroContent = heroSection.querySelector('.text-center');
        if (heroContent) {
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // 3. HERO BACKGROUND GRADIENT ANIMATION
    function animateHeroBackground() {
        const heroBg = document.querySelector('.min-h-screen.bg-gradient-to-br');
        if (!heroBg) return;
        
        // Create dynamic gradient animation
        let hue1 = 200; // Starting blue hue
        let hue2 = 250; // Starting purple hue
        
        function updateGradient() {
            // Slightly shift hues for subtle animation
            hue1 = (hue1 + 0.1) % 360;
            hue2 = (hue2 + 0.05) % 360;
            
            // Update the gradient
            heroBg.style.background = `
                linear-gradient(
                    135deg,
                    hsl(${hue1}, 100%, 97%) 0%,
                    hsl(210, 100%, 97%) 50%,
                    hsl(${hue2}, 100%, 97%) 100%
                )
            `;
            
            requestAnimationFrame(updateGradient);
        }
        
        // Start animation
        updateGradient();
    }
    
    // Uncomment the line below for gradient animation (can be heavy on some browsers)
    // animateHeroBackground();
    
    // 4. HERO SCROLL INDICATOR
    function createScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce';
        scrollIndicator.innerHTML = `
            <div class="flex flex-col items-center">
                <span class="text-slate-600 text-sm mb-2">Scroll to explore</span>
                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        `;
        
        heroSection.style.position = 'relative';
        heroSection.appendChild(scrollIndicator);
        
        // Remove indicator after user starts scrolling
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
                setTimeout(() => scrollIndicator.remove(), 500);
            }
        });
    }
    
    createScrollIndicator();
    
    // 5. HERO INTERACTIVE ELEMENTS
    const heroElements = heroSection.querySelectorAll('h1, p');
    heroElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 6. HERO SECTION VISIBILITY TRACKING
    const observerOptions = {
        threshold: 0.5 // Trigger when 50% of hero is visible
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Hero section is now visible');
                document.body.classList.add('hero-visible');
            } else {
                document.body.classList.remove('hero-visible');
            }
        });
    }, observerOptions);
    
    observer.observe(heroSection);
});