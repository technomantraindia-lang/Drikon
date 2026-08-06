// Drikon Infratech script.js

document.addEventListener('DOMContentLoaded', () => {
  // Zoom callout magnifier effect
  const zoomCircle = document.querySelector('.zoom-circle');
  const zoomImageCrop = document.querySelector('.zoom-image-crop');

  if (zoomCircle && zoomImageCrop) {
    zoomCircle.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = zoomCircle.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      zoomImageCrop.style.transformOrigin = `${x}% ${y}%`;
      zoomImageCrop.style.transform = 'scale(1.3)';
    });

    zoomCircle.addEventListener('mouseleave', () => {
      zoomImageCrop.style.transform = 'scale(1)';
      zoomImageCrop.style.transformOrigin = 'center center';
    });
  }

  // Sticky header transition on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.style.padding = '16px 0';
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    }
  });

  // Animated achievement numbers counting
  const achievements = document.querySelectorAll('.ach-num');
  
  const countUp = (element) => {
    const target = +element.getAttribute('data-val');
    const duration = 2000; // 2 seconds animation
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      element.textContent = current;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, stepTime || 20);
  };

  // Intersection Observer for triggering achievement counters when scrolled into view
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  achievements.forEach(ach => observer.observe(ach));

  // Form submission handler
  const form = document.querySelector('.enquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your quote request has been received. Our estimating team will contact you shortly.');
      form.reset();
    });
  }

  // Force Autoplay for HTML5 Hero Video
  const heroVideo = document.querySelector('.hero-video-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Retry playing when user interacts with page
        document.body.addEventListener('click', () => heroVideo.play(), { once: true });
      });
    }
  }

  // --- 7. Projects Section Carousel Slider ---
  const track = document.querySelector('.projects-carousel-track');
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.slider-dots-container .dot');
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');
  const wrapper = document.querySelector('.projects-carousel-wrapper');
  
  if (track && slides.length > 0 && wrapper) {
    let currentIndex = 1; // Start with the 2nd slide active
    
    const updateCarousel = () => {
      // 1. Update active slide class
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      // 2. Update active dot class
      if (dots.length > 0) {
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active-dot');
          } else {
            dot.classList.remove('active-dot');
          }
        });
      }
      
      // 3. Calculate translate position to center the active slide
      const wrapperWidth = wrapper.offsetWidth;
      
      // Keep widths synchronized with CSS values
      const isMobile = window.innerWidth <= 991;
      const shrinkWidth = isMobile ? 260 : 280;
      const activeWidth = isMobile ? 320 : 520;
      const gap = 30;
      
      const activeLeft = currentIndex * (shrinkWidth + gap);
      const translateVal = (wrapperWidth / 2) - (activeLeft + activeWidth / 2);
      
      track.style.transform = `translateX(${translateVal}px)`;
    };
    
    // Initial run to center the default slide
    setTimeout(updateCarousel, 100);
    
    // Resize handler to maintain centering
    window.addEventListener('resize', updateCarousel);
    
    // Button Event Listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = slides.length - 1; // Loop back
        }
        updateCarousel();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0; // Loop back
        }
        updateCarousel();
      });
    }
    
    // Dot Event Listeners
    if (dots.length > 0) {
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          currentIndex = idx;
          updateCarousel();
        });
      });
    }

    // Drag / Swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let startTranslate = 0;
    
    const getTranslateX = () => {
      const style = window.getComputedStyle(track);
      const matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m41;
    };
    
    // Mouse Dragging
    wrapper.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons
      if (e.target.closest('.slider-arrow')) return;
      isDragging = true;
      startX = e.clientX;
      startTranslate = getTranslateX();
      track.style.transition = 'none';
      wrapper.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
      const diff = currentX - startX;
      track.style.transform = `translateX(${startTranslate + diff}px)`;
    });
    
    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      wrapper.style.cursor = 'grab';
      
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 100) {
        if (diff > 0 && currentIndex > 0) {
          currentIndex--;
        } else if (diff < 0 && currentIndex < slides.length - 1) {
          currentIndex++;
        }
      }
      updateCarousel();
    });

    // Touch Swiping (Mobile)
    wrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startTranslate = getTranslateX();
      track.style.transition = 'none';
    });
    
    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      track.style.transform = `translateX(${startTranslate + diff}px)`;
    });
    
    wrapper.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex > 0) {
          currentIndex--;
        } else if (diff < 0 && currentIndex < slides.length - 1) {
          currentIndex++;
        }
      }
      updateCarousel();
    });
  }

  // --- Drikon Opening Animation Controller ---
  initDrikonIntroAnimation();
});

