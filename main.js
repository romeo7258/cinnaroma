/* ========================================
   Online Teaching Website - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Mobile Menu Toggle =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // ===== Accordion Functionality =====
  const accordionHeaders = document.querySelectorAll('[data-accordion-header]');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('[data-accordion-icon]');
      
      // Close all other accordions
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          const otherContent = otherHeader.nextElementSibling;
          const otherIcon = otherHeader.querySelector('[data-accordion-icon]');
          otherContent.classList.remove('open');
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180');
          }
        }
      });
      
      // Toggle current accordion
      content.classList.toggle('open');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
  
  // ===== Testimonial Carousel =====
  const carousel = document.querySelector('.testimonial-carousel');
  const dotsContainer = document.querySelector('.dot-nav');
  let currentSlide = 0;
  let slideInterval;
  
  if (carousel) {
    const slides = carousel.children;
    const totalSlides = slides.length;
    
    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    function goToSlide(slideIndex) {
      currentSlide = slideIndex;
      carousel.scrollTo({
        left: slideIndex * carousel.offsetWidth,
        behavior: 'smooth'
      });
      updateDots();
    }
    
    // Auto-advance carousel
    slideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
      }, 5000);
    });
  }
  
  // ===== Course Filter =====
  const filterButtons = document.querySelectorAll('[data-filter]');
  const courseCards = document.querySelectorAll('[data-course]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('bg-orange-500', 'text-white'));
      this.classList.add('bg-orange-500', 'text-white');
      
      const filterValue = this.getAttribute('data-filter');
      
      courseCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  // ===== Portfolio Filter =====
  const portfolioFilters = document.querySelectorAll('[data-portfolio-filter]');
  const portfolioItems = document.querySelectorAll('[data-portfolio-item]');
  
  portfolioFilters.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      portfolioFilters.forEach(btn => {
        btn.classList.remove('bg-orange-500', 'text-white');
        btn.classList.add('text-gray-600');
      });
      this.classList.add('bg-orange-500', 'text-white');
      
      const filterValue = this.getAttribute('data-portfolio-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
  
  // ===== Sticky Header on Scroll =====
  const header = document.querySelector('.sticky-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    });
  }
  
  // ===== Form Validation =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      
      if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Show success message
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you! Your demo session request has been submitted. We will contact you shortly.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 1000);
    });
  }
  
  // ===== Smooth Scrolling for Anchor Links =====
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
  
  // ===== Counter Animation =====
  const counters = document.querySelectorAll('[data-counter]');
  const observerOptions = {
    threshold: 0.5
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // ===== FAQ Accordion (if present) =====
  const faqItems = document.querySelectorAll('[data-faq]');
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const content = this.querySelector('.faq-content');
      const icon = this.querySelector('[data-faq-icon]');
      
      // Close all others
      faqItems.forEach(other => {
        if (other !== this) {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('[data-faq-icon]');
          otherContent.classList.remove('open');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        }
      });
      
      content.classList.toggle('open');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
});
