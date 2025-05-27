// Consolidated JavaScript for the portfolio website

document.addEventListener('DOMContentLoaded', function() {  // Elements
  const navbar = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const backToTopButton = document.getElementById("back-to-top");
  const projectCarousel = document.getElementById('projectCarousel');
  const sections = document.querySelectorAll("section[id]");
  
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
