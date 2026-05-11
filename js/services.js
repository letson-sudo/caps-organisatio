// services.js - Services section functionality for CAPS Malawi website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Services component initialized');
    
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;
    
    // ============================================
    // 1. SERVICE CARDS INTERACTIVE EFFECTS
    // ============================================
    const serviceCards = servicesSection.querySelectorAll('.grid.lg\\:grid-cols-2 > div');
    
    serviceCards.forEach((card, index) => {
        // Add delay based on index for staggered animations
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-on-scroll');
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            this.style.transition = 'all 0.3s ease';
            
            // Highlight the icon
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
            
            // Reset icon
            const icon = this.querySelector('svg');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        // Click to expand description
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const description = this.querySelector('p.text-slate-700');
                if (description) {
                    description.classList.toggle('line-clamp-3');
                    description.classList.toggle('line-clamp-none');
                    
                    // Show/hide "Read more" indicator
                    if (!description.classList.contains('line-clamp-3')) {
                        const readMore = document.createElement('span');
                        readMore.className = 'block mt-2 text-blue-600 text-sm font-medium cursor-pointer';
                        readMore.textContent = 'Show less';
                        readMore.onclick = (e) => {
                            e.stopPropagation();
                            description.classList.add('line-clamp-3');
                            description.classList.remove('line-clamp-none');
                            readMore.remove();
                        };
                        
                        // Remove existing read more if any
                        const existing = description.nextElementSibling;
                        if (existing && existing.className.includes('text-blue-600')) {
                            existing.remove();
                        }
                        
                        description.parentNode.appendChild(readMore);
                    } else {
                        const existing = description.nextElementSibling;
                        if (existing && existing.className.includes('text-blue-600')) {
                            existing.remove();
                        }
                    }
                }
            }
        });
    });
    
    // ============================================
    // 2. SERVICE IMAGE GALLERY FUNCTIONALITY
    // ============================================
    const serviceImages = servicesSection.querySelectorAll('img');
    
    serviceImages.forEach(img => {
        // Make images clickable to view larger
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
        
        // Add loading animation
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add loading state
        if (!img.complete) {
            img.classList.add('loading');
            img.style.backgroundColor = '#f3f4f6';
            img.style.minHeight = '200px';
        }
    });
    
    // ============================================
    // 3. SERVICE CATEGORY FILTERING (if you add more services)
    // ============================================
    function setupServiceFilter() {
        // Create filter buttons if you have multiple service categories
        const filterContainer = document.createElement('div');
        filterContainer.className = 'flex flex-wrap justify-center gap-3 mb-10';
        
        const categories = ['All', 'Health', 'Education', 'Agriculture', 'Human Rights'];
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'px-4 py-2 rounded-full bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 transition-all';
            button.textContent = category;
            button.dataset.filter = category.toLowerCase();
            
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterContainer.querySelectorAll('button').forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white', 'border-blue-500');
                });
                
                // Add active class to clicked button
                this.classList.add('bg-blue-500', 'text-white', 'border-blue-500');
                
                // Filter services
                filterServices(this.dataset.filter);
            });
            
            filterContainer.appendChild(button);
        });
        
        // Add "All" as active by default
        filterContainer.querySelector('button[data-filter="all"]').classList.add('bg-blue-500', 'text-white', 'border-blue-500');
        
        // Insert after the services description
        const description = servicesSection.querySelector('.text-center');
        if (description) {
            description.parentNode.insertBefore(filterContainer, description.nextElementSibling);
        }
    }
    
    // Uncomment to enable service filtering
    // setupServiceFilter();
    
    function filterServices(category) {
        const allCards = servicesSection.querySelectorAll('.grid.lg\\:grid-cols-2 > div');
        
        allCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                // You would need to add data-category attribute to your service cards
                const cardCategory = card.dataset.category || 'all';
                if (cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
    
    // ============================================
    // 4. SERVICE STATISTICS COUNTER
    // ============================================
    function setupServiceStats() {
        // You can add statistics about your services
        const statsContainer = document.createElement('div');
        statsContainer.className = 'grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-10';
        
        const stats = [
            { label: 'Communities Served', value: 150, suffix: '+' },
            { label: 'Health Campaigns', value: 45, suffix: '+' },
            { label: 'Schools Supported', value: 28, suffix: '+' },
            { label: 'Trees Planted', value: 10000, suffix: '+' }
        ];
        
        stats.forEach(stat => {
            const statDiv = document.createElement('div');
            statDiv.className = 'text-center p-6 bg-white rounded-2xl shadow-md border border-slate-200';
            statDiv.innerHTML = `
                <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-2" data-counter="${stat.value}" data-duration="2000">0</div>
                <div class="text-slate-700 font-medium">${stat.label}</div>
            `;
            statsContainer.appendChild(statDiv);
        });
        
        // Insert before the services section ends
        servicesSection.appendChild(statsContainer);
    }
    
    // Uncomment to add service statistics
    // setupServiceStats();
    
    // ============================================
    // 5. IMAGE MODAL FUNCTION
    // ============================================
    function createImageModal(src, alt) {
        // Remove existing modal if any
        const existingModal = document.getElementById('image-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4';
        modal.innerHTML = `
            <div class="relative max-w-4xl max-h-[90vh]">
                <img src="${src}" alt="${alt}" class="w-full h-auto max-h-[80vh] object-contain rounded-lg">
                <div class="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded-lg">
                    <p class="text-sm md:text-base">${alt}</p>
                </div>
                <button id="close-modal" class="absolute top-4 right-4 w-10 h-10 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90">
                    ✕
                </button>
                <button id="download-image" class="absolute top-4 left-4 w-10 h-10 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90" title="Download image">
                    ↓
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal functionality
        modal.addEventListener('click', function(e) {
            if (e.target === this || e.target.id === 'close-modal') {
                this.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Download image functionality
        document.getElementById('download-image').addEventListener('click', function(e) {
            e.stopPropagation();
            const link = document.createElement('a');
            link.href = src;
            link.download = alt.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
            link.click();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    // ============================================
    // 6. SERVICE SECTION VISIBILITY TRACKING
    // ============================================
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Services section is now visible');
                servicesSection.classList.add('services-visible');
                
                // Animate service cards in sequence
                const cards = servicesSection.querySelectorAll('.grid.lg\\:grid-cols-2 > div');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-fade-in-up');
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.2 });
    
    serviceObserver.observe(servicesSection);
    
    // ============================================
    // 7. PRINT SERVICE INFORMATION
    // ============================================
    function setupPrintFunctionality() {
        const printButton = document.createElement('button');
        printButton.className = 'fixed bottom-20 right-4 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-lg hover:bg-slate-50 z-40 print:hidden';
        printButton.innerHTML = `
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
            </svg>
            Print Services
        `;
        
        printButton.addEventListener('click', function() {
            window.print();
        });
        
        document.body.appendChild(printButton);
        
        // Add print styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                .print\\:hidden { display: none !important; }
                #services {
                    page-break-inside: avoid;
                }
                .grid.lg\\:grid-cols-2 > div {
                    page-break-inside: avoid;
                    margin-bottom: 20px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Uncomment to add print button
    // setupPrintFunctionality();
});

// ============================================
// 8. SERVICE-RELATED HELPER FUNCTIONS
// ============================================

// Get all service data (for potential API integration)
function getServiceData() {
    return [
        {
            id: 1,
            title: 'Health & Wellness',
            description: 'We conduct HIV/AIDS awareness campaigns, distribute preventive tools like condoms, and promote nutrition, clean water, and sanitation in vulnerable areas.',
            icon: '🩺',
            image: '/images/health-wellness.jpg',
            stats: { campaigns: 45, peopleReached: 5000 }
        },
        {
            id: 2,
            title: 'Education & Skills Development',
            description: 'Supporting OVCs, women, children, and persons with disabilities, we enhance access to quality education and provide vocational training.',
            icon: '🎓',
            image: '/images/eduskills.jpg',
            stats: { schools: 28, students: 1500 }
        },
        {
            id: 3,
            title: 'Agriculture & Environment',
            description: 'We advance sustainable farming, climate-resilient livelihoods, environmental protection, and reforestation.',
            icon: '🌱',
            image: '/images/agrienv.jpg',
            stats: { trees: 10000, farmers: 300 }
        },
        {
            id: 4,
            title: 'Human Rights & Social Empowerment',
            description: 'Advocating for marginalized groups, we offer counseling for abuse victims and promote gender equality.',
            icon: '⚖️',
            image: '/images/human-rights.jpg',
            stats: { cases: 120, workshops: 35 }
        }
    ];
}

// Export service data for use in other components
window.CAPSServices = {
    getServiceData: getServiceData,
    // Add more service-related functions here
};