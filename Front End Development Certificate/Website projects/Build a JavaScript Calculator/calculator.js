  $(document).ready(function (){
  //variable serves for checking the last pressed button
  var lastPressed = "";

  function displayNum(val) {
    // make sure it starts a new calculation if the field is a result of a previous calculation
    if (lastPressed == "enter") { resetResultScreen(); }

    // display the number
    var value = val.value;
    $("#result").append(value);

    lastPressed = value;
  }

  function operatorPressed(blueButton) {
    var op = blueButton.value;

    if (isLastOperator()) {
      // remove the last operator from the memory field and replace the line with the new operator
      var memoryNum = document.getElementById("memory").innerHTML.slice(0, -3);
      $("#memory").html(memoryNum + ' ' + op + ' ');

    } else {
      // add the new entry to the memory field
      var memoryNum = document.getElementById("result").innerHTML;
      $("#memory").append(memoryNum + ' ' + op + ' ');
    }

    lastPressed = op;
    resetResultScreen();
  }

  $('#enter').on('click', function() {

    if (isLastOperator()) {
      // remove the last operator from the memory field and replace the line
      var memoryNum = document.getElementById("memory").innerHTML.slice(0, -3);
      $("#memory").html(memoryNum);
    }

    // add the last entry to the memory line
   	var memoryNum = document.getElementById("result").innerHTML;
    $("#memory").append(memoryNum);
    resetResultScreen();

    //evaluate the memory line
    var result = eval(document.getElementById("memory").innerHTML);
    // fix eval problem with 0.3
    if (result % 0.30000000000000004 == 0) {
      result = result.toPrecision(1);
    }
    $("#result").html(result);
    resetMemoryScreen();

    lastPressed = "enter";
  });

  function resetResultScreen() {
    $("#result").html("");
  }

  function resetMemoryScreen() {
    $("#memory").html("");
  }

  function isLastOperator() {
    if (lastPressed == "+" || lastPressed == "-" || lastPressed == "*" || lastPressed == "/") {
      return true;
    } else {
      return false;
    }
  }

  $('#num0, #num1, #num2, #num3, #num4, #num5, #num6, #num7, #num8, #num9, #dot').on('click', function() {
   	displayNum(this);
  });

  $('#divide, #multiply, #substr, #add').on('click', function() {
   	operatorPressed(this);
  });

  $('#ce').on('click', function() {
   	resetResultScreen();
  });

  $('#ac').on('click', function() {
   	resetResultScreen();
    resetMemoryScreen();
  });

  function isValidResult() {
    if (!document.getElementById("result").innerHTML) {
      $("#result").html("error");
    }
  }
});
