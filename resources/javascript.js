(function () {
  
  // append index.html to local links, if the website is being viewed on a local file system
  if (window.location.protocol == 'file:') {
    for (var a = document.querySelectorAll('a[href$="/"]'), i = 0, j = a.length; i < j; i++) {
      if (!/http/.test(a[i].href)) {
        a[i].href += 'index.html';
      }
    }
  }
  
}());