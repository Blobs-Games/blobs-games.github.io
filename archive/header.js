// Shared header HTML - injects into all pages
(function() {
    const headerHTML = `
    <!-- Header -->
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
    
    // Inject header at the beginning of body
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        initMobileMenu();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
            initMobileMenu();
        });
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (menuToggle && mobileNav) {
            menuToggle.addEventListener('click', function(e) {
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
                if (!menuToggle.contains(event.target) && !mobileNav.contains(event.target)) {
                    mobileNav.classList.remove('active');
                }
            });
        }
    }
})();

