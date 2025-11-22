// NXSYS Website JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        this.classList.toggle('active');
    });
}

// Mobile Dropdown Toggle
const dropdownItems = document.querySelectorAll('.dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('a');

    // Only add click handler on mobile
    if (window.innerWidth <= 768) {
        link.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Sticky Navigation
const mainNav = document.getElementById('mainNav');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Ignore empty hash
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const offsetTop = target.offsetTop - 100; // Account for fixed header

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Formspree Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        if (btnText && btnLoader && submitBtn) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
        }

        // Hide previous status messages
        if (formStatus) {
            formStatus.style.display = 'none';
        }

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success - show success message
                if (formStatus) {
                    formStatus.textContent = '✓ Thank you for your message! We will get back to you within 24 hours.';
                    formStatus.className = 'success-message';
                    formStatus.style.display = 'block';
                }

                // Reset form
                contactForm.reset();

                // Scroll to status message
                if (formStatus) {
                    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                // Error response from Formspree
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            // Error - show error message
            if (formStatus) {
                formStatus.textContent = '✗ Sorry, there was an error sending your message. Please try again or email us directly at info@nxsys.com';
                formStatus.className = 'error-message';
                formStatus.style.display = 'block';
            }
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            if (btnText && btnLoader && submitBtn) {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        }
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.service-card, .why-card, .industry-card, .solution-card, .case-study-card, .stat-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlusSign = target.includes('+');
    const numericValue = parseInt(target.replace(/\D/g, ''));

    let current = 0;
    const increment = numericValue / 50; // Adjust speed here

    const updateCounter = () => {
        current += increment;

        if (current < numericValue) {
            element.textContent = Math.floor(current) + (isPlusSign ? '+' : '') + (isPercentage ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 150) {
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

// Prevent dropdown links from closing on mobile when clicking
if (window.innerWidth <= 768) {
    const dropdownLinks = document.querySelectorAll('.dropdown > a');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.nextElementSibling && this.nextElementSibling.classList.contains('dropdown-menu')) {
                e.preventDefault();
                e.stopPropagation();

                // Close other dropdowns
                dropdownItems.forEach(item => {
                    if (item !== this.parentElement) {
                        item.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                this.parentElement.classList.toggle('active');
            }
        });
    });
}

// Add loaded class to body for animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');

            // Remove active class from dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }, 250);
});

// Add CSS class for scrolled navigation
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        mainNav.classList.add('nav-scrolled');
    } else {
        mainNav.classList.remove('nav-scrolled');
    }
});
