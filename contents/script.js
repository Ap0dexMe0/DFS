/**
 * DFS V2.6 — Client-side script (Redesigned 2026)
 * Session management, navigation, sidebar, keyboard shortcuts
 */
(function () {
  'use strict';

  // --- Session cookie validation ---
  var cookie = document.cookie;
  var current = window.location.href;

  function getCookie() {
    var cookies = cookie.split(';');
    var keys = [];
    for (var i = 0; i < cookies.length; i++) {
      var pair = cookies[i].split('=');
      keys.push(pair[0].trim());
    }
    return keys;
  }

  var keys = getCookie();

  // Check for DFS_BASE session cookie; redirect if invalid
  if (keys.indexOf('DFS_BASE') === -1) {
    document.cookie = 'DFS_BASE=Initiated;max-age=180;path=/';
  }

  // --- Active nav highlighting ---
  var navLinks = document.querySelectorAll('.sidebar-nav a');
  var currentPath = window.location.pathname;

  navLinks.forEach(function (link) {
    try {
      var linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || currentPath.indexOf(linkPath) === 0) {
        // Already handled by server-side active class
      }
    } catch (_) { /* malformed URL */ }
  });

  // --- Sidebar state ---
  var toggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  }

  // Mobile sidebar toggle
  if (toggle && sidebar) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
        if (toggle) toggle.focus();
      }
    });
  }

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', function (e) {
    if (sidebar && window.innerWidth <= 900) {
      if (!sidebar.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        closeSidebar();
      }
    }
  });

  // --- Password visibility toggle (login page) ---
  var pwInput = document.getElementById('dfsPass');
  var pwToggle = document.getElementById('pwToggle');
  var capsWarn = document.getElementById('capsWarn');

  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', function () {
      var isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      pwInput.focus();
      // Update button icon
      pwToggle.innerHTML = isPassword ? '&#128064;' : '&#128065;';
    });
  }

  if (pwInput && capsWarn && pwInput.addEventListener) {
    ['keyup', 'keydown'].forEach(function (ev) {
      pwInput.addEventListener(ev, function (e) {
        try {
          capsWarn.style.display = (e.getModifierState && e.getModifierState('CapsLock'))
            ? 'block'
            : 'none';
        } catch (_) { /* older browser */ }
      });
    });
  }

  // --- File upload label update ---
  var actualBtn = document.getElementById('actual-btn');
  var fileChosen = document.getElementById('file-chosen');
  if (actualBtn && fileChosen) {
    actualBtn.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        fileChosen.innerHTML = '<i class="fa-solid fa-file"></i> ' + this.files[0].name;
      }
    });

    // Keyboard activation for file label
    fileChosen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        actualBtn.click();
      }
    });
  }

  // --- Smooth page transitions ---
  var mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.style.opacity = '1';
  }

  // --- Keyboard shortcut: "/" to focus search/command input ---
  document.addEventListener('keydown', function (e) {
    // Don't intercept when typing in inputs
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.key === '/') {
      e.preventDefault();
      var ajaxInput = document.getElementById('ajaxinput');
      if (ajaxInput) {
        ajaxInput.focus();
      }
    }
  });

  // --- Intersection observer for card animations ---
  if ('IntersectionObserver' in window) {
    var cards = document.querySelectorAll('.dfs-card, section.lpe');
    cards.forEach(function (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  // --- Auto-resize textareas ---
  document.querySelectorAll('textarea').forEach(function (ta) {
    if (ta.readOnly) return; // Skip readonly terminal outputs
    ta.addEventListener('input', function () {
      this.style.height = 'auto';
      var maxHeight = parseInt(window.getComputedStyle(this).maxHeight) || 500;
      this.style.height = Math.min(this.scrollHeight, maxHeight) + 'px';
    });
  });

})();
