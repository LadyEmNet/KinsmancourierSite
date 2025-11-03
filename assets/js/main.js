(() => {
  const el = document.getElementById('copyright');
  if (el) {
    const year = new Date().getFullYear();
    el.textContent = `© ${year} Kinsman Courier. All rights reserved.`;
  }
})();

(() => {
  const body = document.body;
  const toggleButton = document.querySelector('.mode-toggle');
  const toggleImg = document.getElementById('mode-toggle-img');
  const brandLogo = document.getElementById('brand-logo');
  const brandLink = document.querySelector('.brand');
  const modeText = document.getElementById('mode-toggle-text');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-navigation');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const desktopQuery =
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 901px)') : null;

  const syncNavAria = () => {
    if (!nav) return;
    if (!desktopQuery) {
      nav.removeAttribute('aria-hidden');
      return;
    }
    if (desktopQuery.matches) {
      nav.removeAttribute('aria-hidden');
    } else {
      nav.setAttribute('aria-hidden', body.classList.contains('menu-open') ? 'false' : 'true');
    }
  };

  const closeMenu = () => {
    body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
    if (navBackdrop) {
      navBackdrop.hidden = true;
    }
    syncNavAria();
  };

  const openMenu = () => {
    body.classList.add('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close navigation menu');
    }
    if (navBackdrop) {
      navBackdrop.hidden = false;
    }
    syncNavAria();
  };

  if (menuToggle && nav) {
    syncNavAria();
    menuToggle.addEventListener('click', () => {
      if (body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }

    const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (desktopQuery && desktopQuery.matches) return;
        closeMenu();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('menu-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    if (desktopQuery) {
      desktopQuery.addEventListener('change', (event) => {
        if (event.matches) {
          closeMenu();
        } else {
          syncNavAria();
        }
      });
    }
  } else {
    syncNavAria();
  }

  if (brandLink) {
    brandLink.addEventListener('click', (event) => {
      if (desktopQuery && desktopQuery.matches) {
        return;
      }
      event.preventDefault();
      if (body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (!toggleButton) {
    return;
  }

  const modes = {
    driver: {
      brandSrc: 'assets/IMG_4197.jpeg',
      brandAlt: 'Kinsman Courier driver logo',
      toggleSrc: 'assets/69570E3B-FB1D-43E2-978B-21ECCD7E5C8F.png',
      toggleAlt: 'Switch to depot mode',
      toggleLabel: 'Switch to depot view',
      text: 'Driver mode',
    },
    depot: {
      brandSrc: 'assets/69570E3B-FB1D-43E2-978B-21ECCD7E5C8F.png',
      brandAlt: 'Kinsman Courier depot logo',
      toggleSrc: 'assets/IMG_4197.jpeg',
      toggleAlt: 'Switch to driver mode',
      toggleLabel: 'Switch to driver view',
      text: 'Depot mode',
    },
  };

  let storedMode = null;
  if (typeof window !== 'undefined') {
    try {
      storedMode = window.localStorage.getItem('kinsman-mode');
    } catch (error) {
      storedMode = null;
    }
  }
  let currentMode = storedMode === 'depot' ? 'depot' : 'driver';

  const applyMode = (mode) => {
    currentMode = mode === 'depot' ? 'depot' : 'driver';
    body.classList.toggle('depot-mode', currentMode === 'depot');
    body.classList.toggle('driver-mode', currentMode === 'driver');
    const config = modes[currentMode];
    if (brandLogo) {
      brandLogo.src = config.brandSrc;
      brandLogo.alt = config.brandAlt;
    }
    if (toggleImg) {
      toggleImg.src = config.toggleSrc;
      toggleImg.alt = config.toggleAlt;
    }
    if (modeText) {
      modeText.textContent = config.text;
    }
    toggleButton.setAttribute('aria-label', config.toggleLabel);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('kinsman-mode', currentMode);
      } catch (error) {
        /* no-op */
      }
    }
  };

  applyMode(currentMode);

  const switchMode = () => {
    applyMode(currentMode === 'driver' ? 'depot' : 'driver');
  };

  toggleButton.addEventListener('click', switchMode);
  toggleButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchMode();
    }
  });

  if (nav) {
    const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const sectionLinks = new Map();

    navLinks.forEach((link) => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      if (!sectionLinks.has(section)) {
        sectionLinks.set(section, []);
      }
      sectionLinks.get(section).push(link);
    });

    const clearActive = () => {
      navLinks.forEach((link) => {
        link.removeAttribute('data-active');
        link.removeAttribute('aria-current');
      });
    };

    const setActive = (section) => {
      clearActive();
      const links = sectionLinks.get(section);
      if (links) {
        links.forEach((link) => {
          link.setAttribute('data-active', 'true');
          link.setAttribute('aria-current', 'page');
        });
      }
    };

    if (sectionLinks.size) {
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible.length > 0) {
            setActive(visible[0].target);
          }
        },
        { rootMargin: '-50% 0px -40% 0px', threshold: [0.1, 0.25, 0.5] }
      );

      sectionLinks.forEach((_, section) => observer.observe(section));
      const homeSection = document.getElementById('home');
      if (homeSection) {
        setActive(homeSection);
      }
    }
  }
})();
