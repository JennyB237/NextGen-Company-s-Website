 // DOM Content Loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all functionality
            initNavbar();
            initSmoothScrolling();
            initTestimonialSlider();
            initNewsletterForm();
            initScrollAnimations();
            initMobileNavToggle();
        }));

        // Navbar functionality
        function initNavbar() {
            const header = document.querySelector('.header');
            const navbar = document.querySelector('.navbar');
            
            // Header scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.style.background = 'rgba(248, 250, 252, 0.98)';
                    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                } else {
                    header.style.background = 'rgba(248, 250, 252, 0.95)';
                    header.style.boxShadow = 'none';
                }
            });

            // Active nav link highlighting
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section[id]');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= sectionTop - 200) {
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
        }

        // Mobile navigation toggle
        function initMobileNavToggle() {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');

            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for anchor links
        function initSmoothScrolling() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Testimonial slider functionality
        function initTestimonialSlider() {
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.testimonial-prev');
            const nextBtn = document.querySelector('.testimonial-next');
            
            let currentTestimonial = 0;
            const totalTestimonials = testimonialCards.length;

            function showTestimonial(index) {
                // Hide all testimonials
                testimonialCards.forEach(card => {
                    card.classList.remove('active');
                });
                
                // Remove active class from all dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                // Show current testimonial
                testimonialCards[index].classList.add('active');
                dots[index].classList.add('active');
            }

            function nextTestimonial() {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(currentTestimonial);
            }

            function prevTestimonial() {
                currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentTestimonial);
            }

            // Event listeners
            nextBtn.addEventListener('click', nextTestimonial);
            prevBtn.addEventListener('click', prevTestimonial);

            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentTestimonial = index;
                    showTestimonial(currentTestimonial);
                });
            });

            // Auto-play testimonials
            setInterval(nextTestimonial, 5000);

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevTestimonial();
                } else if (e.key === 'ArrowRight') {
                    nextTestimonial();
                }
            });
        }

        // Newsletter form handling
        function initNewsletterForm() {
            const newsletterForm = document.getElementById('newsletterForm');
            
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (email) {
                    // Simulate API call
                    const submitBtn = newsletterForm.querySelector('button');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.textContent = 'Subscribing...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        submitBtn.textContent = 'Subscribed!';
                        submitBtn.style.background = '#4ade80';
                        emailInput.value = '';
                        
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1000);
                    
                    // Show success message
                    showNotification('Thank you for subscribing to our newsletter!', 'success');
                }
            });
        }

        // Scroll animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const animatedElements = document.querySelectorAll('.service-card, .project-card, .tech-item, .stat');
            animatedElements.forEach(el => {
                el.classList.add('loading');
                observer.observe(el);
            });

            // Counter animation for stats
            const statsNumbers = document.querySelectorAll('.stat-number');
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            statsNumbers.forEach(stat => {
                statsObserver.observe(stat);
            });
        }

        // Counter animation function
        function animateCounter(element) {
            const target = parseInt(element.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const suffix = element.textContent.includes('+') ? '+' : '';
                element.textContent = Math.floor(current) + suffix;
            }, 16);
        }

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // Styles for notification
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '1rem 2rem',
                borderRadius: '10px',
                color: 'white',
                fontWeight: '600',
                zIndex: '10000',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease',
                maxWidth: '300px'
            });

            // Set background color based on type
            switch (type) {
                case 'success':
                    notification.style.background = '#10b981';
                    break;
                case 'error':
                    notification.style.background = '#E94E1B';
                    break;
                default:
                    notification.style.background = '#00AEEF';
            }

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Remove after 5 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 5000);
        }

        // Button interactions
        document.addEventListener('click', (e) => {
            // CTA button interactions
            if (e.target.classList.contains('cta-primary') || e.target.classList.contains('cta-secondary')) {
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }

            // View project button interactions
            if (e.target.classList.contains('view-project')) {
                showNotification('Project details coming soon!', 'info');
            }

            // Apply for internship button
            if (e.target.textContent === 'Apply for Internship') {
                showNotification('Redirecting to application form...', 'info');
            }
        });

        // Intersection Observer for fade-in animations
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        // Apply fade-in animation to sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(section);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-elements .element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Performance optimization for scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const debouncedScroll = debounce(() => {
            // Scroll-based animations or calculations
        }, 16);

        window.addEventListener('scroll', debouncedScroll);

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('An error occurred:', e.error);
        });

        // Console welcome message
        console.log(`
        🚀 Welcome to NextGenLab!
        🔬 Innovation • Technology • Excellence
        💡 Built with the NextGenLab color palette
        `);