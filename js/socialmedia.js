// Social media links functionality
document.addEventListener('DOMContentLoaded', function() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            
            let url = '';
            switch(platform) {
                case 'facebook':
                    url = 'https://facebook.com/capsmalawi';
                    break;
                case 'twitter':
                    url = 'https://twitter.com/capsmalawi';
                    break;
                case 'instagram':
                    url = 'https://instagram.com/capsmalawi';
                    break;
                case 'linkedin':
                    url = 'https://linkedin.com/company/capsmalawi';
                    break;
            }
            
            // Update with your actual social media URLs
            alert(`Our ${platform.charAt(0).toUpperCase() + platform.slice(1)} page will open in a new window. Update the link in the code to use your actual social media URL.`);
            
            // Uncomment the line below when you have actual URLs
            // window.open(url, '_blank');
        });
    });
});