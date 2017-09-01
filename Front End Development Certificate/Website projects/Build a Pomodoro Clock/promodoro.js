  $(document).ready(function (){

    var sessionLength = 25; // default session time
    var breakLength = 5;    // default break time
    var maxLength = 999;
    var minLength = 1;

    var displaySessionLength = sessionLength;
    var displayBreakLength = breakLength;
    var counter = 0;
    var secondsLeft = 0;

    var running = false;
    var newRun = true;
    var sessionPeriod = true;  // variable for checking the period cycle

    // initial timer update
    UpdateTimeSet();

    $('#start-pause').on('click', function() {
      return (running) ? pauseClock() : runClock();
    });

    $('#break-minus').on('click', function() {
      displayBreakLength = (displayBreakLength > minLength) ? (displayBreakLength-1) : minLength;
      UpdateTimeSet();
    });

    $('#break-plus').on('click', function() {
      displayBreakLength = (displayBreakLength < maxLength) ? (displayBreakLength+1) : maxLength;
      UpdateTimeSet();
    });

    $('#session-minus').on('click', function() {
      displaySessionLength = (displaySessionLength > minLength) ? (displaySessionLength-1) : minLength;
      UpdateTimeSet();
    });

    $('#session-plus').on('click', function() {
      displaySessionLength = (displaySessionLength < maxLength) ? (displaySessionLength+1) : maxLength;
      UpdateTimeSet();
    });

    function UpdateTimeSet() {
      $("#break-time").html(displayBreakLength);
      $("#session-time").html(displaySessionLength);

      // only reset the countdown if the current period length is changed
      if (sessionPeriod) {
        if (breakLength !== displayBreakLength) {
          breakLength = displayBreakLength;
        }
        if (sessionLength !== displaySessionLength) {
          newRun = true;
          sessionLength = displaySessionLength;
        }
      } else {
        if (breakLength !== displayBreakLength) {
          breakLength = displayBreakLength;
          newRun = true;
        }
        if (sessionLength !== displaySessionLength) {
          sessionLength = displaySessionLength;
        }
      }
    }

    function runClock() {
      $("#start-pause").html("pause");
      $("#start-pause").css("background-color", "#d60000");
      running = true;
      if (newRun) {
        counter = 0;
        secondsLeft = (sessionPeriod) ? (sessionLength * 60) : (breakLength * 60);
      }
      newRun = false;
      id = setInterval(timeIt, 1000);
    }

    // this function is the countdown function
    function timeIt() {
      counter++;
      // display the time left
      if ((secondsLeft-counter) >= 0) {
        $("#time").html(convertSeconds(secondsLeft-counter));
      }
      // change period cycle
      else if ((secondsLeft-counter) == -1) {
        sessionPeriod = (sessionPeriod) ? false : true;
        if (sessionPeriod) {
          $("#period-cycle").html("session");
        } else {
          $("#period-cycle").html("break");
        }
        // reset the period run
        newRun = true;
        counter = 0;
        clearInterval(id);
        runClock();
      } else {
        clearInterval(id);
      }
    }

    function convertSeconds(s) {
      var min = Math.floor(s / 60);
      var sec = s % 60;
      // below 100 always display in two digits
      if (min < 10) {
        return ("00" + min).substr(-2) + ' : ' + ("00" + sec).substr(-2);
      } else {
        return min + " : " + ("00" + sec).substr(-2);
      }
    }

    function pauseClock() {
      running = false;
      clearInterval(id);
      $("#start-pause").html("start");
      $("#start-pause").css("background-color", "green");
    }
});
