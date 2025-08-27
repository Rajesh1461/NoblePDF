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
            '<span class="material-symbols-rounded" title="Favorites">star</span>' +
            '<span class="material-symbols-rounded" title="Theme">light_mode</span>' +
            '<span class="material-symbols-rounded" title="Language">language</span>' +
            '<span class="material-symbols-rounded" title="Search">search</span>' +
            '<span class="material-symbols-rounded" title="Settings">settings</span>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function buildFooterHtml() {
    return (
      '<footer class="footer-pad footer-solid" role="contentinfo" aria-label="Footer" style="height:48px;">' +
        '<div class="footer-content">' +
          '<div class="d-flex justify-content-between align-items-center" style="gap: 12px;">' +
            '<div class="d-flex align-items-center" style="gap: 8px;">' +
              '<span>Powered by</span>' +
              '<img src="/assets/images/favicon.svg" alt="Noble PDF logo" width="16" height="16" />' +
              '<span>Noble PDF</span>' +
            '</div>' +
            '<nav aria-label="Footer navigation" class="d-flex flex-wrap align-items-center" style="gap: 12px;">' +
              '<a href="#">Licenses</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="#">Releases</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="#">Survey</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="#">Privacy Policy</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="#">Terms and Conditions</a>' +
              '<span aria-hidden="true">·</span>' +
              '<a href="#">Cookie Preferences</a>' +
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

    // Append footer if not present
    if (!document.querySelector('footer.footer-pad.footer-solid')) {
      var f = document.createElement('div');
      f.innerHTML = buildFooterHtml();
      document.body.appendChild(f.firstChild);
    }
  }

  function ensureVisibility() {
    try {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    } catch(_) {}
  }

  function init() {
    ensureCssLinks();
    injectLayout();
    ensureVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


