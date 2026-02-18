// Load header into all pages
(function() {
    function loadHeader() {
        fetch('header.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load header');
                }
                return response.text();
            })
            .then(data => {
                document.body.insertAdjacentHTML('afterbegin', data);
                // Initialize mobile menu after header is loaded
                initMobileMenu();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: create header inline if fetch fails
                const headerHTML = `
                    <header class="header">
                        <div class="header-container">
                            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <div class="logo-container">
                                <div class="blob-logo desktop-blob"></div>
                                <span class="logo-text">blobs games</span>
                            </div>
                            <div class="blob-logo mobile-blob"></div>
                            <nav class="desktop-nav">
                                <a href="index.html">pier 5411</a>
                                <a href="about.html">about the team</a>
                                <a href="contact.html">contact</a>
                            </nav>
                        </div>
                        <nav class="mobile-nav">
                            <a href="index.html">pier 5411</a>
                            <a href="about.html">about the team</a>
                            <a href="contact.html">contact</a>
                        </nav>
                    </header>
                `;
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
                initMobileMenu();
            });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        // Remove any existing listeners by cloning
        const newToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newToggle, menuToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('active');
        });

        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!newToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
            }
        });
    }
}

// Also initialize if header is already in DOM (for pages that don't use load-header.js)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

