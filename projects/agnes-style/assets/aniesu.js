(function (window, document) {
  'use strict';
  
  // data/functions for our manga viewer, Agnes
  window.Aniesu = {
    active : false,
    
    // current chapter and page
    current : {
      ch : 1,
      pg : 1
    },

    
    // chapter list; chapter : page_total
    chapter : {
      1 : 5,
      2 : 4,
      3 : 4,
      4 : 4
    },
    
    
    // creates manga viewer
    createViewer : function () {
      if (Aniesu.viewer) { // only one viewer can exist
        return false;
      }
      
      var viewer = document.createElement('DIV');
      viewer.id = 'aniesu_viewer';
      viewer.innerHTML = 
        '<div id="aniesu_viewer_prev" onclick="Aniesu.prev();"></div>'+
        '<div id="aniesu_viewer_next" onclick="Aniesu.next();"></div>'+
        '<div id="aniesu_viewer_page" tabindex="0" onclick="Aniesu.hideHeader();"></div>'+
        '<div id="aniesu_viewer_head">'+
          '<div id="aniesu_viewer_close" onclick="Aniesu.close();" title="Close manga viewer"></div>'+
          '<div id="aniesu_viewer_title">'+
            '<div id="aniesu_viewer_manga_title">Kuro no Kiseki: Agnes\' Style</div>'+
            '<div id="aniesu_viewer_chapter_title">Chapter 1</div>'+
          '</div>'+
          "<a id=\"aniesu_viewer_twitter\" href=\"https://twitter.com/intent/tweet?hashtags=%E3%82%A2%E3%83%8B%E3%82%A8%E3%82%B9%E3%81%AE%E6%B5%81%E5%84%80&text=Kuro%20no%20Kiseki%3A%20Agnes'%20Style%20-%20Chapter%201&url=https%3A%2F%2Fsethclydesdale.github.io%2Fprojects%2Fagnes-style%2F%3Fchapter%3D1\" target=\"_blank\" title=\"Share current chapter to Twitter\"></a>"+
        '</div>';
      
      document.body.appendChild(viewer);
      
      // cache elements for later manipulation
      Aniesu.viewer = {
        body : viewer,
        ch_title : document.getElementById('aniesu_viewer_chapter_title'),
        page : document.getElementById('aniesu_viewer_page'),
        prev : document.getElementById('aniesu_viewer_prev'),
        next : document.getElementById('aniesu_viewer_next'),
        twitter : document.getElementById('aniesu_viewer_twitter')
      };
    },

    
    // opens and views the selected chapter
    open : function (ch, pg) {
      Aniesu.active = true;
      
      // set current chapter/page
      Aniesu.current = {
        ch : ch,
        pg : pg
      };
      
      // preload pages for the selected chapter
      Aniesu.preloadPages(ch);
      
      // also preload pages in the previous chapter
      if (ch > 1) {
        Aniesu.preloadPages(ch - 1);
      }
      
      // create viewer if it doesn't exist, otherwise show it
      if (!Aniesu.viewer) {
        Aniesu.createViewer();
      } else {
        Aniesu.viewer.body.style.display = '';
      }
      
      // hide scroll bar so it doesn't get in the way
      document.body.style.overflow = 'hidden';
      
      // update share link with selected chapter
      Aniesu.updateShareLink();
      
      // set current chapter title and page
      Aniesu.viewer.ch_title.innerHTML = 'Chapter ' + Aniesu.current.ch;
      Aniesu.viewer.page.style.backgroundImage = 'url(chapters/read/chapter-' + ch + '/' + pg + '.jpg)';
      
      // focus page to show the header for a few seconds
      Aniesu.viewer.page.focus();
      Aniesu.hideHeader();
    },

    
    // closes the manga viewer
    close : function () {
      Aniesu.active = false;
      Aniesu.viewer.body.style.display = 'none';
      document.body.style.overflow = '';
    },

    
    // next page/chapter
    next : function () {
      // increment page number, then increment chapter if reached the end of the current one
      if (Aniesu.chapter[Aniesu.current.ch] && ++Aniesu.current.pg > Aniesu.chapter[Aniesu.current.ch]) {
        // go to the next chapter if it exists
        if (Aniesu.chapter[++Aniesu.current.ch]) {
          Aniesu.current.pg = 1;
          Aniesu.updateShareLink();
          Aniesu.viewer.ch_title.innerHTML = 'Chapter ' + Aniesu.current.ch;
          
        } else { // otherwise let the reader know they've reached the end, then close the viewer
          Aniesu.current.ch--;
          Aniesu.current.pg--;
          
          alert("You've reached the end for now! Check back later for when new chapters are added. You can close the manga viewer by clicking the middle of the screen and then the X on the top left.");
        }
      }
      
      // preload next chapter
      if (Aniesu.current.pg == Aniesu.chapter[Aniesu.current.ch]) {
        Aniesu.preloadPages(Aniesu.current.ch + 1);
      }
      
      // update page
      if (Aniesu.chapter[Aniesu.current.ch]) {
        Aniesu.viewer.page.style.backgroundImage = 'url(chapters/read/chapter-' + Aniesu.current.ch + '/' + Aniesu.current.pg + '.jpg)';
      }
    },

    
    // previous page/chapter
    prev : function () {
      // increment page number, then increment chapter if reached the end of the current one
      if (Aniesu.chapter[Aniesu.current.ch] && --Aniesu.current.pg < 1) {
        // go to the prev chapter if it exists
        if (Aniesu.chapter[--Aniesu.current.ch]) {
          Aniesu.preloadPages();
          Aniesu.current.pg = Aniesu.chapter[Aniesu.current.ch];
          Aniesu.updateShareLink();
          Aniesu.viewer.ch_title.innerHTML = 'Chapter ' + Aniesu.current.ch;
          
        } else { // otherwise let the reader know they've reached the beginning
          Aniesu.current.ch++;
          Aniesu.current.pg++;
          
          alert('This goes to the previous page! Click on the right side of the screen to show the next page. Click the middle of the page to show the top bar.');
        }
      }
      
      // preload prev chapter
      if (Aniesu.current.pg == 1) {
        Aniesu.preloadPages(Aniesu.current.ch - 1);
      }
      
      // update page
      if (Aniesu.chapter[Aniesu.current.ch]) {
        Aniesu.viewer.page.style.backgroundImage = 'url(chapters/read/chapter-' + Aniesu.current.ch + '/' + Aniesu.current.pg + '.jpg)';
      }
    },
    
    
    // preloads pages for the current chapter
    preloadPages : function (chapter) {
      if (Aniesu.chapter[chapter]) {
        var i = Aniesu.chapter[chapter] + 1;

        while (i --> 1) {
          Aniesu.preload('chapters/read/chapter-' + chapter + '/' + i + '.jpg');
        }
      }
    },
    
    // preloads the image
    preload : function (url) {
      var img = new Image();
      img.src = url;
    },
    
    
    // hides the header after a few seconds, so it's not in the way
    hideHeader : function (caller) {
      // clear existing timeout
      if (Aniesu.timeout) clearTimeout(Aniesu.timeout);
      
      // set new timeout
      Aniesu.timeout = setTimeout(function () {
        Aniesu.viewer.page.blur();
        delete Aniesu.timeout;
      }, 3000);
    },
    
    // updates the chapter texts in the twitter share link
    updateShareLink : function () {
      Aniesu.viewer.twitter.href = "https://twitter.com/intent/tweet?hashtags=%E3%82%A2%E3%83%8B%E3%82%A8%E3%82%B9%E3%81%AE%E6%B5%81%E5%84%80&text=Kuro%20no%20Kiseki%3A%20Agnes'%20Style%20-%20Chapter%20" + Aniesu.current.ch + "&url=https%3A%2F%2Fsethclydesdale.github.io%2Fprojects%2Fagnes-style%2F%3Fchapter%3D" + Aniesu.current.ch;
    }
  };
  
  
  // auto open URL based on query (?chapter=1)
  if (/chapter=\d+/i.test(window.location.search)) {
    var chapter = Number(window.location.search.replace(/.*?chapter=(\d+).*/, '$1'));
    
    if (Aniesu.chapter[chapter]) {
      Aniesu.open(chapter, 1);
    }
  }
  
  
  // keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (Aniesu.active) {
      // check what key was pressed
      switch (e.key.toLowerCase()) {
        // previous page
        case 'left':
        case 'arrowleft':
          Aniesu.prev();
          break;

        // next page
        case 'right':
        case 'arrowright':
          Aniesu.next();
          break;
          
        // close viewer
        case 'esc':
        case 'escape':
          Aniesu.close();
          break;
          
        default:
          break;
      }
    }
  });
}(window, document));