(function(){
  function ensureCssLinks() {
    var head = document.head || document.getElementsByTagName('head')[0];
    function addOnce(href) {
      if (![...document.querySelectorAll('link[rel="stylesheet"]')].some(l => l.getAttribute('href') === href)) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
      }
    }
    addOnce('/assets/css/bootstrap.min.css');
    addOnce('/assets/css/bootstrap-icons.min.css');
    addOnce('/assets/css/navbar.css');
    addOnce('/assets/css/general.css');
    addOnce('/assets/css/footer.css');
    addOnce('/assets/css/theme/theme.css');
    addOnce('/assets/css/theme/componentes.css');
    addOnce('/assets/css/theme/font.css');
    addOnce('/assets/css/home.css');

    // Normalize quick-nav sizing to match homepage
    if (!document.getElementById('layout-inline-style')) {
      var style = document.createElement('style');
      style.id = 'layout-inline-style';
      style.textContent = [
        // Keep compact line-height; other sizes come from home.css
        '.top-quick-nav{line-height:1;}',
        // Match homepage logo height from home.css (ensure if CSS load order changes)
        '.top-quick-logo{height:50px;}',
      ].join('\n');
      head.appendChild(style);
    }
  }

  function buildHeaderHtml() {
    return (
      '<div class="container-fluid" style="background: var(--md-sys-color-surface); border-bottom: 1px solid var(--md-sys-color-outline-variant);">' +
        '<div class="top-quick-nav d-flex flex-wrap justify-content-start gap-2 gap-md-3 py-2 align-items-center">' +
          '<a href="/index.html" class="me-2" aria-label="Home">' +
            '<img src="/assets/images/Logo.png" alt="Logo" class="top-quick-logo">' +
          '</a>' +
          '<a href="/Mutitools/multi-tool.html" class="btn btn-outline-secondary quick-action-btn d-flex align-items-center">' +
            '<span class="material-symbols-rounded me-2">construction</span>' +
            '<span>Multi Tool</span>' +
          '</a>' +
          '<a href="/Mutitools/pipeline.html" class="btn btn-outline-secondary quick-action-btn d-flex align-items-center">' +
            '<span class="material-symbols-rounded me-2">schema</span>' +
            '<span>Pipeline</span>' +
          '</a>' +
          '<a href="/Mutitools/compress-pdf.html" class="btn btn-outline-secondary quick-action-btn d-flex align-items-center">' +
            '<span class="material-symbols-rounded me-2">compress</span>' +
            '<span>Compress</span>' +
          '</a>' +
          '<a href="/Mutitools/view-pdf.html" class="btn btn-outline-secondary quick-action-btn d-flex align-items-center">' +
            '<span class="material-symbols-rounded me-2">picture_as_pdf</span>' +
            '<span>View/Edit PDF</span>' +
          '</a>' +
          '<div class="ms-auto d-flex align-items-center gap-3 top-quick-icons">' +
            '<span id="quick-favorites" class="material-symbols-rounded" title="Favorites">star</span>' +
            '<span id="quick-theme" class="material-symbols-rounded" title="Theme">light_mode</span>' +
            '<div class="dropdown" style="display:inline-block;">' +
              '<span id="quick-language" class="material-symbols-rounded" title="Language" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">language</span>' +
              '<ul class="dropdown-menu dropdown-menu-end" id="languageSelection" aria-labelledby="quick-language" style="max-height: 320px; overflow:auto; min-width: 18rem;"></ul>' +
            '</div>' +
            '<span id="quick-search" class="material-symbols-rounded" title="Search">search</span>' +
            '<span id="quick-settings" class="material-symbols-rounded" title="Settings">settings</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function buildFooterHtml() {
    var isHttp = (window.location.protocol === 'http:' || window.location.protocol === 'https:');
    var origin = window.location.origin || '';
    var path = window.location.pathname || '/';
    var parts = path.split('/').filter(Boolean);
    var depth = Math.max(parts.length - 1, 0);
    var up = depth > 0 ? new Array(depth + 1).join('../') : '';
    function href(p){ return isHttp ? (origin + '/' + p) : (up + p); }
    return (
      '<footer class="footer-pad footer-solid" role="contentinfo" aria-label="Footer" style="height:48px;">' +
        '<div class="footer-content">' +
          '<div class="d-flex justify-content-between align-items-center" style="gap: 12px;">' +
            '<div class="d-flex align-items-center" style="gap: 8px;">' +
              '<span>Powered by</span>' +
              '<img src="/assets/images/favicon.svg" alt="Noble PDF logo" width="16" height="16" />' +
              '<span>Noble PDF</span>' +
            '</div>' +
            '<nav aria-label="Footer navigation" class="d-flex flex-wrap align-items-center" style="gap: 12px; pointer-events:auto; position:relative; z-index:2147483647;">' +
              '<a style="pointer-events:auto;" href="' + href('licenses.html') + '" onclick="window.location.href=this.href; return false;">Licenses</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a style="pointer-events:auto;" href="' + href('releases.html') + '" onclick="window.location.href=this.href; return false;">Releases</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a style="pointer-events:auto;" href="' + href('survey.html') + '" onclick="window.location.href=this.href; return false;">Survey</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a style="pointer-events:auto;" href="' + href('privacy-policy.html') + '" onclick="window.location.href=this.href; return false;">Privacy Policy</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a style="pointer-events:auto;" href="' + href('terms-and-conditions.html') + '" onclick="window.location.href=this.href; return false;">Terms and Conditions</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a style="pointer-events:auto;" href="' + href('cookie-preferences.html') + '" onclick="window.location.href=this.href; return false;">Cookie Preferences</a>' +
            '</nav>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function injectLayout() {
    // Remove any in-page bootstrap navbars to avoid duplication
    document.querySelectorAll('nav.navbar').forEach(function(n){ n.remove(); });
    // Remove any explicit Home buttons
    document.querySelectorAll('a, button').forEach(function(el){
      var txt = (el.textContent || '').trim().toLowerCase();
      if (txt === 'home' || txt === 'back to home') { el.remove(); }
    });

    // Prepend container-fluid header if not present
    if (!document.querySelector('.container-fluid .top-quick-nav')) {
      var hdr = document.createElement('div');
      hdr.innerHTML = buildHeaderHtml();
      var body = document.body;
      if (body.firstChild) {
        body.insertBefore(hdr.firstChild, body.firstChild);
      } else {
        body.appendChild(hdr.firstChild);
      }
    }

    // Ensure footer exists and has correct links (replace any placeholder/footer with # links)
    var existingFooter = document.querySelector('footer.footer-pad.footer-solid');
    var wrapper = document.createElement('div');
    wrapper.innerHTML = buildFooterHtml();
    var newFooter = wrapper.firstChild;
    if (existingFooter) {
      try { existingFooter.replaceWith(newFooter); } catch(_) { document.body.appendChild(newFooter); }
    } else {
      document.body.appendChild(newFooter);
    }
    // Ensure footer links navigate even if some global handlers block default
    try {
      document.querySelectorAll('footer.footer-pad.footer-solid nav a[href]').forEach(function(a){
        a.setAttribute('target','_self');
        a.addEventListener('click', function(e){
          var href = a.getAttribute('href');
          if (href && !/^javascript:/i.test(href)) {
            e.preventDefault();
            e.stopPropagation();
            window.location.assign(href);
          }
        }, { capture: true });
      });
    } catch(_) {}
  }

  function ensureVisibility() {
    try {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    } catch(_) {}
  }

  // Minimal SEO fallback for tool subpages (ensures title/description exist)
  function ensureBasicSeo() {
    try {
      var head = document.head || document.getElementsByTagName('head')[0];
      // Title
      if (!document.title || document.title.trim() === '') {
        document.title = 'Noble PDF — Online PDF Tools';
      }
      // Description
      if (!document.querySelector('meta[name="description"]')) {
        var m = document.createElement('meta');
        m.name = 'description';
        m.content = 'Free online PDF tools: merge, split, compress, convert, OCR, sign, protect and edit PDFs. Privacy-first and fast.';
        head.appendChild(m);
      }
      // Robots default index,follow
      if (!document.querySelector('meta[name="robots"]')) {
        var r = document.createElement('meta');
        r.name = 'robots';
        r.content = 'index, follow';
        head.appendChild(r);
      }
      // Canonical
      if (!document.querySelector('link[rel="canonical"]')) {
        var c = document.createElement('link');
        c.rel = 'canonical';
        c.href = window.location.origin + window.location.pathname;
        head.appendChild(c);
      }
    } catch(_) {}
  }

  // Add hreflang alternates for supported languages if language codes are available
  function ensureHreflangAlternates() {
    try {
      if (typeof supportedLanguages === 'undefined' || !Array.isArray(supportedLanguages) || supportedLanguages.length === 0) return;
      var head = document.head || document.getElementsByTagName('head')[0];
      var origin = window.location.origin;
      var path = window.location.pathname;
      var url = new URL(window.location.href);
      var existing = new Set([].map.call(document.querySelectorAll('link[rel="alternate"][hreflang]'), function(l){ return l.getAttribute('hreflang'); }));
      supportedLanguages.forEach(function(code){
        var langParam = code;
        var hrefUrl = new URL(origin + path);
        hrefUrl.searchParams.set('lang', langParam);
        var hreflang = code.replace('_','-');
        if (!existing.has(hreflang)) {
          var link = document.createElement('link');
          link.rel = 'alternate';
          link.hreflang = hreflang;
          link.href = hrefUrl.toString();
          head.appendChild(link);
        }
      });
      // x-default
      if (!document.querySelector('link[rel="alternate"][hreflang="x-default"]')) {
        var xdef = document.createElement('link');
        xdef.rel = 'alternate';
        xdef.hreflang = 'x-default';
        var base = new URL(origin + path);
        base.searchParams.delete('lang');
        xdef.href = base.toString();
        head.appendChild(xdef);
      }
    } catch(_) {}
  }

  function init() {
    ensureCssLinks();
    injectLayout();
    ensureVisibility();
    ensureBasicSeo();
    ensureHreflangAlternates();
    try { if (typeof window.ensureLanguageScripts === 'function') window.ensureLanguageScripts(); } catch(_) {}
    try { if (typeof window.syncLanguageParamAndAttrs === 'function') window.syncLanguageParamAndAttrs(); } catch(_) {}
    try { if (typeof window.appendLangToLinks === 'function') window.appendLangToLinks(); } catch(_) {}
    try { if (typeof window.setupQuickNavHandlers === 'function') window.setupQuickNavHandlers(); } catch(_) {}
    try { if (typeof window.buildLanguageMenu === 'function') window.buildLanguageMenu(); } catch(_) {}
    // Extra safety: re-inject on window load in case early DOM timing prevented footer/header
    try { window.addEventListener('load', injectLayout, { once: true }); } catch(_) {}
    // Retry shortly after initial init
    try { setTimeout(injectLayout, 50); } catch(_) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Language utilities injected globally for non-home pages
(function(){
  function addOnceScript(src, onload) {
    if (![...document.querySelectorAll('script')].some(s => s.getAttribute('src') === src)) {
      var s = document.createElement('script');
      s.src = src;
      if (onload) s.onload = onload;
      document.head.appendChild(s);
    } else if (onload) {
      onload();
    }
  }

  window.ensureLanguageScripts = function ensureLanguageScripts() {
    addOnceScript('/assets/js/additionalLanguageCode.js');
    addOnceScript('/assets/js/languageSelection.js');
  };

  window.syncLanguageParamAndAttrs = function syncLanguageParamAndAttrs() {
    try {
      var stored = localStorage.getItem('languageCode');
      if (!stored && typeof getDetailedLanguageCode === 'function') {
        stored = getDetailedLanguageCode();
        localStorage.setItem('languageCode', stored);
      }
      stored = stored || 'en_US';
      var url = new URL(window.location.href);
      var current = url.searchParams.get('lang');
      if (!current || current !== stored) {
        url.searchParams.set('lang', stored);
        history.replaceState(null, '', url.toString());
      }
      document.documentElement.setAttribute('data-language', stored);
      var htmlLang = stored.split('_')[0] || 'en';
      document.documentElement.setAttribute('lang', htmlLang);
    } catch(_) {}
  };

  window.appendLangToLinks = function appendLangToLinks() {
    try {
      var url = new URL(window.location.href);
      var lang = url.searchParams.get('lang');
      if (!lang) return;
      document.querySelectorAll('a[href]').forEach(function(a){
        // Skip footer links to avoid rewriting absolute paths
        if (a.closest('footer.footer-pad')) return;
        var href = a.getAttribute('href');
        if (!href) return;
        if (/^(mailto:|tel:|#|javascript:)/i.test(href)) return;
        try {
          var target = href.startsWith('http') ? new URL(href) : new URL(href, window.location.origin);
          if (target.origin === window.location.origin) {
            target.searchParams.set('lang', lang);
            a.setAttribute('href', target.pathname + target.search + target.hash);
          }
        } catch(_) {}
      });
    } catch(_) {}
  };

  window.buildLanguageMenu = function buildLanguageMenu() {
    try {
      var menu = document.getElementById('languageSelection');
      if (!menu) return;
      if (menu.children.length > 0) return;
      if (typeof supportedLanguages === 'undefined') return;
      var makeLabel = function(code) {
        try {
          var normalized = code.replace('_','-');
          var display = new Intl.DisplayNames([normalized, 'en'], { type: 'language' });
          var langPart = normalized.split('-')[0];
          var name = display.of(langPart) || code;
          return name + ' (' + code.replace('_','-') + ')';
        } catch (e) { return code; }
      };
      supportedLanguages.forEach(function(code){
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'dropdown-item lang_dropdown-item';
        a.href = '#';
        a.dataset.bsLanguageCode = code;
        a.textContent = makeLabel(code);
        li.appendChild(a);
        menu.appendChild(li);
      });
      if (typeof setLanguageForDropdown === 'function') {
        setLanguageForDropdown('.lang_dropdown-item');
      }
      if (typeof sortLanguageDropdown === 'function') {
        sortLanguageDropdown();
      }
    } catch(_) {}
  };

  window.setupQuickNavHandlers = function setupQuickNavHandlers() {
    // Theme
    var themeIcon = document.getElementById('quick-theme');
    if (themeIcon) {
      themeIcon.addEventListener('click', function(){ if (typeof toggleDarkMode === 'function') toggleDarkMode(); });
    }
    // Favorites (best-effort)
    var favIcon = document.getElementById('quick-favorites');
    if (favIcon) {
      favIcon.addEventListener('click', function(){
        try { if (typeof toggleFavoritesView === 'function') toggleFavoritesView(); } catch(_) {}
        try { if (typeof updateFavoritesSection === 'function') updateFavoritesSection(); } catch(_) {}
      });
    }
    // Search focus
    var searchIcon = document.getElementById('quick-search');
    if (searchIcon) {
      searchIcon.addEventListener('click', function(){
        var input = document.getElementById('searchBar');
        if (input) { try { input.scrollIntoView({behavior:'smooth', block:'center'}); } catch(_) {} input.focus(); }
      });
    }
    // Settings
    var settingsIcon = document.getElementById('quick-settings');
    if (settingsIcon) {
      settingsIcon.addEventListener('click', function(){
        var modalEl = document.getElementById('settingsModal');
        if (modalEl && typeof bootstrap !== 'undefined' && bootstrap.Modal) { new bootstrap.Modal(modalEl).show(); }
        else { window.location.href = '/Mutitools/multi-tool.html'; }
      });
    }
  };
})();


