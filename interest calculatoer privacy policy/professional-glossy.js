// Professional Glossy Theme Privacy Policy Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle entrance animations
    document.body.classList.add('page-loaded');
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Update scroll progress only (removed header effects)
        updateScrollIndicator();
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Improved scroll handler
    window.addEventListener('scroll', requestTick);
    
    // Enhanced dark mode with glossy theme adjustments
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'action-button dark-mode-toggle';
    darkModeToggle.title = 'Toggle dark mode';
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '🌙';
        }
    });
    
    // Set initial dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    // Enhanced background animation with professional theme
    const body = document.body;
    let hue = 210; // Start with blue hue
    setInterval(() => {
        hue = (hue + 0.3) % 360;
        // Vary between professional blue and teal hues
        const saturation = 65 + Math.sin(hue / 15) * 5;
        const lightness = 40 + Math.cos(hue / 20) * 5;
        body.style.background = `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${(hue + 45) % 360}, ${saturation}%, ${lightness + 8}%) 100%)`;
    }, 100);
    
    // Update scroll indicator function
    function updateScrollIndicator() {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        
        // Create or update progress bar
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.position = 'fixed';
            progressBar.style.top = '0';
            progressBar.style.left = '0';
            progressBar.style.height = '4px';
            progressBar.style.background = 'linear-gradient(90deg, #06d6a0, #3b82f6)';
            progressBar.style.width = '0%';
            progressBar.style.zIndex = '9999';
            progressBar.style.boxShadow = '0 0 15px rgba(6, 214, 160, 0.8)';
            progressBar.style.borderRadius = '0 2px 2px 0';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Copy contact email to clipboard
    const emailElement = document.querySelector('.contact-item:nth-child(2) span');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            const email = this.textContent.trim();
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showCopyFeedback(this, 'Copied!');
                }).catch(() => {
                    showCopyFeedback(this, 'Copy failed');
                });
            } else {
                fallbackCopyTextToClipboard(email, this);
            }
        });
    }
    
    // Fallback copy function
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
            showCopyFeedback(element, successful ? 'Copied!' : 'Copy failed');
        } catch (err) {
            showCopyFeedback(element, 'Copy failed');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Show feedback when copying
    function showCopyFeedback(element, message) {
        const originalText = element.textContent;
        element.textContent = message;
        element.style.fontWeight = '600';
        element.style.backgroundColor = 'rgba(6, 214, 160, 0.3)';
        element.style.borderColor = 'rgba(6, 214, 160, 0.5)';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.fontWeight = '';
            element.style.backgroundColor = '';
            element.style.borderColor = '';
        }, 2000);
    }
    
    // Create table of contents
    createTableOfContents();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add back to top button
    addBackToTopButton();
    
    // Add action buttons container
    const actionButtonsContainer = document.createElement('div');
    actionButtonsContainer.className = 'action-buttons';
    document.body.appendChild(actionButtonsContainer);
    
    // Add buttons to container
    const buttonsToAdd = [darkModeToggle];
    buttonsToAdd.forEach(button => {
        actionButtonsContainer.appendChild(button);
    });
});

// Create table of contents
function createTableOfContents() {
    // Create sidebar
    const tocSidebar = document.createElement('div');
    tocSidebar.className = 'toc-sidebar';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // Create TOC toggle button
    const tocToggle = document.createElement('button');
    tocToggle.className = 'action-button toc-toggle';
    tocToggle.innerHTML = '☰';
    tocToggle.title = 'Table of Contents';
    
    // Add to action buttons
    const actionButtonsContainer = document.querySelector('.action-buttons');
    if (actionButtonsContainer) {
        actionButtonsContainer.insertBefore(tocToggle, actionButtonsContainer.firstChild);
    }
    
    // Build TOC content
    tocSidebar.innerHTML = `
        <h3>Table of Contents</h3>
        <ul class="toc-list"></ul>
    `;
    
    document.body.appendChild(tocSidebar);
    document.body.appendChild(overlay);
    
    // Populate TOC
    const tocList = tocSidebar.querySelector('.toc-list');
    const sections = document.querySelectorAll('.policy-section h2');
    
    sections.forEach((heading, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // Create ID for heading if it doesn't exist
        if (!heading.parentElement.id) {
            heading.parentElement.id = `section-${index + 1}`;
        }
        
        link.href = `#${heading.parentElement.id}`;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Toggle functionality
    tocToggle.addEventListener('click', () => {
        tocSidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    });
    
    // Close when clicking overlay
    overlay.addEventListener('click', () => {
        tocSidebar.classList.remove('open');
        overlay.classList.remove('open');
    });
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close TOC if open
                const tocSidebar = document.querySelector('.toc-sidebar');
                const overlay = document.querySelector('.overlay');
                if (tocSidebar && tocSidebar.classList.contains('open')) {
                    tocSidebar.classList.remove('open');
                    overlay.classList.remove('open');
                }
            }
        });
    });
}

// Add back to top button
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'action-button back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.title = 'Back to Top';
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add to action buttons
    const actionButtonsContainer = document.querySelector('.action-buttons');
    if (actionButtonsContainer) {
        actionButtonsContainer.insertBefore(backToTopButton, actionButtonsContainer.firstChild);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Initially hide the button
    backToTopButton.style.display = 'none';
}