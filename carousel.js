document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('.project-cards-container');
  const cards = document.querySelectorAll('.project-card');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  
  // Initialize carousel
  function initCarousel() {
    // Show first card
    cards[0].classList.add('active');
    updateCarousel();
  }
  
  // Update carousel position and active states
  function updateCarousel() {
    // Update transform
    const translate = -currentIndex * 100;
    cardsContainer.style.transform = `translateX(${translate}%)`;
    
    // Update active states
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '0.7';
    if (nextBtn) nextBtn.style.opacity = currentIndex === cards.length - 1 ? '0.5' : '0.7';
  }
  
  // Navigation functions
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    updateCarousel();
  }
  
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }
  
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }
  
  // Touch/Mouse events for dragging
  function touchStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    cardsContainer.style.transition = 'none';
  }
  
  function touchMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
    cardsContainer.style.transform = `translateX(${currentTranslate}px)`;
  }
  
  function touchEnd() {
    isDragging = false;
    cardsContainer.style.transition = 'transform 0.5s ease-in-out';
    
    const movedBy = currentTranslate - prevTranslate;
    
    if (Math.abs(movedBy) > 100) {
      if (movedBy > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      goToSlide(currentIndex);
    }
  }
  
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
  
  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
  
  // Touch/Mouse events
  cardsContainer.addEventListener('mousedown', touchStart);
  cardsContainer.addEventListener('touchstart', touchStart);
  
  cardsContainer.addEventListener('mousemove', touchMove);
  cardsContainer.addEventListener('touchmove', touchMove);
  
  cardsContainer.addEventListener('mouseup', touchEnd);
  cardsContainer.addEventListener('touchend', touchEnd);
  cardsContainer.addEventListener('mouseleave', touchEnd);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Prevent context menu on long press
  cardsContainer.addEventListener('contextmenu', e => {
    if (e.target === cardsContainer) e.preventDefault();
  });
  
  // Initialize
  initCarousel();
  
  // Auto-advance carousel every 5 seconds
  let autoplayInterval = setInterval(nextSlide, 5000);
  
  // Pause autoplay on hover
  cardsContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  cardsContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });
});
