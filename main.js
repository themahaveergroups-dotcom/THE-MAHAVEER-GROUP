/* ═══════════════════════════════════════════
   THE MAHAVEER GROUP PVT. LTD.
   main.js — GitHub Pages Ready
   ═══════════════════════════════════════════ */

'use strict';

/* ── NAV SCROLL STATE ── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const ham  = document.getElementById('ham');
  const mob  = document.getElementById('mob-menu');
  if (!ham || !mob) return;

  function openMenu() {
    ham.classList.add('open');
    mob.classList.add('open');
    mob.setAttribute('aria-hidden', 'false');
    ham.setAttribute('aria-expanded', 'true');
    ham.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    ham.classList.remove('open');
    mob.classList.remove('open');
    mob.setAttribute('aria-hidden', 'true');
    ham.setAttribute('aria-expanded', 'false');
    ham.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', () => {
    mob.classList.contains('open') ? closeMenu() : openMenu();
  });

  // expose for inline onclick handlers in HTML
  window.closeMob = closeMenu;

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mob.classList.contains('open')) closeMenu();
  });

  // close on backdrop tap
  mob.addEventListener('click', (e) => {
    if (e.target === mob) closeMenu();
  });
})();

/* ── SMOOTH SCROLL (anchor links) ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Update URL without jump
      history.pushState(null, '', id);
    });
  });
})();

/* ── SCROLL-REVEAL ANIMATION ── */
(function initReveal() {
  const els = document.querySelectorAll(
    '.biz-card, .why-card, .pillar, .num-item, .about-visual, .about-text, .contact-info, .form-box'
  );
  if (!els.length || !('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    els.forEach(el => el.classList.add('reveal', 'visible'));
    return;
  }

  els.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── GALLERY DRAG SCROLL ── */
(function initGalleryDrag() {
  const track = document.querySelector('.gtrack');
  if (!track) return;

  let isDown = false, startX, scrollLeft;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });
  track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
  });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.6;
    track.scrollLeft = scrollLeft - walk;
  });
})();

/* ── CONTACT FORM ── */
(function initForm() {
  const form = document.getElementById('enquiryForm');
  if (!form) return;

  const btn    = form.querySelector('.f-btn');
  const fOk    = document.getElementById('f-ok');
  const WA_NUM = '918349713110';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Disable button & show loading
    btn.disabled    = true;
    btn.textContent = 'Sending\u2026';

    // Simulate submission delay (replace with fetch() to real endpoint if needed)
    setTimeout(() => {
      // Success state
      btn.textContent      = 'Enquiry Sent \u2713';
      btn.style.background = '#4CAF50';
      if (fOk) fOk.style.display = 'block';

      // Build WhatsApp fallback
      const name     = encodeURIComponent(form['name'].value.trim());
      const business = encodeURIComponent(form['business'].value);
      const message  = encodeURIComponent(form['message'].value.trim());
      const waUrl    = `https://wa.me/${WA_NUM}?text=Hello%2C+I+am+${name}+enquiring+about+${business}.+${message}`;

      setTimeout(() => {
        if (window.confirm('Would you also like to send this enquiry via WhatsApp for a faster response?')) {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }
      }, 500);

    }, 1300);
  });
})();
