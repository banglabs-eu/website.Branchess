(function () {
  'use strict';

  /* --- Theme Toggle --- */
  var themeToggle = document.getElementById('theme-toggle');
  var urlTheme = new URLSearchParams(location.search).get('theme');
  if (urlTheme === 'light' || urlTheme === 'dark') {
    localStorage.setItem('branchess-theme', urlTheme);
    document.documentElement.setAttribute('data-theme', urlTheme);
  } else {
    var storedTheme = localStorage.getItem('branchess-theme');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('branchess-theme', next);
  });

  /* --- Nav scroll effect --- */
  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* --- Mobile menu --- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Scroll reveal --- */
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { observer.observe(el); });

  /* --- Smooth scroll for nav links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
