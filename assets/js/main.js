/* ==========================================
   MAIN.JS — Navigation, Scroll Spy, AOS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // === Initialize AOS ===
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }

  // === Scroll Spy ===
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // === Smooth Scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.nav-fixed')?.offsetHeight || 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // === Back to Top Button ===
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Mobile Menu Toggle ===
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // === Accordion ===
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const icon = trigger.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('open');

      // Close all others in same group
      const parent = trigger.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
        parent.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');
      }

      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }

      // Update ARIA
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });

  // === Reveal Solution Buttons ===
  document.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        const isHidden = target.classList.contains('hidden');
        target.classList.toggle('hidden');
        btn.textContent = isHidden ? '[ Ocultar Solução ]' : '[ Revelar Solução ]';
        btn.setAttribute('aria-expanded', isHidden);
      }
    });
  });

  // === Nav background on scroll ===
  const nav = document.querySelector('.nav-fixed');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }

  // === Particles (ambience) ===
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      if (Math.random() > 0.5) {
        particle.style.background = '#00FF00';
      }
      heroSection.appendChild(particle);
    }
  }
});
