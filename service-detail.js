// service-detail.js - Dynamic Renderer for DRIKON Service Inner Pages

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Extract 'service' or 'id' parameter from URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const requestedSlug = urlParams.get('service') || urlParams.get('id') || 'peb-systems';

  try {
    // 2. Fetch innerpages.json dataset
    const response = await fetch('innerpages.json');
    if (!response.ok) {
      throw new Error(`Failed to load innerpages.json: ${response.statusText}`);
    }
    
    const servicesData = await response.json();

    // 3. Find matching service by slug or fallback to peb-systems
    let currentService = servicesData.find(s => s.slug === requestedSlug);
    if (!currentService) {
      currentService = servicesData.find(s => s.slug === 'peb-systems') || servicesData[0];
    }

    // 4. Render Page Data
    renderServicePage(currentService, servicesData);

  } catch (error) {
    console.error('Error rendering service inner page:', error);
  }

  // Helper function to render all dynamic elements
  function renderServicePage(service, allServices) {
    // --- SEO Meta Tags ---
    if (service.seo) {
      document.title = service.seo.metaTitle || `${service.name} | DRIKON Infratech Pvt. Ltd.`;
      const metaDesc = document.getElementById('pageMetaDescription');
      if (metaDesc && service.seo.metaDescription) {
        metaDesc.setAttribute('content', service.seo.metaDescription);
      }
      const metaKeys = document.getElementById('pageMetaKeywords');
      if (metaKeys && service.seo.keywords) {
        metaKeys.setAttribute('content', service.seo.keywords.join(', '));
      }
    }

    // --- Hero Section ---
    setText('breadcrumbCurrent', service.name);
    if (service.hero) {
      setText('heroEyebrow', service.hero.eyebrow);
      setText('heroTitle', service.hero.title);
      setText('heroHighlight', service.hero.highlight);
      setText('heroDesc', service.hero.description);
      
      const primaryBtn = document.getElementById('heroPrimaryBtn');
      if (primaryBtn && service.hero.primaryButton) {
        primaryBtn.textContent = service.hero.primaryButton.label;
        primaryBtn.setAttribute('href', service.hero.primaryButton.link);
      }
      
      const secondaryBtn = document.getElementById('heroSecondaryBtn');
      if (secondaryBtn && service.hero.secondaryButton) {
        secondaryBtn.textContent = service.hero.secondaryButton.label;
        secondaryBtn.setAttribute('href', service.hero.secondaryButton.link);
      }

      if (service.hero.foregroundImage) {
        setImgSrc('heroForegroundImg', service.hero.foregroundImage, service.name);
      }
    }

    // --- Overview Section ---
    if (service.overview) {
      setText('overviewLabel', service.overview.label);
      setText('overviewTitle', service.overview.title);
      setImgSrc('overviewImg', service.overview.image, service.overview.title);

      const descContainer = document.getElementById('overviewDescContainer');
      if (descContainer && Array.isArray(service.overview.description)) {
        descContainer.innerHTML = service.overview.description
          .map(p => `<p>${p}</p>`)
          .join('');
      }

      const statsGrid = document.getElementById('statsGrid');
      if (statsGrid && Array.isArray(service.overview.stats)) {
        statsGrid.innerHTML = service.overview.stats
          .map(st => `
            <div class="stat-card">
              <div class="stat-val">${st.value}</div>
              <div class="stat-lbl">${st.label}</div>
            </div>
          `).join('');
      }
    }

    // --- Features Section ---
    if (service.features) {
      setText('featuresLabel', service.features.label);
      setText('featuresTitle', service.features.title);
      setText('featuresDesc', service.features.description);

      const featuresGrid = document.getElementById('featuresGrid');
      if (featuresGrid && Array.isArray(service.features.items)) {
        featuresGrid.innerHTML = service.features.items
          .map(ft => `
            <div class="feature-card">
              <div class="feature-icon-box">
                ${ft.icon || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'}
              </div>
              <h3 class="feature-title">${ft.title}</h3>
              <p class="feature-desc">${ft.description}</p>
            </div>
          `).join('');
      }
    }

    // --- Benefits Section ---
    if (service.benefits) {
      setText('benefitsLabel', service.benefits.label);
      setText('benefitsTitle', service.benefits.title);
      setImgSrc('benefitsImg', service.benefits.image, service.benefits.title);

      const benefitsList = document.getElementById('benefitsList');
      if (benefitsList && Array.isArray(service.benefits.items)) {
        benefitsList.innerHTML = service.benefits.items
          .map(b => `
            <div class="benefit-item">
              <div class="benefit-check-icon">✓</div>
              <div class="benefit-text">${b}</div>
            </div>
          `).join('');
      }
    }

    // --- Applications Section ---
    if (service.applications) {
      setText('applicationsLabel', service.applications.label);
      setText('applicationsTitle', service.applications.title);

      const applicationsGrid = document.getElementById('applicationsGrid');
      if (applicationsGrid && Array.isArray(service.applications.items)) {
        applicationsGrid.innerHTML = service.applications.items
          .map(app => `
            <div class="app-card">
              <div class="app-img-wrap">
                <img src="${app.image}" alt="${app.title}" loading="lazy" onerror="this.onerror=null;this.src='images/Pre-Engineered Buildings.png';">
              </div>
              <div class="app-body">
                <h4 class="app-title">${app.title}</h4>
              </div>
            </div>
          `).join('');
      }
    }

    // --- Specifications Section ---
    if (service.specifications) {
      setText('specsLabel', service.specifications.label);
      setText('specsTitle', service.specifications.title);
      setText('specNoteBox', service.specifications.note);

      const specsTable = document.getElementById('specsTable');
      if (specsTable && Array.isArray(service.specifications.items)) {
        specsTable.innerHTML = service.specifications.items
          .map(sp => `
            <tr>
              <td class="spec-name">${sp.label}</td>
              <td class="spec-val">${sp.value}</td>
            </tr>
          `).join('');
      }
    }

    // --- Why Choose Section ---
    if (service.whyChoose) {
      setText('whyLabel', service.whyChoose.label);
      setText('whyTitle', service.whyChoose.title);
      setText('whyDesc', service.whyChoose.description);

      const whyGrid = document.getElementById('whyGrid');
      if (whyGrid && Array.isArray(service.whyChoose.items)) {
        whyGrid.innerHTML = service.whyChoose.items
          .map((itemText, idx) => `
            <div class="why-item-card">
              <div class="why-num-badge">0${idx + 1}</div>
              <div class="why-item-text">${itemText}</div>
            </div>
          `).join('');
      }
    }

    // --- Project Gallery Section ---
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && Array.isArray(service.gallery)) {
      galleryGrid.innerHTML = service.gallery
        .map(imgUrl => `
          <div class="gallery-item" data-src="${imgUrl}">
            <img src="${imgUrl}" alt="${service.name} Project Image" loading="lazy" onerror="this.onerror=null;this.src='images/Pre-Engineered Buildings.png';">
            <div class="gallery-overlay">
              <div class="gallery-zoom-icon">🔍</div>
            </div>
          </div>
        `).join('');

      // Setup Lightbox Click Listeners
      const modal = document.getElementById('galleryModal');
      const modalImg = document.getElementById('galleryModalImg');
      const modalClose = document.getElementById('galleryModalClose');

      galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const src = item.getAttribute('data-src');
          if (modal && modalImg && src) {
            modalImg.src = src;
            modal.classList.add('active');
          }
        });
      });

      if (modalClose) {
        modalClose.addEventListener('click', () => {
          modal.classList.remove('active');
        });
      }

      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('active');
          }
        });
      }
    }

    // --- Related Services Section ---
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid && Array.isArray(service.relatedServices)) {
      const relatedItems = service.relatedServices
        .map(relSlug => allServices.find(s => s.slug === relSlug))
        .filter(Boolean);

      relatedGrid.innerHTML = relatedItems
        .map(rel => `
          <div class="related-card">
            <div class="related-cat">${rel.category || 'Product'}</div>
            <h3 class="related-title">${rel.name}</h3>
            <p class="related-desc">${rel.hero ? rel.hero.description : rel.overview ? rel.overview.title : ''}</p>
            <a href="service-detail.html?service=${rel.slug}" class="related-link">
              Explore ${rel.shortName || rel.name} →
            </a>
          </div>
        `).join('');
    }

    // --- CTA Section ---
    if (service.cta) {
      setText('ctaEyebrow', service.cta.eyebrow);
      setText('ctaTitle', service.cta.title);
      setText('ctaDesc', service.cta.description);
    }
  }

  // Helper DOM functions
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) {
      el.textContent = text;
    }
  }

  function setImgSrc(id, src, alt) {
    const el = document.getElementById(id);
    if (!el || !src) return;

    if (src.endsWith('.mp4')) {
      const videoEl = document.createElement('video');
      videoEl.id = id;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.style.cssText = 'width: 100%; height: 100%; object-fit: contain; display: block; border-radius: 14px;';
      videoEl.innerHTML = `<source src="${src}" type="video/mp4">`;
      el.parentNode.replaceChild(videoEl, el);
    } else {
      el.src = src;
      if (alt) el.alt = alt;
      el.onerror = function() {
        this.onerror = null;
        this.src = 'images/Pre-Engineered Buildings.png';
      };
    }
  }

  // Sticky Tabs Active State Scrollspy
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const sections = document.querySelectorAll('.service-section, .service-hero, .premium-cta-section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    tabBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('href') === `#${current}`) {
        btn.classList.add('active');
      }
    });
  });
});
