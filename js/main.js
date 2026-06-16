/* =========================================================
   CENTERCOM — Refresh concept · interactions
   ========================================================= */
(function () {
  'use strict';
  var doc = document;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header scroll state ---- */
  var header = doc.getElementById('siteHeader');
  var mobileCta = doc.getElementById('mobileCta');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.setAttribute('data-state', y > 40 ? 'scrolled' : 'top');
    if (mobileCta) mobileCta.classList.toggle('show', y > 640);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  var menu = doc.getElementById('mobileMenu');
  var toggle = doc.getElementById('navToggle');
  var close = doc.getElementById('navClose');
  // Elements that sit *behind* the full-screen menu overlay — made inert so
  // keyboard focus can't escape the open menu (WCAG 2.4.3 / 2.4.11).
  var bgEls = [header, doc.getElementById('hoofdinhoud'), mobileCta, doc.querySelector('.footer')];
  function setBgInert(state) {
    bgEls.forEach(function (el) { if (el) el.inert = state; });
  }
  function openMenu() {
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('open'); });
    toggle.setAttribute('aria-expanded', 'true');
    doc.body.style.overflow = 'hidden';
    setBgInert(true);
    if (close) close.focus();
  }
  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
    setBgInert(false);
    window.setTimeout(function () { menu.hidden = true; }, 400);
    if (toggle) toggle.focus();
  }
  if (toggle) toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && !menu.hidden) closeMenu();
  });

  /* ---- Scroll reveal ---- */
  var reveals = Array.prototype.slice.call(doc.querySelectorAll('.reveal'));
  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // small stagger for groups
          var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
          el.style.transitionDelay = Math.min(siblings, 5) * 70 + 'ms';
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Animated counters ---- */
  function formatNum(n, sep) {
    var s = Math.round(n).toString();
    return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : s;
  }
  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var sep = el.hasAttribute('data-sep');
    if (prefersReduced) { el.textContent = formatNum(target, sep) + suffix; return; }
    var dur = 1500, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(target * eased, sep) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = Array.prototype.slice.call(doc.querySelectorAll('[data-count]'));
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---- FAQ: single open (accordion) ---- */
  var faqItems = Array.prototype.slice.call(doc.querySelectorAll('.faq__item'));
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---- Forms (demo: no backend) ---- */
  var leadForm = doc.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!leadForm.checkValidity()) { leadForm.reportValidity(); return; }
      var ok = doc.getElementById('formSuccess');
      var btn = leadForm.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
      if (ok) ok.hidden = false;
      leadForm.querySelectorAll('input,textarea,select').forEach(function (f) { f.disabled = true; });
    });
  }
  var newsForm = doc.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!newsForm.checkValidity()) { newsForm.reportValidity(); return; }
      var ok = doc.getElementById('newsOk');
      if (ok) ok.hidden = false;
      newsForm.reset();
    });
  }

  /* ---- Scroll spy: mark active nav section ---- */
  var spyLinks = Array.prototype.slice.call(doc.querySelectorAll('.nav__links a[href^="#"]'));
  var spyMap = {};
  var spyTargets = [];
  spyLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var sec = doc.getElementById(id);
    if (sec) { spyMap[id] = a; spyTargets.push(sec); }
  });
  if ('IntersectionObserver' in window && spyTargets.length) {
    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          spyLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          var link = spyMap[e.target.id];
          if (link) link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    spyTargets.forEach(function (s) { spyIO.observe(s); });
    // Observe the hero too: when it's in the detection band (top of page),
    // it has no nav target, so the loop above clears all active links.
    var heroEl = doc.querySelector('.hero');
    if (heroEl) spyIO.observe(heroEl);
  }

  /* ---- Year ---- */
  var year = doc.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
