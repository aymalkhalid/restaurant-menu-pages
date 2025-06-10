// ==============================================
// NEONBYTE - CYBERPUNK RESTAURANT JAVASCRIPT
// ==============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoading();
    initNavigation();
    initMenuFilter();
    initCounters();
    initGlitchEffects();
    initScrollAnimations();
    initMobileMenu();
    initOrderSystem();
    initParticleEffects();
});

// ==============================================
// LOADING SCREEN
// ==============================================
function initLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    const messages = [
        'INITIALIZING...',
        'LOADING NEURAL NETWORKS...',
        'CONNECTING TO MAINFRAME...',
        'SYNCING REALITY...',
        'WELCOME TO THE FUTURE'
    ];
    
    let messageIndex = 0;
    
    // Animate loading messages
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
            loadingText.textContent = messages[messageIndex];
            messageIndex++;
        }
    }, 600);
    
    // Hide loading screen after animation
    setTimeout(() => {
        clearInterval(messageInterval);
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 3000);
}

// ==============================================
// NAVIGATION
// ==============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.cyber-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.cyber-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// ==============================================
// MENU FILTER
// ==============================================
function initMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu items with animation
            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==============================================
// ANIMATED COUNTERS
// ==============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ==============================================
// GLITCH EFFECTS
// ==============================================
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'rgb-shift 3s ease-in-out infinite';
        });
    });
    
    // Random glitch effect every 10 seconds
    setInterval(() => {
        const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
        if (randomElement) {
            randomElement.style.animation = 'glitch 0.5s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = 'rgb-shift 3s ease-in-out infinite';
            }, 500);
        }
    }, 10000);
}

// ==============================================
// SCROLL ANIMATIONS
// ==============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.menu-item, .special-card, .vip-feature');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        scrollObserver.observe(element);
    });
}

// ==============================================
// MOBILE MENU
// ==============================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.cyber-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ==============================================
// ORDER SYSTEM
// ==============================================
function initOrderSystem() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const orderButton = document.querySelector('.order-btn');
    let cart = [];
    
    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.price').textContent;
            
            // Add item to cart
            cart.push({
                name: itemName,
                price: itemPrice
            });
            
            // Visual feedback
            this.textContent = 'ADDED!';
            this.style.background = 'linear-gradient(45deg, #39ff14, #00ffff)';
            
            setTimeout(() => {
                this.textContent = 'ADD TO CART';
                this.style.background = 'linear-gradient(45deg, var(--neon-pink), var(--neon-purple))';
            }, 1500);
            
            // Update cart counter
            updateCartCounter();
            
            // Cyber effect
            createCyberEffect(this);
        });
    });
    
    // Order button functionality
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            if (cart.length > 0) {
                showOrderModal();
            } else {
                showNotification('Your cart is empty! Add some cyber delicacies first.', 'warning');
            }
        });
    }
    
    function updateCartCounter() {
        if (orderButton) {
            const counter = orderButton.querySelector('.cart-counter') || document.createElement('span');
            counter.className = 'cart-counter';
            counter.textContent = cart.length;
            counter.style.cssText = `
                position: absolute;
                top: -8px;
                right: -8px;
                background: var(--neon-pink);
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 0.7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            `;
            
            if (!orderButton.querySelector('.cart-counter')) {
                orderButton.style.position = 'relative';
                orderButton.appendChild(counter);
            }
        }
    }
    
    function showOrderModal() {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>YOUR CYBER ORDER</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    ${cart.map(item => `
                        <div class="cart-item">
                            <span>${item.name}</span>
                            <span>${item.price}</span>
                        </div>
                    `).join('')}
                    <div class="cart-total">
                        <strong>Total: ${calculateTotal()}</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="cyber-btn primary" onclick="processOrder()">PROCESS ORDER</button>
                    <button class="cyber-btn secondary" onclick="clearCart()">CLEAR CART</button>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    function calculateTotal() {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price;
        }, 0).toFixed(2);
    }
    
    window.processOrder = function() {
        showNotification('Order processed! Welcome to the future of dining.', 'success');
        cart = [];
        updateCartCounter();
        document.querySelector('.order-modal').remove();
    };
    
    window.clearCart = function() {
        cart = [];
        updateCartCounter();
        document.querySelector('.order-modal').remove();
        showNotification('Cart cleared!', 'info');
    };
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================
function createCyberEffect(element) {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: cyber-pulse 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(effect);
    
    setTimeout(() => {
        element.removeChild(effect);
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'var(--neon-green)',
        warning: 'var(--neon-orange)',
        error: 'var(--neon-pink)',
        info: 'var(--neon-cyan)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 2rem;
        border-radius: 8px;
        border-left: 4px solid ${colors[type]};
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: var(--font-secondary);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initParticleEffects() {
    // Add floating particles to hero section
    const hero = document.querySelector('.cyber-hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--neon-cyan);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
            box-shadow: 0 0 6px currentColor;
        `;
        
        hero.appendChild(particle);
    }
}

// ==============================================
// FORM HANDLING
// ==============================================
document.addEventListener('submit', function(e) {
    if (e.target.closest('.reservation-form')) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const reservationData = Object.fromEntries(formData);
        
        // Simulate form submission
        showNotification('Reservation submitted! We\'ll contact you soon.', 'success');
        e.target.reset();
        
        // Add some cyber flair
        const submitButton = e.target.querySelector('.cyber-btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'PROCESSING...';
        submitButton.style.background = 'linear-gradient(45deg, var(--neon-green), var(--neon-cyan))';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 2000);
    }
});

// ==============================================
// ADDITIONAL CSS ANIMATIONS VIA JAVASCRIPT
// ==============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes cyber-pulse {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes float-particle {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .cyber-nav.active {
        display: block !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-primary);
        border-top: 1px solid var(--neon-cyan);
        padding: 1rem 0;
    }
    
    .cyber-nav.active ul {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .cyber-nav {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ==============================================
// EASTER EGGS & FUN FEATURES
// ==============================================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateCheatMode();
        konamiCode = [];
    }
});

function activateCheatMode() {
    showNotification('CHEAT MODE ACTIVATED! 🎮', 'success');
    
    // Add rainbow effect to all neon elements
    const neonElements = document.querySelectorAll('.neon-text, .neon-glow');
    neonElements.forEach(element => {
        element.style.animation = 'rgb-shift 0.5s ease-in-out infinite';
    });
    
    // Add matrix rain effect
    createMatrixRain();
    
    setTimeout(() => {
        neonElements.forEach(element => {
            element.style.animation = '';
        });
    }, 10000);
}

function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    
    document.body.appendChild(matrixContainer);
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            top: -100%;
            left: ${Math.random() * 100}%;
            color: var(--neon-green);
            font-family: monospace;
            font-size: 1rem;
            animation: matrix-fall ${Math.random() * 3 + 2}s linear infinite;
            opacity: 0.7;
        `;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
    
    setTimeout(() => {
        document.body.removeChild(matrixContainer);
    }, 10000);
}

// Add matrix rain animation
const matrixStyle = document.createElement('style');
matrixStyle.textContent = `
    @keyframes matrix-fall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(matrixStyle);
