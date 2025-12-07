// Privacy Policy Page Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Viewport detection helper
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }
    
    function isDesktop() {
        return window.innerWidth > 1024;
    }

    // Responsive adjustments
    function adjustForScreenSize() {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        
        if (isMobile()) {
            // Mobile-specific adjustments
            document.body.classList.add('mobile-view');
            document.body.classList.remove('tablet-view', 'desktop-view');
        } else if (isTablet()) {
            // Tablet-specific adjustments
            document.body.classList.add('tablet-view');
            document.body.classList.remove('mobile-view', 'desktop-view');
        } else {
            // Desktop-specific adjustments
            document.body.classList.add('desktop-view');
            document.body.classList.remove('mobile-view', 'tablet-view');
        }
        
        // Position dark mode toggle appropriately
        const headerContainer = document.querySelector('header .container');
        if (darkModeToggle && headerContainer) {
            headerContainer.appendChild(darkModeToggle);
        }
    }

    // Initial adjustment
    adjustForScreenSize();

    // Adjust on resize and orientation change
    window.addEventListener('resize', adjustForScreenSize);
    window.addEventListener('orientationchange', adjustForScreenSize);
    // Add animation to sections when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.filter = 'blur(0)';
            }
        });
    }, observerOptions);

    // Apply animation to policy sections
    document.querySelectorAll('.policy-section').forEach(section => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease';
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.filter = 'blur(2px)';
        observer.observe(section);
    });

    // Copy contact email to clipboard when clicked
    const emailElement = document.querySelector('.contact-item:nth-child(2) span');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        
        // Add both click and touch events for better mobile support
        function copyEmail() {
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                // Show temporary confirmation
                const originalText = this.textContent;
                this.textContent = 'Copied to clipboard!';
                this.style.color = '#ff2e63';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                
                // Fallback for older browsers
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Show confirmation
                    const originalText = this.textContent;
                    this.textContent = 'Copied to clipboard!';
                    this.style.color = '#ff2e63';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 2000);
                } catch (fallbackErr) {
                    console.error('Fallback copy failed: ', fallbackErr);
                }
            });
        }
        
        emailElement.addEventListener('click', copyEmail);
        emailElement.addEventListener('touchstart', copyEmail);
    }

    // Enhanced dark mode with glassmorphism adjustments
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌓';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle dark mode';
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        
        // Adjust glassmorphism effects for dark mode
        adjustGlassmorphism();
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // The dark mode toggle is now handled by the responsive function above
    // This ensures it's always properly positioned

    // Adjust glassmorphism effects based on mode
    function adjustGlassmorphism() {
        const glassElements = document.querySelectorAll('.policy-section, .contact-section, header, footer');
        glassElements.forEach(el => {
            if (document.body.classList.contains('dark-mode')) {
                el.style.setProperty('--glass-bg', 'rgba(26, 11, 46, 0.9)');
                el.style.setProperty('--glass-border', 'rgba(106, 17, 203, 0.4)');
            } else {
                el.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.85)');
                el.style.setProperty('--glass-border', 'rgba(106, 17, 203, 0.25)');
            }
        });
    }

    // Initial adjustment
    adjustGlassmorphism();
});

// Add dark mode styles dynamically
const darkModeStyles = `
.dark-mode {
    --background-color: #1a0b2e;
    --text-color: #f8f9fa;
    --border-color: #444444;
    --glass-bg: rgba(26, 11, 46, 0.9);
    --glass-border: rgba(106, 17, 203, 0.4);
}

.dark-mode body {
    background: linear-gradient(135deg, #1a0b2e 0%, #0b1a2e 100%);
}

.dark-mode header {
    background: rgba(26, 11, 46, 0.95);
}

.dark-mode .policy-header h1 {
    color: #ff2e63;
    text-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.dark-mode .policy-section h2 {
    color: #ff2e63;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-mode .policy-section {
    background: transparent;
    border: none;
}

.dark-mode .contact-section {
    background: transparent;
    border: none;
}

.dark-mode footer {
    background: transparent;
}

.dark-mode hr {
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.dark-mode .policy-section li::before {
    color: #ff2e63;
}

.dark-mode .last-updated {
    color: #ff2e63;
    background: transparent;
}

.dark-mode .contact-item strong {
    color: #ff2e63;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-mode .contact-item span {
    color: white;
}

.dark-mode .contact-item span:hover {
    background: transparent;
    color: #ff2e63;
}

.dark-mode-toggle {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s ease;
    margin-left: 1rem;
}

.dark-mode-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
}
`;

// Inject dark mode styles
const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);