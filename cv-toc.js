// CV page: al-folio-style sticky table of contents (built from card headings) + reading progress bar.
(function () {
  var nav = document.getElementById('toc-sidebar');
  var slug = function (t) { return t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  var heads = Array.prototype.slice.call(document.querySelectorAll('.cv-body .card h3, .cv-body .card h4'));
  var top = document.createElement('ol'); top.className = 'toc-list';
  var sub = null, links = [];
  heads.forEach(function (h) {
    if (!h.id) h.id = slug(h.textContent);
    var li = document.createElement('li'), a = document.createElement('a');
    a.href = '#' + h.id; a.className = 'toc-link'; a.textContent = h.textContent;
    li.appendChild(a); links.push({ a: a, h: h });
    if (h.tagName === 'H3') { top.appendChild(li); sub = null; }
    else {
      if (!sub) { sub = document.createElement('ol'); sub.className = 'toc-list'; top.lastChild.appendChild(sub); }
      sub.appendChild(li);
    }
  });
  nav.appendChild(top);

  var bar = document.getElementById('progress');
  function update() {
    var doc = document.documentElement, max = doc.scrollHeight - window.innerHeight;
    if (bar) bar.value = max > 0 ? window.scrollY / max : 0;
    var cur = links[0], y = window.scrollY + 110;
    links.forEach(function (l) { if (l.h.getBoundingClientRect().top + window.scrollY <= y) cur = l; });
    if (max > 0 && window.scrollY >= max - 2) cur = links[links.length - 1];
    links.forEach(function (l) { l.a.classList.toggle('is-active-link', l === cur); });
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
