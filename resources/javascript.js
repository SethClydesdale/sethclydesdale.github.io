// # MODIFICATIONS FOR ALL PAGES #
(function (window, document) {
  'use strict';
  
  // # OFFLINE LINK MODIFICATIONS #
  // appends index.html to links if this project is hosted on the local file system
  if (window.location.protocol == 'file:') {
    for (var a = document.getElementsByTagName('A'), i = 0, j = a.length; i < j; i++) {
      if (!/http/.test(a[i].href)) {
        if (/\/$/.test(a[i].href)) {
          a[i].href += 'index.html';
        } else if (/\/#.*?$/.test(a[i].href)) {
          a[i].href = a[i].href.replace(/(#.*?)$/, 'index.html$1');
        } else if (/\/\?.*?$/.test(a[i].href)) {
          a[i].href = a[i].href.replace(/(\?.*?)$/, 'index.html$1');
        }
      }
    }
  }

  
  // # SECTION ANCHORS #
  // adds an anchor link to headings
  for (var h = document.getElementById('content').querySelectorAll('h1, h2, h3, h4, h5, h6'), i = 0, j = h.length; i < j; i++) {
    if (h[i].id) {
      h[i].insertAdjacentHTML('afterbegin', '<a href="#' + h[i].id + '" class="anchor"><span class="anchor-icon">&#xf0c1;</span></a>');
    }
  }
  
}(window, document));