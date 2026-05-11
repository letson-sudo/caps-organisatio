// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. We will get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
            
            // Optional: You could add actual form submission here
            // Example using Formspree or similar service:
            // const formData = new FormData(contactForm);
            // fetch('https://formspree.io/f/your-form-id', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // }).then(response => {
            //     if (response.ok) {
            //         alert('Thank you for contacting us!');
            //         contactForm.reset();
            //     } else {
            //         alert('Oops! There was a problem submitting your form.');
            //     }
            // });
        });
    }
    
    // Add hover effects to contact cards
    const contactCards = document.querySelectorAll('#contact .group');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('scale-105');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('scale-105');
        });
    });
});