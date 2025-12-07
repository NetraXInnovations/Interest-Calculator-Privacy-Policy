// Simplified Privacy Policy Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle dark mode';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.textContent = '🌙';
        }
    });
    
    // Set initial dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
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
                    showCopyFeedback(this, 'Copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy email: ', err);
                    showCopyFeedback(this, 'Copy failed');
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(email, this);
            }
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
            showCopyFeedback(element, successful ? 'Copied to clipboard!' : 'Copy failed');
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            showCopyFeedback(element, 'Copy failed');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Show feedback when copying
    function showCopyFeedback(element, message) {
        const originalText = element.textContent;
        element.textContent = message;
        element.style.fontWeight = '600';
        element.style.color = '#3b82f6';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.fontWeight = '';
            element.style.color = '';
        }, 2000);
    }
    
    // Smooth scrolling for anchor links (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});