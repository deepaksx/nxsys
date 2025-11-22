// AI Innovation Page Animations

document.addEventListener('DOMContentLoaded', function() {

    // Intersection Observer for fade-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all AI project cards
    const projectCards = document.querySelectorAll('.ai-project-card[data-animate="fade-up"]');
    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.ai-hero::before');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            if (hero.style) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }
    });

    // Counter animation for metrics
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isPlusSign = target.includes('+');
        const hasX = target.includes('x');

        let numericValue;
        if (hasX) {
            numericValue = parseInt(target.replace('x', ''));
        } else {
            numericValue = parseInt(target.replace(/\D/g, ''));
        }

        if (isNaN(numericValue)) return;

        let current = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current);
            if (hasX) {
                element.textContent = displayValue + 'x';
            } else if (isPlusSign && isPercentage) {
                element.textContent = displayValue + '+%';
            } else if (isPlusSign) {
                element.textContent = displayValue + '+';
            } else if (isPercentage) {
                element.textContent = displayValue + '%';
            } else {
                element.textContent = displayValue;
            }
        }, stepTime);
    }

    // Observe metric values for counter animation
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target.querySelector('.metric-value');
                if (metricValue && !metricValue.classList.contains('animated')) {
                    metricValue.classList.add('animated');
                    animateCounter(metricValue);
                }
                metricObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.impact-metric').forEach(metric => {
        metricObserver.observe(metric);
    });

    // Observe mini stats in hero
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('strong');
                if (statValue && !statValue.classList.contains('animated')) {
                    statValue.classList.add('animated');
                    animateCounter(statValue);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.ai-stat-mini').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add hover effect to feature list items
    const featureItems = document.querySelectorAll('.ai-features-list li');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Progressive image loading for better performance
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add typing effect to AI badge (optional enhancement)
    const badge = document.querySelector('.ai-badge');
    if (badge) {
        const text = badge.textContent;
        badge.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // Add stagger animation to advantage cards
    const advantageCards = document.querySelectorAll('.advantage-card');
    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    entry.target.style.transition = 'all 0.6s ease';

                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                }, index * 100);

                advantageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    advantageCards.forEach(card => {
        advantageObserver.observe(card);
    });

    // Add pulse animation to CTA button
    const ctaButton = document.querySelector('.cta-section .btn-primary');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // Smooth reveal for project positioning boxes
    const positioningBoxes = document.querySelectorAll('.ai-positioning');
    const positioningObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-20px)';
                entry.target.style.transition = 'all 0.8s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 200);

                positioningObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    positioningBoxes.forEach(box => {
        positioningObserver.observe(box);
    });

});
