  $(document).ready(function () {

    // using howler.js so game also plays overlapping sounds
    var audio0 = new Howl ({
        src: ['http://s3.amazonaws.com/freecodecamp/simonSound1.mp3']
      });
    var audio1 = new Howl ({
        src: ['http://s3.amazonaws.com/freecodecamp/simonSound2.mp3']
      });
    var audio2 = new Howl ({
        src: ['http://s3.amazonaws.com/freecodecamp/simonSound3.mp3']
      });
    var audio3 = new Howl ({
        src: ['http://s3.amazonaws.com/freecodecamp/simonSound4.mp3']
      });

    // helper display functions
    function switchPosition() {
      $('#pwr-switch').css('left', power ? '20px' : '');
    }

    function countDisplay() {
      $('.count').css('color', power ? '#DC0D29' : '#430710');
    }

    function strictLed() {
      if (power) {
        $('#strict-led').css('background-color', strictMode ? '#ff0000' : '#32050C');
      } else {
        $('#strict-led').css('background-color', '#32050C');
      }
    }

    function checkCursor() {
      if (power) {
        $('.push').css('cursor', gameStarted ? 'pointer' : '');
      } else {
        $('.push').css('cursor', '');
      }
    }

    // turn on/off the game
    var power = false;
    $('.onoff').on('click', function() {
      power = power ? false : true;
      switchPosition();
      countDisplay();
      strictLed();
      resetGame();
      checkCursor();
    });

    // set strict gameplay mode
    var strictMode = false;
    $('.strict').on('click', function() {
      if (power) {
        strictMode = (strictMode) ? false : true;
        strictLed();
      }
    });

    // start or reset game
    $('.start').on('click', function() {
      if (power && !memoryLoop) {
        resetGame();
        checkCursor();
        playGame();
      }
    });

    // speed up timer based on the turns
    var timer = 1250;
    function setupTimer() {
      if (gameTurn < 5) {
        timer = 1250;
      } else if (gameTurn < 9) {
        timer = 1000;
      } else if (gameTurn < 13) {
        timer = 750;
      } else {
        timer = 500;
      }
    }

    // the main game
    var gameOrder = [];
    var playerOrder = [];
    var gameStarted = false;
    var validClick = false;
    var gameTurn = 0;
    var nextNumber = 0;
    var memoryLoop = false;
    function playGame() {
      gameStarted = true;

      // generate random number between 0 and 3 included
      var min = 0;
      var max = 3;
      nextNumber = getNextRandom(min, max);

      // disable ckick so player can't interrupt with the display loop
      disableClick();
      removeActiveClasses();

      if (repeat) {
        // repeat the previous array, don't need to add new number in array
        memoryLoop = true;
        id = setInterval(timeIt, timer);
      } else {
        // new turn
        if (gameOrder.length < 20) {
          gameTurn++;
          setupTimer();
          gameOrder.push(nextNumber);
          // start the memory playback
          memoryLoop = true;
          id = setInterval(timeIt, timer);
        } else {
          // game over, player won the game
          disableClick();
          displayGameOver();
          // reset the game
          setTimeout(function(){
            resetGame();
            checkCursor();
          }, 1500)
        }
      }

      function getNextRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }

    // responsible for displaying all elements in memory loop
    var counter = 0;
    function timeIt() {
      displayTurn(gameTurn);
      if (counter < gameOrder.length) {
        let select = ".p" + gameOrder[counter];
        let lightClass = "p" + gameOrder[counter] + "-light";
        playSound(gameOrder[counter]);
        $(select).toggleClass(lightClass);
        setTimeout(function(){
          $(select).toggleClass(lightClass);
        }, timer*0.65)
        counter++;
      } else {
        // end of memory loop
        counter = 0;
        memoryLoop = false;
        // make sure player didn't turn off the game meanwhile
        if (power) {
          enableClick();
          addActiveClasses();
        }
        clearInterval(id);
      }
    }

    var repeat = false;
    $('.push').on('click', function(){
      if (gameStarted && validClick && (playerOrder.length < gameOrder.length)) {
        repeat = false;
        playSound(this.id);
        compareArrays(this.id);
      }
    });

    var idx = 0;
    function compareArrays(val) {
      if (idx < gameOrder.length) {
        // correct answer is stored in the playerOrder
        if (val == gameOrder[idx]) {
          playerOrder.push(val);
          idx++;
        } else {
          // uncorrect answer, if strictMode - game over, else repeat last turn
          if (strictMode) {
            disableClick();
            displayAlert();
            setTimeout(function(){
              resetGame();
              checkCursor();
            }, 1000)
          } else {
            repeat = true;
            disableClick();
            displayAlert();
            setTimeout(function(){
              resetComparingIndex();
              resetPlayerOrder();
              playGame();
            }, 500)
          }
        }
      } if (playerOrder.length === gameOrder.length) {
        // new turn
        resetComparingIndex();
        resetPlayerOrder();
        playGame();
      }
    }

    function playSound(val) {
        if (val == 0) {
          audio0.play();
        } else if (val == 1) {
          audio1.play();
        } else if (val == 2) {
          audio2.play();
        } else {
          audio3.play();
        }
    }

    // set back all values to default
    function resetGame() {
      resetComparingIndex();
      resetAllOrder();
      disableClick();
      removeActiveClasses();
      gameStarted = false;
      gameTurn = 0;
      nextNumber = 0;
      counter = 0;
      repeat = false;
      timer = 1250;
      $("#counter").html("--");
    }

    function resetAllOrder() {
      gameOrder = [];
      playerOrder = [];
    }

    function resetPlayerOrder() {
      playerOrder = [];
    }

    function resetComparingIndex() {
      idx = 0;
    }

    function enableClick() {
      validClick = true;
    }

    function disableClick() {
      validClick = false;
    }

    function addActiveClasses() {
      $("#0").addClass("p0-active");
      $("#1").addClass("p1-active");
      $("#2").addClass("p2-active");
      $("#3").addClass("p3-active");
    }

    function removeActiveClasses() {
      $("#0").removeClass("p0-active");
      $("#1").removeClass("p1-active");
      $("#2").removeClass("p2-active");
      $("#3").removeClass("p3-active");
    }

    function displayTurn(val) {
      var number = (val < 10) ? ("0" + val) : val;
      $("#counter").html(number);
    }

    function displayGameOver() {
      for(var i = 0; i<3; i++) {
        $("#counter").fadeTo('fast', 0.1).fadeTo('fast', 1.0);
      }
    }

    function displayAlert() {
      $("#counter").html("!!");
      for(var i = 0; i<2; i++) {
        $("#counter").fadeTo('fast', 0.1).fadeTo('fast', 1.0);
      }
    }
});
