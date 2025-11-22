// NXSYS Parallax Engine - Advanced scroll and animation effects

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // Scroll-based Parallax Effect
    // ==========================================

    let ticking = false;
    let lastScrollY = window.pageYOffset;

    function updateParallax() {
        const scrollY = window.pageYOffset;

        // Parallax background layers
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach((layer, index) => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Hero parallax backgrounds
        const heroBg = document.querySelector('.hero-parallax-bg');
        if (heroBg) {
            const yPos = scrollY * 0.5;
            heroBg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }

        // Glow orbs float effect
        const glowOrbs = document.querySelectorAll('.glow-orb');
        glowOrbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = scrollY * speed;
            const xPos = Math.sin(scrollY * 0.001 + index) * 30;
            orb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        });

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });

    // ==========================================
    // Intersection Observer for Reveal Animations
    // ==========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal for performance
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
        '.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale'
    );
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // Magnetic Button Effect (Mouse Follow)
    // ==========================================

    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // ==========================================
    // 3D Tilt Card Effect
    // ==========================================

    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Counter Animation for Numbers
    // ==========================================

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Observe counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.count || entry.target.textContent.replace(/\D/g, ''));
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number, .metric-card h3').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================

    const navbar = document.getElementById('mainNav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ==========================================
    // Parallax Mouse Move Effect on Hero
    // ==========================================

    const investorHero = document.querySelector('.investor-hero');
    if (investorHero) {
        investorHero.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const orbs = investorHero.querySelectorAll('.glow-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ==========================================
    // Initialize Ticker Scroll
    // ==========================================

    const tickers = document.querySelectorAll('.ticker');
    tickers.forEach(ticker => {
        const tickerContent = ticker.innerHTML;
        ticker.innerHTML = tickerContent + tickerContent; // Duplicate for seamless loop
    });

    // ==========================================
    // Performance: Disable parallax on mobile
    // ==========================================

    if (window.innerWidth < 768) {
        document.querySelectorAll('.parallax-section').forEach(section => {
            section.style.backgroundAttachment = 'scroll';
        });
    }

    // ==========================================
    // Reduced Motion Preference
    // ==========================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ==========================================
    // Load animations on page load
    // ==========================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ==========================================
    // Scroll Progress Indicator (Optional)
    // ==========================================

    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    console.log('🚀 NXSYS Parallax Engine Initialized');
});
