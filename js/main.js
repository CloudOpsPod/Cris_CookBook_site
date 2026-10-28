/* Cris' CookBook: tiny vanilla JS, no dependencies. */
(function () {
  'use strict';
  var KEY = 'ccb-consent-v1';

  function store(get, val) {
    try { return get ? localStorage.getItem(KEY) : localStorage.setItem(KEY, val); } catch (e) { return null; }
  }

  /* ---- consent-gated tags ---- */
  function activate(category) {
    document.querySelectorAll('script[type="text/plain"][data-consent="' + category + '"]').forEach(function (old) {
      if (old.dataset.done) return;
      old.dataset.done = '1';
      var s = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function (a) {
        if (a.name === 'type' || a.name === 'data-consent' || a.name === 'data-src' || a.name === 'data-done') return;
        s.setAttribute(a.name, a.value);
      });
      if (old.dataset.src) s.src = old.dataset.src; else s.text = old.text;
      document.head.appendChild(s);
    });
  }
  function applyConsent(level) {
    if (level === 'all') {
      ['analytics', 'ads', 'marketing'].forEach(activate);
      // push each ad slot once the AdSense script is present, unless still in placeholder mode
      if (document.body.dataset.ads !== 'placeholder') {
        document.querySelectorAll('ins.adsbygoogle').forEach(function () {
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
        });
      }
    }
  }

  var banner = document.querySelector('.consent');
  function show() { if (banner) banner.hidden = false; }
  function choose(level) { store(false, level); if (banner) banner.hidden = true; applyConsent(level); }

  var saved = store(true);
  if (saved) applyConsent(saved); else show();
  var a = document.querySelector('[data-consent-accept]'), e = document.querySelector('[data-consent-essential]');
  if (a) a.addEventListener('click', function () { choose('all'); });
  if (e) e.addEventListener('click', function () { choose('essential'); });
  document.querySelectorAll('[data-open-consent]').forEach(function (b) { b.addEventListener('click', show); });

  /* ---- nav toggle ---- */
  var t = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
  if (t && nav) t.addEventListener('click', function () {
    var open = nav.dataset.open === 'true';
    nav.dataset.open = String(!open);
    t.setAttribute('aria-expanded', String(!open));
  });

  /* ---- footer year ---- */
  document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* ---- recipe search + course filter ---- */
  var results = document.querySelector('[data-results]');
  if (results) {
    var q = document.querySelector('[data-search]'), chips = document.querySelectorAll('.chip'), empty = document.querySelector('[data-empty]');
    var cat = 'All';
    var run = function () {
      var term = (q.value || '').trim().toLowerCase(), shown = 0;
      results.querySelectorAll('.card').forEach(function (c) {
        var ok = (cat === 'All' || c.dataset.cat === cat) && (!term || c.dataset.title.indexOf(term) > -1);
        c.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    q.addEventListener('input', run);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        cat = c.dataset.filter;
        chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); });
        run();
      });
    });
  }

  /* ---- recipe servings scaler ---- */
  var qtys = document.querySelectorAll('[data-qty]');
  if (qtys.length) {
    var base = 2, cur = 2;
    var fmt = function (n) { return (Math.round(n * 10) / 10).toString(); };
    document.querySelectorAll('[data-serv]').forEach(function (b) {
      b.addEventListener('click', function () {
        cur = Math.min(12, Math.max(1, cur + Number(b.dataset.serv)));
        qtys.forEach(function (s) { s.textContent = fmt(Number(s.dataset.qty) * cur / base) + ' ' + s.dataset.unit; });
        document.querySelectorAll('[data-servings]').forEach(function (s) { s.textContent = cur; });
      });
    });
  }

  /* ---- share links get the current page URL ---- */
  document.querySelectorAll('[data-share]').forEach(function (l) {
    var u = encodeURIComponent(location.href), ti = encodeURIComponent(document.title), k = l.dataset.share;
    if (k === 'pinterest') l.href = 'https://pinterest.com/pin/create/button/?url=' + u + '&description=' + ti;
    if (k === 'facebook') l.href = 'https://www.facebook.com/sharer/sharer.php?u=' + u;
    if (k === 'whatsapp') l.href = 'https://wa.me/?text=' + ti + '%20' + u;
  });
})();
