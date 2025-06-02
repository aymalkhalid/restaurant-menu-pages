document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Menu Categories Filtering
    const categoryButtons = document.querySelectorAll('.category-button');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length > 0 && menuItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show all items if 'all' is selected, otherwise filter
                if (category === 'all') {
                    menuItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    menuItems.forEach(item => {
                        if (item.getAttribute('data-category') === category) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // Favorite Button Toggle
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    
    if (favoriteButtons.length > 0) {
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                
                if (icon) {
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        // Could add logic to save to favorites in a real application
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                    }
                }
            });
        });
    }

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get item details
                const menuItem = this.closest('.menu-item');
                const itemName = menuItem.querySelector('h3').textContent;
                const itemPrice = menuItem.querySelector('.price').textContent;
                
                // In a real application, you would add to cart here
                alert(`Added ${itemName} (${itemPrice}) to your cart!`);
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Review Form Toggle
    const reviewButton = document.querySelector('.review-button');
    
    if (reviewButton) {
        reviewButton.addEventListener('click', function() {
            // In a real application, this would show a review form
            alert('Review form would be displayed here!');
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // In a real application, this would submit the form to a server
                alert(`Thank you for subscribing with: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // Lazy Loading Images
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        // You could implement a JavaScript lazy loading solution here
    }
});
