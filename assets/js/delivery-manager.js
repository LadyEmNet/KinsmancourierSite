(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const body = document.body;
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('secondary-navigation');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const desktopQuery =
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 861px)') : null;

  if (!menuToggle || !nav) {
    return;
  }

  const syncNavAria = () => {
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
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    if (navBackdrop) {
      navBackdrop.hidden = true;
    }
    syncNavAria();
  };

  const openMenu = () => {
    body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    if (navBackdrop) {
      navBackdrop.hidden = false;
    }
    syncNavAria();
  };

  syncNavAria();
  if (navBackdrop) {
    navBackdrop.hidden = true;
  }

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

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (desktopQuery && desktopQuery.matches) {
        return;
      }
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
})();
