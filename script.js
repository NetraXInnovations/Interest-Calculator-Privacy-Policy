// Enhanced Glossy Theme Privacy Policy Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle entrance animations
    document.body.classList.add('page-loaded');
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        if (header) {
            // Smoother parallax effect
            header.style.transform = `translateY(${scrollPosition * 0.3}px) scale(${1 + Math.min(scrollPosition * 0.0003, 0.05)})`;
        }
        
        // Update scroll progress
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
        section.style.animationDelay = `${index * 0.15}s`;
        section.classList.add('fade-in-up');
    });
    
    // Add subtle background animation with Interest Calculator theme
    const body = document.body;
    let hue = 210; // Start with blue hue
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        // Vary between blue and teal hues for financial theme
        const saturation = 70 + Math.sin(hue / 20) * 10;
        const lightness = 45 + Math.cos(hue / 30) * 5;
        body.style.background = `linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%) 0%, hsl(${(hue + 40) % 360}, ${saturation}%, ${lightness + 5}%) 100%)`;
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
            progressBar.style.background = 'linear-gradient(90deg, #06d6a0, #0ea5e9)';
            progressBar.style.width = '0%';
            progressBar.style.zIndex = '9999';
            progressBar.style.boxShadow = '0 0 15px rgba(6, 214, 160, 0.8)';
            progressBar.style.borderRadius = '0 2px 2px 0';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
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
    
    // Add table of contents functionality
    createTableOfContents();
    
    // Add smooth scrolling to section links
    addSmoothScrolling();
    
    // Add search functionality
    addSearchFunctionality();
    
    // Add print functionality
    addPrintFunctionality();
    
    // Add back to top button
    addBackToTopButton();
});

// Create table of contents
function createTableOfContents() {
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-container';
    tocContainer.innerHTML = `
        <button class="toc-toggle" title="Table of Contents">☰</button>
        <div class="toc-content">
            <h3>Table of Contents</h3>
            <ul class="toc-list"></ul>
        </div>
    `;
    
    document.body.appendChild(tocContainer);
    
    const tocList = tocContainer.querySelector('.toc-list');
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
    const tocToggle = tocContainer.querySelector('.toc-toggle');
    const tocContent = tocContainer.querySelector('.toc-content');
    
    tocToggle.addEventListener('click', () => {
        tocContent.classList.toggle('show');
    });
}

// Add smooth scrolling to section links
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
            }
        });
    });
}

// Add search functionality
function addSearchFunctionality() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <button class="search-toggle" title="Search">🔍</button>
        <div class="search-content">
            <input type="text" class="search-input" placeholder="Search policy...">
            <div class="search-results"></div>
        </div>
    `;
    
    document.body.appendChild(searchContainer);
    
    // Toggle functionality
    const searchToggle = searchContainer.querySelector('.search-toggle');
    const searchContent = searchContainer.querySelector('.search-content');
    const searchInput = searchContainer.querySelector('.search-input');
    
    searchToggle.addEventListener('click', () => {
        searchContent.classList.toggle('show');
        if (searchContent.classList.contains('show')) {
            searchInput.focus();
        }
    });
    
    // Simple search implementation
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const resultsContainer = searchContainer.querySelector('.search-results');
        
        if (searchTerm.length > 2) {
            const policySections = document.querySelectorAll('.policy-section');
            let results = [];
            
            policySections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    const heading = section.querySelector('h2').textContent;
                    results.push({
                        heading: heading,
                        element: section
                    });
                }
            });
            
            displaySearchResults(results, resultsContainer);
        } else {
            resultsContainer.innerHTML = '';
        }
    });
}

function displaySearchResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<p>No results found</p>';
        return;
    }
    
    let html = '<ul>';
    results.forEach(result => {
        const id = result.element.id || result.element.querySelector('h2').parentElement.id;
        html += `<li><a href="#${id}">${result.heading}</a></li>`;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    
    // Add click handlers to results
    container.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.search-content').classList.remove('show');
        });
    });
}

// Add print functionality
function addPrintFunctionality() {
    // Add print button to header
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '🖨️';
    printButton.title = 'Print Privacy Policy';
    printButton.addEventListener('click', () => {
        window.print();
    });
    
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        headerContainer.appendChild(printButton);
    }
}

// Add back to top button
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.title = 'Back to Top';
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}