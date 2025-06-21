// Advanced JavaScript for Premium Website Experience

class TriadWebsite {
  constructor() {
    this.isLoaded = false;
    this.currentTheme = 'light';
    this.scrollPosition = 0;
    this.animations = new Map();
    this.observers = new Map();
    this.floatingContact = null;
    this.floatingContactButton = null;
    this.floatingContactForm = null;
    this.closeFloatingForm = null;
    this.contactSection = null;
    
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setupLoadingSequence();
    this.setupThemeToggle();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupIntersectionObserver();
    this.setupServiceCards();
    this.setupFormHandling();
    this.setupCountingAnimations();
    this.setupParallaxEffects();
    this.setupMicroInteractions();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    this.setupVectorAnimations();
    this.setupMobileMenu();
    this.setupFloatingContact();
    this.setupTypedAnimation();
    
    // Complete loading sequence
    setTimeout(() => this.completeLoading(), 1500);
    
    // Ensure responsive styles are applied on first load (fix for mobile view bug)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
      this.handleResize();
    }
  }

  // Loading Skeleton Management
  setupLoadingSequence() {
    const skeleton = document.getElementById('loadingSkeleton');
    if (!skeleton) return;

    // Preload critical resources
    this.preloadCriticalResources();
    
    // Show progressive loading
    this.showProgressiveLoading();
  }

  preloadCriticalResources() {
    const criticalImages = [
      '/public/assets/adams.png?height=50&width=50',
      '/public/assets/fraxioned.png?height=38&width=44',
      '/public/assets/calnet.png?height=52&width=22',
      '/public/assets/tring.png?height=32&width=32'

    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  }

  showProgressiveLoading() {
    const skeleton = document.getElementById('loadingSkeleton');
    if (!skeleton) return;
    
    const elements = skeleton.querySelectorAll('[class*="skeleton-"]');
    
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = 'shimmer 1s ease-in-out';
      }, index * 200);
    });
  }

  completeLoading() {
    const skeleton = document.getElementById('loadingSkeleton');
    if (skeleton) {
      skeleton.classList.add('hidden');
      setTimeout(() => skeleton.remove(), 300);
    }
    
    this.isLoaded = true;
    this.triggerInitialAnimations();
  }

  // Vector Animation Setup
  setupVectorAnimations() {
    const vectorLines = document.querySelectorAll('.vector-line');
    const vectorDots = document.querySelectorAll('.vector-dot');
    const connectionLines = document.querySelectorAll('.connection-line');
    
    // Trigger vector animations when services section is in view
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const vectorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startVectorAnimations();
            vectorObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      vectorObserver.observe(servicesSection);
      this.observers.set('vector', vectorObserver);
    }
  }

  startVectorAnimations() {
    const vectorLines = document.querySelectorAll('.vector-line');
    const vectorDots = document.querySelectorAll('.vector-dot');
    const connectionLines = document.querySelectorAll('.connection-line');
    
    // Start line animations
    vectorLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.animationPlayState = 'running';
      }, index * 1000);
    });
    
    // Start dot animations
    vectorDots.forEach((dot, index) => {
      setTimeout(() => {
        dot.style.animationPlayState = 'running';
      }, index * 500);
    });
    
    // Start connection line animations
    connectionLines.forEach((line, index) => {
      setTimeout(() => {
        line.style.animationPlayState = 'running';
      }, 2000 + (index * 800));
    });
  }

  // Theme Management with System Preference Detection
  setupThemeToggle() {
    // Always set to dark on load
    this.setTheme('dark');
    // Remove or comment out any code that allows toggling to light
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }
    
    localStorage.setItem('theme', theme);
    
    // Update meta theme-color for mobile browsers
    let metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.head.appendChild(metaTheme);
    }
    metaTheme.content = theme === 'dark' ? '#111827' : '#ffffff';
  }

  triggerThemeTransition() {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

  // Mobile Menu Setup
  setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileToggle || !navLinks) return;
    
    let isMenuOpen = false;
    
    // Function to check if on a mobile screen
    const isMobileScreen = () => window.innerWidth <= 768;

    // Initialize nav links visibility based on screen size
    if (!isMobileScreen()) {
      navLinks.style.display = 'flex'; // Ensure display is flex on desktop initially
    } else {
       navLinks.style.display = ''; // Let CSS handle display on mobile
    }
    
    mobileToggle.addEventListener('click', () => {
      // Only toggle if on a mobile screen
      if (isMobileScreen()) {
        isMenuOpen = !isMenuOpen;
        this.toggleMobileMenu(isMenuOpen, mobileToggle, navLinks);
      }
    });
    
    // Close menu when clicking on nav links (only on mobile)
    navLinks.addEventListener('click', (e) => {
      if (isMobileScreen() && e.target.classList.contains('nav-link')) {
        isMenuOpen = false;
        this.toggleMobileMenu(isMenuOpen, mobileToggle, navLinks);
      }
    });
    
    // Close menu when clicking outside (only on mobile)
    document.addEventListener('click', (e) => {
      if (isMobileScreen() && isMenuOpen && !mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        isMenuOpen = false;
        this.toggleMobileMenu(isMenuOpen, mobileToggle, navLinks);
      }
    });

    // Handle resize: show nav links on desktop, hide on mobile if menu is closed
    window.addEventListener('resize', () => {
      if (!isMobileScreen()) {
        navLinks.style.display = 'flex'; // Always show on desktop
        navLinks.classList.remove('mobile-open'); // Ensure mobile class is removed
      } else {
        // On mobile, let toggleMobileMenu manage display via classes
        navLinks.style.display = '';
         if (!isMenuOpen) {
             navLinks.classList.remove('mobile-open');
         }
      }
    });
  }

  toggleMobileMenu(isOpen, toggle, menu) {
    const hamburgerLines = toggle.querySelectorAll('.hamburger-line');
    // Only apply mobile toggle styles if on a mobile screen
    if (window.innerWidth <= 768) {
      const navLinks = menu.querySelectorAll('.nav-link'); // Select links inside the menu

      if (isOpen) {
        menu.classList.add('mobile-open');
        toggle.classList.add('active');
        hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgerLines[1].style.opacity = '0';
        hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        toggle.setAttribute('aria-expanded', 'true');

        // Animate nav links with stagger effect
        navLinks.forEach((link, index) => {
          setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
          }, index * 100);
        });
      } else {
        menu.classList.remove('mobile-open');
        toggle.classList.remove('active');
        hamburgerLines[0].style.transform = '';
        hamburgerLines[1].style.opacity = '';
        hamburgerLines[2].style.transform = '';
        toggle.setAttribute('aria-expanded', 'false');

        // Reset nav links styles when closing
          navLinks.forEach(link => {
              link.style.opacity = ''; // Let CSS handle opacity
              link.style.transform = ''; // Let CSS handle transform
          });
      }
    }
    // On desktop, this function does nothing, CSS manages visibility
  }

  // Advanced Navigation with Smooth Scrolling
  setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link[data-scroll-target]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
          this.updateActiveNavLink(link);
        }
      });
    });
    
    // Navbar background on scroll
    let ticking = false;
    
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.background = this.currentTheme === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = this.currentTheme === 'dark'
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
      }
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
  }

  smoothScrollTo(element) {
    const offsetTop = element.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  // Scroll Effects and Progress Indicator
  setupScrollEffects() {
    const progressBar = document.getElementById('progressBar');
    let ticking = false;
    
    const updateScrollEffects = () => {
      this.scrollPosition = window.scrollY;
      
      // Update scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (this.scrollPosition / (docHeight - winHeight)) * 100;
      
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
      
      // Update active section in navigation
      this.updateActiveSection();
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }, { passive: true });
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = this.scrollPosition + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        const activeLink = document.querySelector(`[data-scroll-target="${sectionId}"]`);
        if (activeLink && !activeLink.classList.contains('active')) {
          this.updateActiveNavLink(activeLink);
        }
      }
    });
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerElementAnimation(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('animation', observer);
  }

  triggerElementAnimation(element) {
    const animationType = element.getAttribute('data-animate');
    const delay = parseInt(element.getAttribute('data-delay')) || 0;
    
    console.log(`Triggering animation for element: ${element.id || element.className}, Type: ${animationType}, Delay: ${delay}`);

    setTimeout(() => {
      element.classList.add('animate');
      console.log(`Class 'animate' added to: ${element.id || element.className}`);
      
      // Handle stagger children animation
      if (animationType === 'staggerChildren') {
        const children = Array.from(element.children);
        console.log(`Staggering children for: ${element.id || element.className}, Number of children: ${children.length}`);
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.transitionDelay = `${index * 100}ms`;
            child.classList.add('animate');
            console.log(`Child animated: ${child.className}, Delay: ${index * 100}ms`);
          }, index * 100);
        });
      }
    }, delay);
  }

  triggerInitialAnimations() {
    // Animate hero section immediately
    const heroElements = document.querySelectorAll('#hero [data-animate]');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        this.triggerElementAnimation(el);
      }, index * 200);
    });
  }

  // Progressive Disclosure for Service Cards
  setupServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
      // Add hover effects
      card.addEventListener('mouseenter', () => {
        this.triggerCardMicroInteraction(card);
      });
      
      // Add focus effects for accessibility
      card.addEventListener('focus', () => {
        this.triggerCardMicroInteraction(card);
      });
    });
  }

  triggerCardMicroInteraction(card) {
    if (!card.style.transform.includes('translateY')) {
      card.style.transform = 'translateY(-4px)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    }
  }

  // Form Handling with Validation
  setupFormHandling() {
    // Main contact form
    const form = document.getElementById('contactForm');
    if (form) {
      const submitButton = document.getElementById('submitButton');
      const inputs = form.querySelectorAll('input, select, textarea');
      // Real-time validation
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
      // Form submission
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form, submitButton);
      });
    }

    // Hero contact form (first form)
    const heroForm = document.getElementById('heroContactForm');
    if (heroForm) {
      const heroSubmitButton = document.getElementById('heroSubmitButton');
      const heroInputs = heroForm.querySelectorAll('input, select, textarea');
      // Real-time validation
      heroInputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
      // Form submission
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(heroForm, heroSubmitButton);
      });
    }
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    // Get the error element ID from aria-describedby
    const errorElementId = field.getAttribute('aria-describedby');
    const errorElement = errorElementId ? document.getElementById(errorElementId) : null;
    
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = `${this.getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    this.showFieldError(field, errorElement, errorMessage);
    return !errorMessage;
  }

  clearFieldError(field) {
    // Get the error element ID from aria-describedby
    const errorElementId = field.getAttribute('aria-describedby');
    const errorElement = errorElementId ? document.getElementById(errorElementId) : null;
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
    field.classList.remove('error');
  }

  showFieldError(field, errorElement, message) {
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.toggle('visible', !!message);
    }
    field.classList.toggle('error', !!message);
  }

  getFieldLabel(fieldName) {
    const labelMap = {
      name: 'Full Name',
      email: 'Email Address',
      company: 'Company Name',
      message: 'Message'
    };
    return labelMap[fieldName] || fieldName;
  }

  async handleFormSubmission(form, submitButton) {
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message')
    };

    try {
      submitButton.classList.add('loading');
      submitButton.disabled = true;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message');
      }

      this.showToast('Thank you! We\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      this.showToast(error.message || 'Failed to send message. Please try again.', 'error');
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }

  // Counting Animations for Statistics
  setupCountingAnimations() {
    const statNumbers = document.querySelectorAll('.about-stat-number, .stat-number, .card-value, .metric-value');
    
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => {
      // Extract number from text content
      const text = el.textContent;
      const number = parseInt(text.replace(/[^\d]/g, ''));
      if (number && number > 0) {
        el.setAttribute('data-count', number);
        el.textContent = '0' + text.replace(/\d+/, '');
        countObserver.observe(el);
      }
    });
    
    this.observers.set('count', countObserver);
  }

  animateCount(element) {
    const text = element.getAttribute('data-count') ? 
                 element.textContent : 
                 element.textContent;
    const target = parseInt(element.getAttribute('data-count') || text.replace(/[^\d]/g, ''));
    const suffix = text.replace(/[\d,]/g, '');
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const displayValue = Math.floor(current);
      element.textContent = displayValue.toLocaleString() + suffix;
    }, 16);
  }

  // Parallax Effects
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-particles, .floating-card, .floating-element');
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.1;
        const yPos = rate * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // Micro-interactions
  setupMicroInteractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('button, .cta-primary, .cta-secondary');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        this.triggerButtonHover(button);
      });
    });
    
    // Card tilt effects
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      this.setupTiltEffect(card);
    });
    
    // CTA ripple effect
    const ctaButtons = document.querySelectorAll('.cta-primary');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.createRippleEffect(e, button);
      });
    });
    
    // Smooth scroll for Hero CTA button
    const heroCtaButton = document.getElementById('ctaPrimary');
    if (heroCtaButton) {
      heroCtaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          this.smoothScrollTo(contactSection);
        }
      });
    }
    
    // Stat card hover effects
    const statCards = document.querySelectorAll('.about-stat-card, .result-card, .stat-card');
    statCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-6px) scale(1.03)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  triggerButtonHover(button) {
    if (!button.style.transform.includes('translateY')) {
      button.style.transform = 'translateY(-1px)';
      setTimeout(() => {
        button.style.transform = '';
      }, 200);
    }
  }

  setupTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateX = deltaY * -10;
      const rotateY = deltaX * 10;
      
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Accessibility Enhancements
  setupAccessibility() {
    // Focus management
    this.setupFocusManagement();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
    
    // Screen reader announcements
    this.setupScreenReaderAnnouncements();
    
    // Reduced motion preferences
    this.setupReducedMotion();
  }

  setupFocusManagement() {
    // Skip links
    const skipLink = document.querySelector('.skip-nav');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.focus();
          target.scrollIntoView();
        }
      });
    }
    
    // Focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupKeyboardNavigation() {
    // Service cards keyboard navigation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextCard = serviceCards[index + 1] || serviceCards[0];
          nextCard.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevCard = serviceCards[index - 1] || serviceCards[serviceCards.length - 1];
          prevCard.focus();
        }
      });
    });
    
    // Navigation keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close mobile menu if open
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('mobile-open')) {
          this.toggleMobileMenu(false, mobileToggle, navLinks);
        }
      }
    });
  }

  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
      
      // Disable animations
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        .vector-line, .vector-dot, .connection-line, .floating-element {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Lazy loading for images
    this.setupLazyLoading();
    
    // Debounced scroll events
    this.setupDebouncedEvents();
    
    // Resource hints
    this.setupResourceHints();
    
    // Intersection observer for performance
    this.setupPerformanceObserver();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
      
      this.observers.set('images', imageObserver);
    }
  }

  setupDebouncedEvents() {
    // Debounce resize events
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.handleResize();
      }, 250);
    };
    
    window.addEventListener('resize', debouncedResize);
  }

  handleResize() {
    // Handle responsive adjustments
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    
    // Adjust animations based on screen size
    if (isMobile) {
      document.body.classList.add('mobile');
      // Disable floating animations on mobile
      const floatingCards = document.querySelectorAll('.floating-card');
      floatingCards.forEach(card => {
        card.style.animation = 'none';
        card.style.transform = 'none';
      });
    } else {
      document.body.classList.remove('mobile');
      // Re-enable floating animations
      const floatingCards = document.querySelectorAll('.floating-card');
      floatingCards.forEach(card => {
        card.style.animation = '';
        card.style.transform = '';
      });
    }
    
    if (isTablet) {
      document.body.classList.add('tablet');
      // Adjust visual container for tablet
      const visualContainer = document.querySelector('.visual-container');
      if (visualContainer) {
        visualContainer.style.flexDirection = 'row';
        visualContainer.style.flexWrap = 'wrap';
        visualContainer.style.justifyContent = 'center';
      }
    } else {
      document.body.classList.remove('tablet');
      // Reset visual container for desktop
      const visualContainer = document.querySelector('.visual-container');
      if (visualContainer) {
        visualContainer.style.flexDirection = '';
        visualContainer.style.flexWrap = '';
        visualContainer.style.justifyContent = '';
      }
    }
  }

  setupResourceHints() {
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = function() { this.onload = null; this.rel = 'stylesheet'; };
    document.head.appendChild(fontPreload);
    
    // Preconnect to external domains
    const preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ];
    
    preconnects.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Toast Notification System
  showToast(message, type = 'info', duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas ${this.getToastIcon(type)}"></i>
      </div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.removeToast(toast);
    });
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto-remove
    setTimeout(() => {
      this.removeToast(toast);
    }, duration);
    
    // Announce to screen readers
    this.announceToScreenReader(message);
  }

  removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  getToastIcon(type) {
    const icons = {
      success: 'fa-check',
      error: 'fa-times',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  // Utility Methods
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Cleanup methods
  destroy() {
    // Cleanup all event listeners, observers, and timeouts
    console.log('TriadWebsite: Destroying instance.');
    // Remove all event listeners and observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animations.clear();
    
    // Remove any dynamically created elements
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.remove();
    }
  }

  setupFloatingContact() {
    const floatingContact = document.getElementById('floatingContact');
    const floatingContactButton = document.getElementById('floatingContactButton'); // Get the button element
    const floatingForm = document.getElementById('floatingContactForm');
    const closeButton = document.getElementById('closeFloatingForm');
    let isHovering = false; // Keep track of hover state for opening
    let hoverTimeout;

    if (!floatingContact || !floatingContactButton || !floatingForm || !closeButton) return; // Added check for button

    // Function to check if on a mobile or tablet screen
    const isMobileOrTablet = () => window.innerWidth <= 1024; // Assuming 1024px is the breakpoint for tablet

    // Handle hover state to open the form on desktop
    floatingContact.addEventListener('mouseenter', () => {
        // Only trigger hover on larger screens
        if (!isMobileOrTablet()) {
           isHovering = true;
           floatingContact.classList.add('active');
        }
    });

    floatingContact.addEventListener('mouseleave', () => {
        // Keep track of mouse leaving for potential future use, but do NOT close the form here based on hover
        isHovering = false;
    });

    // Handle click on the button to toggle form visibility on mobile/tablet
    floatingContactButton.addEventListener('click', () => {
        // Toggle 'active' class on click, primarily for touch devices
        floatingContact.classList.toggle('active');
    });

    // Handle click outside
    document.addEventListener('click', (event) => {
        // Check if the click target is outside the floating contact container
        // Added condition to prevent closing if clicking the button itself
        if (floatingContact.classList.contains('active') && !floatingContact.contains(event.target) && event.target !== floatingContactButton) {
            floatingContact.classList.remove('active');
        }
    });

    // Handle scroll - close the form
    window.addEventListener('scroll', () => {
        // If the form is active and the user scrolls, close the form.
        if (floatingContact.classList.contains('active')) {
            floatingContact.classList.remove('active');
        }
    }, { passive: true }); // Use passive: true for better scroll performance

    // Handle close button - close the form
    closeButton.addEventListener('click', () => {
        floatingContact.classList.remove('active');
    });

    // Handle form submission (existing logic remains)
    const form = document.getElementById('floatingContactFormElement');
    const submitButton = document.getElementById('floatingSubmitButton');

    if (form && submitButton) { // Added check for form elements
      form.addEventListener('submit', async (e) => {
          e.preventDefault();
          await this.handleFormSubmission(form, submitButton);
      });

      // Setup form validation (existing logic remains)
      const formInputs = form.querySelectorAll('input, textarea');
      formInputs.forEach(input => {
          input.addEventListener('blur', () => {
              this.validateField(input);
          });
          input.addEventListener('input', () => {
              this.clearFieldError(input);
          });
      });
    }

     // Initial state: hide the floating contact if the contact section is visible on load
     // This logic was previously in a separate observer, integrating here.
     const contactSection = document.getElementById('contact');
     if (contactSection) {
         const initialObserver = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     floatingContact.classList.add('hidden');
                 } else {
                     floatingContact.classList.remove('hidden');
                 }
             });
         }, { threshold: 0.5 });

         initialObserver.observe(contactSection);

         // Also ensure it hides if contact section comes into view later
         const scrollObserver = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     floatingContact.classList.add('hidden');
                     // Optionally close the form if it's open when contact section comes into view
                     if (floatingContact.classList.contains('active')) {
                         floatingContact.classList.remove('active');
                     }
                 } else {
                     floatingContact.classList.remove('hidden');
                 }
             });
         }, { threshold: 0.5 }); // Adjust threshold as needed
         scrollObserver.observe(contactSection);
     }
  }

  // Typed.js Animation Setup
  setupTypedAnimation() {
    console.log('Attempting to setup Typed.js animation.');
    if (typeof Typed === 'undefined') {
      console.error('Typed.js library is not loaded!');
      return;
    }
    const autoTypeElement = document.querySelector('.auto-type');
    if (autoTypeElement) {
      console.log('Found .auto-type element, initializing Typed.js...');
      new Typed(autoTypeElement, {
        strings: ['Digital Marketing Strategy'],
        typeSpeed: 30,
        backSpeed: 0,
        backDelay: 0,
        startDelay: 200,
        showCursor: false,
        loop: false
      });
    } else {
      console.warn('Could not find .auto-type element.');
    }
  }
}

// Initialize the website application
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired. Initializing TriadWebsite.');
  window.triadApp = new TriadWebsite();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('page-hidden');
  } else {
    document.body.classList.remove('page-hidden');
  }
});

// Handle online/offline status
window.addEventListener('online', () => {
  triadApp.showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
  triadApp.showToast('Connection lost', 'warning');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  triadApp.showToast('Something went wrong. Please try again.', 'error');
});
