(function () {
  const PASSWORD = 'Design250';
  const AUTH_KEY = 'proto_auth';

  // Immediately hide the page to prevent flash before auth check
  var hideStyle = document.createElement('style');
  hideStyle.id = '__auth_hide';
  hideStyle.textContent = 'body{visibility:hidden!important}';
  document.head.appendChild(hideStyle);

  function reveal() {
    var s = document.getElementById('__auth_hide');
    if (s) s.remove();
  }

  function isAuthed() {
    try { return localStorage.getItem(AUTH_KEY) === '1'; } catch (e) { return false; }
  }

  function showOverlay() {
    reveal();
    var overlay = document.createElement('div');
    overlay.id = '__auth_overlay';
    overlay.innerHTML = [
      '<style>',
      '#__auth_overlay{',
        'position:fixed;inset:0;z-index:99999;',
        'background:#0f1117;',
        'display:flex;align-items:center;justify-content:center;',
        'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;',
        'padding:24px;',
      '}',
      '#__auth_box{',
        'width:100%;max-width:360px;',
        'background:#1a1d27;',
        'border:1px solid #2a2d3e;',
        'border-radius:16px;',
        'padding:36px 32px;',
        'text-align:center;',
        'box-shadow:0 24px 60px rgba(0,0,0,0.5);',
      '}',
      '#__auth_logo{',
        'width:44px;height:44px;',
        'background:#6c63ff;',
        'border-radius:12px;',
        'display:inline-flex;align-items:center;justify-content:center;',
        'font-size:20px;font-weight:700;color:#fff;',
        'margin-bottom:20px;',
      '}',
      '#__auth_title{',
        'font-size:18px;font-weight:700;color:#e8eaf0;',
        'letter-spacing:-0.3px;margin-bottom:6px;',
      '}',
      '#__auth_sub{',
        'font-size:13px;color:#8b8fa8;margin-bottom:24px;',
      '}',
      '#__auth_input{',
        'width:100%;padding:12px 14px;',
        'background:#0f1117;',
        'border:1.5px solid #2a2d3e;',
        'border-radius:10px;',
        'font-size:15px;color:#e8eaf0;',
        'font-family:inherit;',
        'outline:none;',
        'text-align:center;',
        'letter-spacing:0.05em;',
        'transition:border-color 0.2s;',
        'margin-bottom:12px;',
        'box-sizing:border-box;',
      '}',
      '#__auth_input:focus{border-color:#6c63ff;}',
      '#__auth_input::placeholder{color:#555872;letter-spacing:0;}',
      '#__auth_btn{',
        'width:100%;padding:12px;',
        'background:#6c63ff;',
        'border:none;border-radius:10px;',
        'font-size:14px;font-weight:700;color:#fff;',
        'cursor:pointer;font-family:inherit;',
        'transition:background 0.15s,transform 0.1s;',
        'letter-spacing:0.1px;',
      '}',
      '#__auth_btn:hover{background:#5b52ee;}',
      '#__auth_btn:active{transform:scale(0.98);}',
      '#__auth_error{',
        'font-size:12px;color:#f87171;',
        'margin-top:10px;min-height:16px;',
        'opacity:0;transition:opacity 0.2s;',
      '}',
      '#__auth_error.show{opacity:1;}',
      '</style>',
      '<div id="__auth_box">',
        '<div id="__auth_logo">P</div>',
        '<div id="__auth_title">Prototype Library</div>',
        '<div id="__auth_sub">Enter the password to continue</div>',
        '<input id="__auth_input" type="password" placeholder="Password" autocomplete="current-password" />',
        '<button id="__auth_btn">Unlock</button>',
        '<div id="__auth_error">Incorrect password — try again</div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var input = document.getElementById('__auth_input');
    var btn = document.getElementById('__auth_btn');
    var err = document.getElementById('__auth_error');

    input.focus();

    function attempt() {
      if (input.value === PASSWORD) {
        try { localStorage.setItem(AUTH_KEY, '1'); } catch (e) {}
        overlay.style.transition = 'opacity 0.3s';
        overlay.style.opacity = '0';
        setTimeout(function () { overlay.remove(); }, 300);
      } else {
        input.value = '';
        err.classList.add('show');
        input.style.borderColor = '#f87171';
        setTimeout(function () {
          err.classList.remove('show');
          input.style.borderColor = '';
        }, 2500);
        input.focus();
      }
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (isAuthed()) {
      reveal();
    } else {
      showOverlay();
    }
  });
})();
