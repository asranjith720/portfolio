// RR Tech - Video Editing Courses Website
// Main JavaScript File

// ============ FORM HANDLING ============
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.querySelector('.btn-submit');
  if (submitButton) {
    submitButton.addEventListener('click', handleFormSubmit);
  }

  // Smooth scroll for navigation links
  setupSmoothScroll();

  // Add animation on scroll
  setupScrollAnimations();
});

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form values
  const name = document.querySelector('input[placeholder="Rahul Kumar"]').value;
  const email = document.querySelector('input[placeholder="rahul@gmail.com"]').value;
  const interested = document.querySelector('select').value;
  const message = document.querySelector('textarea').value;

  // Validation
  if (!name.trim()) {
    alert('Please enter your name');
    return;
  }

  if (!email.trim() || !isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (!message.trim()) {
    alert('Please enter a message');
    return;
  }

  // Show success message
  alert(`Thank you ${name}! Your message has been sent successfully. Ranjith will get back to you soon 🎬`);

  // Reset form
  resetForm();

  // Here you can add code to send the form data to a server
  // Example: sendFormToServer(name, email, interested, message);
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Reset contact form
 */
function resetForm() {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.reset();
  }
}

/**
 * Setup smooth scroll for navigation links
 */
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/**
 * Setup scroll animations
 */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('[class*="card"]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.style.display = 'none';
  }
}

/**
 * Handle responsive navigation
 */
function setupResponsiveNav() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');

  // Check if on mobile
  if (window.innerWidth <= 768) {
    if (navLinks) {
      navLinks.style.display = 'none';
    }
  } else {
    if (navLinks) {
      navLinks.style.display = 'flex';
    }
  }
}

// Handle window resize for responsive nav
window.addEventListener('resize', setupResponsiveNav);

// Initialize on page load
setupResponsiveNav();

// ============ UTILITY FUNCTIONS ============

/**
 * Get URL parameters
 */
function getQueryParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Scroll to section
 */
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Track page views (for analytics)
 */
function trackPageView() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view');
  }
}

/**
 * Track button clicks (for analytics)
 */
function trackButtonClick(buttonName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'button_click', {
      'button_name': buttonName
    });
  }
}

/**
 * Add click tracking to buttons
 */
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-enroll, .btn-yt');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      trackButtonClick(buttonText);
    });
  });
});

// ============ ACCESSIBILITY IMPROVEMENTS ============

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(event) {
  // ESC key to close mobile menu
  if (event.key === 'Escape') {
    closeMobileMenu();
  }

  // Press 'C' to focus on contact form
  if (event.key === 'c' || event.key === 'C') {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      const firstInput = contactForm.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }
});

/**
 * Improve focus visibility
 */
const style = document.createElement('style');
style.textContent = `
  *:focus-visible {
    outline: 2px solid var(--red);
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);

// ============ PERFORMANCE OPTIMIZATION ============

/**
 * Lazy load images
 */
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

setupLazyLoading();

// ============ ERROR HANDLING ============

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
  console.error('An error occurred:', event.error);
  // You can send error logs to a server here
});

/**
 * Unhandled promise rejection
 */
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  // You can send error logs to a server here
});

// ============ INITIALIZATION ============

// Log successful page load
console.log('RR Tech - Video Editing Courses Website loaded successfully!');
