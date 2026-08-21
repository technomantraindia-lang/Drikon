# Technomantra Local Code Knowledge Graph (V4.8.14)

> Structural local index. Read current source before editing. Secrets are intentionally excluded.

- Indexed source files: 11
- Structural edges: 10
- Matched end-to-end flows: 0
- Updated: 2026-08-21T09:16:53.794Z

## Frontend API calls
- API GET /innerpages.json <- service-detail.js

## Dependency edges
- IMPORT index.html -> style.css, script.js
- IMPORT about.html -> style.css, pages.css
- IMPORT blog.html -> pages.css
- IMPORT contact.html -> style.css, pages.css
- IMPORT products.html -> style.css, pages.css
- IMPORT projects.html -> style.css, pages.css
- IMPORT service-detail.html -> style.css, pages.css, script.js, service-detail.js

## Database references
- DB script.js -> view, active, top, buttons
- DB service-detail.js -> URL

## Symbols
- SYMBOL script.js: initDrikonIntroAnimation, finishIntro, updateDiagramConnectors, initFramesSlider, getCardsPerView, getMaxIndex, updateDots, updateSlider, goToSlide, getPositionX
- SYMBOL service-detail.js: to, renderServicePage, setText, setImgSrc

## UI/style selectors
- UI index.html: #drikonIntro, #introProgressBar, #introTagline, #skipIntro, #about, #achievements, #services, #product-ecosystem, #diagramSvg, #line-peb, #line-decking, #line-accessories, #line-ridge, #line-roofing
- UI pages.css: #F47A20, #FFFFFF, #EAF3FB, #FFF1E8, #F5F7FA, .container, .site-header, .header-topbar, .topbar-left, .topbar-link, .topbar-sep, .topbar-right, .header-navbar, .logo-link
- UI style.css: #F36A16, #D9540D, #DCEEFF, #F4F6F8, #D9E0E7, #FFFFFF, .container, .section-tag, .section-title, .section-desc, .center-align, .header, .header-top-bar, .top-bar-container
- UI about.html: #mobileNav, #mobileNavClose, #infrastructure, .header, .header-top-bar, .top-bar-container, .top-bar-left, .top-bar-link, .top-bar-icon, .top-bar-separator, .top-bar-right, .header-container, .logo-link, .logo-img
- UI blog.html: #hamburger, #mobileNav, #mobileNavClose, .site-header, .header-topbar, .container, .topbar-left, .topbar-link, .topbar-sep, .topbar-right, .header-navbar, .logo-link, .logo-img, .nav-list
- UI contact.html: #mobileNav, #mobileNavClose, #fullname, #company, #phone, #email, #project-type, #message, .header, .header-top-bar, .top-bar-container, .top-bar-left, .top-bar-link, .top-bar-icon
- UI products.html: #mobileNav, #mobileNavClose, #peb-systems, #roofing-sheets, #puf-panels, #polycarbonate, #decking-sheets, #cz-purlins, #ventilators, .header, .header-top-bar, .top-bar-container, .top-bar-left, .top-bar-link
- UI projects.html: #mobileNav, #mobileNavClose, .header, .header-top-bar, .top-bar-container, .top-bar-left, .top-bar-link, .top-bar-icon, .top-bar-separator, .top-bar-right, .header-container, .logo-link, .logo-img, .nav-menu
- UI service-detail.html: #pageMetaDescription, #pageMetaKeywords, #pageTitle, #breadcrumbCurrent, #heroEyebrow, #heroTitle, #heroHighlight, #heroDesc, #heroPrimaryBtn, #heroSecondaryBtn, #heroForegroundImg, #overview, #overviewLabel, #overviewTitle
