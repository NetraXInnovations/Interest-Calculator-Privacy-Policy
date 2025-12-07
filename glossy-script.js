// Glossy Theme Privacy Policy Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced dark mode with glossy theme adjustments
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '✨';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle glossy mode';
    darkModeToggle.setAttribute('aria-label', 'Toggle glossy mode');
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('glossy-dark');
        // Save preference to localStorage
        if (document.body.classList.contains('glossy-dark')) {
            localStorage.setItem('glossyMode', 'enabled');
            darkModeToggle.textContent = '🌟';
        } else {
            localStorage.setItem('glossyMode', 'disabled');
            darkModeToggle.textContent = '✨';
        }
    });
    
    // Set initial glossy mode state
    if (localStorage.getItem('glossyMode') === 'enabled') {
        document.body.classList.add('glossy-dark');
        darkModeToggle.textContent = '🌟';
    }
    
    // Add dark mode toggle to header
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        headerContainer.appendChild(darkModeToggle);
    }
    
    // Copy contact email to clipboard when clicked
    const emailElement = document.querySelector('.contact-item:nth-child(2) span');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent.trim();
            
            // Try modern clipboard API first
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showCopyFeedback(this, 'Copied! ✅');
                }).catch(err => {
                    console.error('Failed to copy email: ', err);
                    showCopyFeedback(this, 'Copy failed ❌');
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(email, this);
            }
        });
        
        // Add glow effect on hover
        emailElement.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(255, 46, 99, 0.6)';
        });
        
        emailElement.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    }
    
    // Fallback copy function for older browsers
    function fallbackCopyTextToClipboard(text, element) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            showCopyFeedback(element, successful ? 'Copied! ✅' : 'Copy failed ❌');
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            showCopyFeedback(element, 'Copy failed ❌');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Show feedback when copying
    function showCopyFeedback(element, message) {
        const originalText = element.textContent;
        element.textContent = message;
        element.style.fontWeight = '600';
        element.style.color = '#ff2e63';
        element.style.boxShadow = '0 0 20px rgba(255, 46, 99, 0.8)';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.fontWeight = '';
            element.style.color = '';
            element.style.boxShadow = '';
        }, 2000);
    }
    
    // Add floating animation to sections
    const sections = document.querySelectorAll('.policy-section');
    sections.forEach((section, index) => {
        // Add delay for staggered animation
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        if (header) {
            header.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Add shine effect to buttons on hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        });
    });
});