document.documentElement.classList.add('js');
(function(){var h=function(){document.documentElement.style.setProperty('--vh',window.innerHeight*.01+'px')};h();window.addEventListener('resize',h)})();
    (() => {
      'use strict';
      const $  = (s, c = document) => c.querySelector(s);
      const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

      const nav = $('#nav');
      const onScroll = () => {
        if (!nav) return;
        if (window.scrollY > 24) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      const burger = $('#burger');
      const mobileMenu = $('#mobileMenu');
      if (burger && mobileMenu) {
        const setOpen = (open) => {
          burger.classList.toggle('is-open', open);
          mobileMenu.classList.toggle('is-open', open);
          mobileMenu.setAttribute('aria-hidden', String(!open));
          document.body.style.overflow = open ? 'hidden' : '';
        };
        burger.addEventListener('click', () => setOpen(!mobileMenu.classList.contains('is-open')));
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      }


      const reveals = $$('.reveal');
      let revealed = false;
      const showAll = () => {
        if (revealed) return;
        revealed = true;
        reveals.forEach((el) => el.classList.add('is-in'));
      };
      if ('IntersectionObserver' in window && reveals.length) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const explicit = el.getAttribute('data-reveal-delay');
            if (explicit) el.style.setProperty('--reveal-delay', explicit + 'ms');
            el.classList.add('is-in');
            io.unobserve(el);
          });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
        reveals.forEach((el) => io.observe(el));
      } else {
        showAll();
      }

      const fadeIns = $$('.animate-fade-in');
      let fadesShown = false;
      const showFades = () => {
        if (fadesShown) return;
        fadesShown = true;
        fadeIns.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; el.style.animation = 'none'; });
      };

      const onLoad = () => {
        showAll();
        showFades();
      };
      if (document.readyState === 'complete') { onLoad(); }
      else { window.addEventListener('load', onLoad); }
      setTimeout(showAll, 3000);
      setTimeout(showFades, 3000);

      const toggleBtns = $$('.toggle__btn');
      const plansHourly = $('#plansHourly');
      const plansMonthly = $('#plansMonthly');
      if (toggleBtns.length && plansHourly && plansMonthly) {
        toggleBtns.forEach((btn) => {
          btn.addEventListener('click', () => {
            toggleBtns.forEach((b) => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const plan = btn.getAttribute('data-plan');
            if (plan === 'annual') {
              plansHourly.classList.add('is-hidden');
              plansMonthly.classList.remove('is-hidden');
            } else {
              plansMonthly.classList.add('is-hidden');
              plansHourly.classList.remove('is-hidden');
            }
          });
        });
      }

      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: 'smooth' });
        });
      });
    })();