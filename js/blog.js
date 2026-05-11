// Blog button functionality
document.addEventListener('DOMContentLoaded', function() {
    const blogButton = document.querySelector('.blog-btn');
    
    if (blogButton) {
        blogButton.addEventListener('click', function() {
            alert('Our blog is coming soon! Check back later for inspiring stories and updates from our work in Malawi.');
        });
    }
});