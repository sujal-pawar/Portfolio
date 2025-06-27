// Consolidated JavaScript for the portfolio website

document.addEventListener('DOMContentLoaded', function() {  // Elements
  const navbar = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const backToTopButton = document.getElementById("back-to-top");
  const projectCarousel = document.getElementById('projectCarousel');
  const sections = document.querySelectorAll("section[id]");
  
  // Mobile Sidebar Elements
  const mobileSidebar = document.getElementById('mobileSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const closeSidebar = document.getElementById('closeSidebar');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  // Toggle Mobile Sidebar
  function toggleSidebar() {
    mobileSidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  }

  // Close sidebar when clicking outside
  sidebarOverlay.addEventListener('click', toggleSidebar);

  // Toggle sidebar on button click
  sidebarToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleSidebar();
  });

  // Close sidebar on close button click
  closeSidebar.addEventListener('click', toggleSidebar);

  // Close sidebar on link click (mobile)
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) {
        toggleSidebar();
      }
    });
  });

  // Close sidebar on window resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobileSidebar.classList.contains('active')) {
      toggleSidebar();
    }
  });

  // Add touch swipe support for sidebar
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) { // Swipe right
      if (!mobileSidebar.classList.contains('active')) return;
      toggleSidebar();
    } else { // Swipe left 
      if (mobileSidebar.classList.contains('active')) return;
      toggleSidebar();
    }
  }

  // Make sure body is visible immediately
  document.body.style.opacity = '1';    // Initialize Bootstrap carousel
  if (projectCarousel) {
    new bootstrap.Carousel(projectCarousel, {
      interval: 5000,
      wrap: true,
      touch: true,
      pause: 'hover'
    });
  }
  
  // Ensure sections are visible
  const importantSections = ['projects', 'skills', 'certifications'];
  importantSections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
      section.style.display = 'block';
      section.style.position = 'relative';
      section.style.zIndex = '10';
    }
  });
  
  // Scroll functions
  function handleScroll() {
    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTopButton.style.opacity = "1";
      backToTopButton.style.visibility = "visible";
    } else {
      backToTopButton.style.opacity = "0";
      backToTopButton.style.visibility = "hidden";
    }
    
    // Navbar background effect
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    
    // Update active navigation link
    updateActiveNavLink();
  }
  
  // Function to update active nav link based on scroll position
  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
    // Back to top function
  function goToTop() {
    window.scrollTo(0, 0);
  }
  
  // Event listeners
  window.addEventListener('scroll', handleScroll);
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', goToTop);
  }
    // Basic anchor link navigation without smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        // Just let the default behavior happen for the top of the page
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        // Make sure the target is visible
        target.style.display = 'block';
        target.style.visibility = 'visible';
        target.style.opacity = 1;
      }
    });
  });
    // Make all elements visible by default
  document.querySelectorAll('.skill-card, .certification-card, .project-card').forEach(element => {
    element.style.opacity = 1;
    element.style.visibility = 'visible';
  });
  
  // Initial call to set states correctly
  handleScroll();
});
document.addEventListener('DOMContentLoaded', function () {
      const typewriterElement = document.getElementById('typewriter');
      const words = ["Tech Enthusiast", "Full Stack Developer", "Problem Solver"];
      let wordIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typeDelay = 100;

      function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
          typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
          typeDelay = 50;
        } else {
          typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
          typeDelay = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
          isDeleting = true;
          typeDelay = 1000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeDelay = 300; // Pause before starting new word
        }

        setTimeout(type, typeDelay);
      }

      type();
    });
// Enhanced Projects Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Project carousel functionality
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const indicators = document.querySelectorAll('.indicator');
  
  if (!carousel || !slides.length) return;
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Initialize first slide as active
  updateActiveSlide();
  
  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      navigateSlide(-1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      navigateSlide(1);
    });
  }
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      currentIndex = index;
      updateActiveSlide();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      navigateSlide(-1);
    } else if (e.key === 'ArrowRight') {
      navigateSlide(1);
    }
  });
  
  // Touch navigation
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  });
  
  function handleSwipeGesture() {
    if (touchEndX < touchStartX) {
      // Swipe left -> next slide
      navigateSlide(1);
    }
    if (touchEndX > touchStartX) {
      // Swipe right -> previous slide
      navigateSlide(-1);
    }
  }
  
  function navigateSlide(direction) {
    currentIndex = (currentIndex + direction + slideCount) % slideCount;
    updateActiveSlide();
  }
  
  function updateActiveSlide() {
    // Update slide position
    const slideWidth = slides[0].offsetWidth;
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    carousel.style.transition = 'transform 0.5s ease';
    
    // Update active class on slides
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
});