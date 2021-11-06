(function(window, document) {
  'use strict'
  
  // Altina's logic
  window.Altina = {
    chan : document.getElementById('altina'),
    food : document.getElementById('pancakes'),
    
    // feed Altina some delicious pancakes; SAVE HER FROM STARVATION SO SHE CAN MAKE IT HOME!!
    feed : function (caller) {
      caller.style.visibility = 'hidden';
      caller.onclick = null;
      Altina.food.style.display = '';
      
      // Altina sees the delicious pancakes you offer her..
      setTimeout(function () {
        Altina.chan.src = '../assets/altina/images/altina-pancake-eyes.png';
        
        // she then recovers her energy by devouring them..
        setTimeout(function () {
          Altina.food.style.display = 'none';
          Altina.chan.src = '../assets/altina/images/altina-eating.png';
          
          // s-she's uh, really scarfing them down...
          setTimeout(function () {
            Altina.chan.src = '../assets/altina/images/altina-eating-continued.png';

            // she thanks you for saving her from starving to death, due to a lack of sugar..
            setTimeout(function () {
              Altina.chan.src = '../assets/altina/images/altina-thanking.png';

              // having recovered her energy, Altina leaves for home... THE END (or is it..?)
              setTimeout(function () {
                Altina.chan.className = 'leaving-for-home';
                Altina.chan.src = '../assets/altina/images/altina-leaving.png';

                // after a long day, Altina goes to sleep with a belly full of pancakes..
                setTimeout(function () {
                  Altina.chan.className = 'going-to-bed';
                  Altina.chan.src = '../assets/altina/images/altina-sleepy.png';

                  // sweet dreams! (literally, she's probably gonna dream of those pancakes)
                  setTimeout(function () {
                    Altina.chan.className = '';
                    Altina.chan.src = '../assets/altina/images/altina-sleeping.png';
                  }, 4000);
                }, 3900);
              }, 3000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 500);
    }
    
  };
  
}(window, document));