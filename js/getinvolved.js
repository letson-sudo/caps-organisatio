// Get Involved buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const getInvolvedButtons = document.querySelectorAll('.getinvolved-btn');
    
    getInvolvedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            let message = '';
            
            switch(type) {
                case 'volunteer':
                    message = 'Thank you for your interest in volunteering! Please email us at info@caps-malawi.org with your skills and availability.';
                    break;
                case 'partner':
                    message = 'Great! To discuss partnership opportunities, please contact us at info@caps-malawi.org.';
                    break;
                case 'donate':
                    message = 'Thank you for considering a donation! Scroll down to see our donation options and bank details.';
                    // Scroll to donate section
                    const donateSection = document.getElementById('donate');
                    if (donateSection) {
                        donateSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
                default:
                    message = 'Thank you for your interest!';
            }
            
            if (type !== 'donate') {
                alert(message);
            }
        });
    });
});