function initDrikonIntroAnimation() {
  const intro = document.getElementById("drikonIntro");
  const skipButton = document.getElementById("skipIntro");

  if (!intro) return;

  document.body.classList.add("intro-active");

  if (typeof gsap === "undefined") {
    document.body.classList.remove("intro-active");
    intro.remove();
    return;
  }

  const shutterTop = document.querySelector(".intro-shutter-top");
  const shutterBottom = document.querySelector(".intro-shutter-bottom");
  const logoCard = document.querySelector(".intro-logo-card");
  const shineBeam = document.querySelector(".logo-shine-beam");
  const progressContainer = document.querySelector(".intro-progress-container");
  const progressBar = document.getElementById("introProgressBar");
  const tagline = document.getElementById("introTagline");

  function finishIntro() {
    document.body.classList.remove("intro-active");
    if (intro && intro.parentNode) {
      intro.remove();
    }
  }

  // Initial State for Logo Creation Effect
  gsap.set(logoCard, {
    opacity: 0,
    scale: 0.82,
    clipPath: "inset(0% 0% 100% 0%)",
    filter: "blur(12px) drop-shadow(0 0 0px rgba(6, 59, 120, 0))"
  });

  // Create GSAP Master Timeline
  const timeline = gsap.timeline({
    onComplete: finishIntro
  });

  timeline
    // Step 1: Logo "Creates Itself" from top to bottom (roof down to base text)
    .to(logoCard, {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.85,
      ease: "power2.inOut"
    })
    // Step 2: Elastic 3D lock-in bounce & blur clear
    .to(logoCard, {
      scale: 1,
      filter: "blur(0px) drop-shadow(0 14px 28px rgba(6, 59, 120, 0.15))",
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3")
    // Step 3: Metallic sheen sweeps across completed logo
    .to(shineBeam, { left: "190%", duration: 0.85, ease: "power2.inOut" }, "-=0.2")
    // Step 4: Progress bar fills smoothly under logo
    .to(progressContainer, { opacity: 1, duration: 0.3 }, "-=0.6")
    .to(progressBar, { width: "100%", duration: 1.1, ease: "power1.inOut" }, "-=0.4")
    // Step 5: Tagline reveals
    .to(tagline, { opacity: 1, y: 0, duration: 0.4 }, "-=0.7")
    .to(skipButton, { opacity: 1, duration: 0.3 }, "-=0.6")

    // Step 6: Grand White Curtain Split Reveal (No seam line)
    .to([logoCard, progressContainer, tagline, skipButton], {
      opacity: 0,
      scale: 0.95,
      duration: 0.38,
      ease: "power2.in"
    }, "+=0.15")
    .to(shutterTop, {
      yPercent: -100,
      duration: 0.75,
      ease: "power4.inOut"
    })
    .to(shutterBottom, {
      yPercent: 100,
      duration: 0.75,
      ease: "power4.inOut"
    }, "<");

  if (skipButton) {
    skipButton.addEventListener("click", () => {
      timeline.progress(1);
      finishIntro();
    });
  }
}

// Dynamic Bulletproof SVG Connector Line Anchoring for Product Ecosystem
function updateDiagramConnectors() {
  const canvas = document.querySelector('.diagram-canvas');
  const hub = document.querySelector('.diagram-hub');
  if (!canvas || !hub) return;

  const canvasRect = canvas.getBoundingClientRect();
  const hubRect = hub.getBoundingClientRect();

  // Hub center relative to canvas
  const hubX = hubRect.left + hubRect.width / 2 - canvasRect.left;
  const hubY = hubRect.top + hubRect.height / 2 - canvasRect.top;

  const connectors = [
    { selector: '.left-column .product-node-pill:nth-child(1)', lineId: 'line-peb', type: 'left' },
    { selector: '.left-column .product-node-pill:nth-child(2)', lineId: 'line-decking', type: 'left' },
    { selector: '.left-column .product-node-pill:nth-child(3)', lineId: 'line-accessories', type: 'left' },
    { selector: '.left-column .product-node-pill:nth-child(4)', lineId: 'line-ridge', type: 'left' },
    { selector: '.right-column .product-node-pill:nth-child(1)', lineId: 'line-roofing', type: 'right' },
    { selector: '.right-column .product-node-pill:nth-child(2)', lineId: 'line-puf', type: 'right' },
    { selector: '.right-column .product-node-pill:nth-child(3)', lineId: 'line-cz', type: 'right' },
    { selector: '.right-column .product-node-pill:nth-child(4)', lineId: 'line-turbo', type: 'right' },
    { selector: '.bottom-pill', lineId: 'line-polycarbonate', type: 'bottom' }
  ];

  const svg = document.getElementById('diagramSvg');
  if (svg) {
    svg.setAttribute('viewBox', `0 0 ${canvasRect.width} ${canvasRect.height}`);
  }

  connectors.forEach(item => {
    const pill = canvas.querySelector(item.selector);
    const line = document.getElementById(item.lineId);
    if (!pill || !line) return;

    const bracket = pill.querySelector('.pill-bracket-right, .pill-bracket-left, .pill-bracket-top') || pill;
    const bRect = bracket.getBoundingClientRect();

    const targetX = bRect.left + bRect.width / 2 - canvasRect.left;
    const targetY = bRect.top + bRect.height / 2 - canvasRect.top;

    if (item.type === 'left') {
      const midX = targetX + (hubX - targetX) * 0.45;
      line.setAttribute('d', `M ${hubX} ${hubY} L ${midX} ${targetY} L ${targetX} ${targetY}`);
    } else if (item.type === 'right') {
      const midX = targetX - (targetX - hubX) * 0.45;
      line.setAttribute('d', `M ${hubX} ${hubY} L ${midX} ${targetY} L ${targetX} ${targetY}`);
    } else {
      line.setAttribute('d', `M ${hubX} ${hubY} L ${targetX} ${targetY}`);
    }
  });
}

window.addEventListener('load', updateDiagramConnectors);
window.addEventListener('resize', updateDiagramConnectors);
document.addEventListener('DOMContentLoaded', updateDiagramConnectors);
setTimeout(updateDiagramConnectors, 500);
