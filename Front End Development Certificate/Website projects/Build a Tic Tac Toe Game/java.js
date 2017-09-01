$(document).ready(function() {

  const grid = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  // initial setup
  setupGame();

  function setupGame() {
    $('#msg').text("Select your game mode").fadeIn(300);
    $('.game .game-board .pick').toggle();

    // hide buttons not yet required
    $('.token').toggle();
    $(".next").toggle();
  }

  // set the game mode based on the user choice and replace buttons
  var gameMode = "";
  $('.game-mode').on("click", function(){
    gameMode = this.id;
    $('#msg').fadeOut(300);
    setTimeout(function(){
      $('#msg').text("Select your token (Player One)").fadeIn(300);
      $('.game-mode').toggle();
      $('.token').toggle();
    }, 300)
  });

  // set user token based on the user choice and reveal next button
  var PLAYER_TOKEN = '';
  var PLAYER_TWO_TOKEN = '';
  $('.token').on("click", function(){
    PLAYER_TOKEN = this.id;
    PLAYER_TWO_TOKEN = (PLAYER_TOKEN == 'X') ? "O" : "X";
    $('#msg').fadeOut(300);
    setTimeout(function(){
      $('.game .game-board .pick').fadeToggle();
      displayResult();
      $('.token').toggle();
      $(".next").toggle();
      displayTurn();
    }, 300)
  });

  // reset stats and start a new game
  $('#restart').on("click", function(){
    $('#msg').fadeOut(300);
    setTimeout(function(){
      resetGrid();
      setupNewGame();
      setupGame();
    }, 300)
  });

  // play again
  $('#again').on("click", function(){
    $('#msg').fadeOut(300);
    setTimeout(function(){
      resetGrid();
      resetGame();
      displayResult();
    }, 300)
  });

  function resetGrid() {
    for (var i = 0; i<3; i++) {
      for (var j = 0; j<3; j++) {
        grid[i][j] = " ";
        $(".pick[data-i=" + i + "][data-j=" + j + "]").html("");
      }
    }
  }

  function resetGame() {
    alreadyClicked = false;
    turn = "Player One";
  }

  function resetStats() {
    playerOneResult = 0;
    playerTwoResult = 0;
    computerResult = 0;
  }

  // display the current game stats
  var playerOneResult = 0;
  var playerTwoResult = 0;
  var computerResult = 0;
  var playerTwo = "";
  function displayResult() {
    playerTwo = (gameMode === "oneP") ? "Computer" : "Player Two";
    var stat = "Player One: " + playerOneResult + "  |  " + playerTwo + ": " + ((gameMode === "oneP") ? computerResult : playerTwoResult);
    $("#stat").html(stat).fadeIn(300);
  }

  var turn = "Player One";
  function displayTurn() {
    $('#msg').fadeOut(300);
    setTimeout(function(){
      $("#msg").html(turn + "'s turn").fadeIn(300);
    }, 300);
  }

  // rearrange the option buttons and reset stats
  function setupNewGame() {
    $('.token').toggle();
    $('.game-mode').toggle();
    resetGame();
    resetStats();
  }

  function isGameOver(newGrid) {
    // check for horizontal lines
    for (var i = 0; i<3; i++) {
      if (newGrid[i][0] !== ' ' &&
          newGrid[i][0] === newGrid[i][1] &&
          newGrid[i][0] === newGrid[i][2]) {
        return newGrid[i][0];
      }
    }

    // check for vertical lines
    for (var j = 0; j<3; j++) {
      if (newGrid[0][j] !== ' ' &&
          newGrid[0][j] === newGrid[1][j] &&
          newGrid[0][j] === newGrid[2][j]) {
        return newGrid[0][j];
      }
    }

    // check diagonal - top left to bottom right
    if (newGrid[0][0] !== ' ' &&
        newGrid[0][0] === newGrid[1][1] &&
        newGrid[0][0] === newGrid[2][2]) {
      return newGrid[0][0];
    }

    // check diagonal - top right to bottom left
    if (newGrid[0][2] !== ' ' &&
        newGrid[0][2] === newGrid[1][1] &&
        newGrid[0][2] === newGrid[2][0]) {
      return newGrid[0][2];
    }

    // check if there is an empty cell left
    for (var i = 0; i<3; i++) {
      for (var j = 0; j<3; j++) {
        if (newGrid[i][j] === ' ') {
          return false;
        }
      }
    }

    // otherwise it's a tie
    return null;
  }

  // using minimax as AI
  function miniMax(newGrid, depth, player) {
    const winner = isGameOver(newGrid);

    if (winner === false) {
      const values = [];

      for (var i = 0; i<3; i++) {
        for (var j = 0; j<3; j++) {
          gridCopy = _.cloneDeep(newGrid);
          if (gridCopy[i][j] !== ' ') continue;
          gridCopy[i][j] = player;
          const value = miniMax(gridCopy, depth + 1, (player === PLAYER_TOKEN) ? PLAYER_TWO_TOKEN : PLAYER_TOKEN);
          values.push({
            cost: value,
            cell: {
              i: i,
              j: j
            }
          });
        }
      }

      if (player === PLAYER_TWO_TOKEN) {
        const max = _.maxBy(values, (v) => {
          return v.cost;
        });
        if (depth === 0) {
          return max.cell;
        } else {
          return max.cost;
        }
      } else {
        const min = _.minBy(values, (v) => {
          return v.cost;
        });
        if (depth === 0) {
          return min.cell;
        } else {
          return min.cost;
        }
      }

    } else if (winner === null) {
      return 0;
    } else if (winner === PLAYER_TOKEN) {
      return depth - 10;
    } else if (winner === PLAYER_TWO_TOKEN) {
      return 10 - depth;
    }
  }

  function moveAI() {
    return miniMax(grid, 0, PLAYER_TWO_TOKEN);
  }

  var alreadyClicked = false;
  var winner = "";
  $('.pick').click(function() {
    const i = $(this).data('i');
    const j = $(this).data('j');

    // player can only place token to an empty square while the game is not yet won
    winner = isGameOver(grid)
    if (!winner && grid[i][j] === ' ' && !alreadyClicked) {

      // in case its a two player mode, put the right token
      if (gameMode === "twoP") {
        if (turn === 'Player One') {
          $(this).html(PLAYER_TOKEN);
          grid[i][j] = PLAYER_TOKEN;
        } else {
          $(this).html(PLAYER_TWO_TOKEN);
          grid[i][j] = PLAYER_TWO_TOKEN;
        }
      } else {
        // it's a vs computer mode, always first player clicks
        alreadyClicked = true;
        $(this).html(PLAYER_TOKEN);
        grid[i][j] = PLAYER_TOKEN;
        turn = 'Computer';
      }

      // after putting token, need to check the result
      checkStepResult();
    }
  });

  function checkStepResult() {
    winner = isGameOver(grid)
    if (winner || winner === null) {
      listResult(winner);
      return;
    } else {
      // it's not a win or tie, so display who's turn it is and progress
      displayTurn();
      if (gameMode === "oneP") {
        // computer AI delayed step
        setTimeout(function(){
          const move = moveAI()
          grid[move.i][move.j] = PLAYER_TWO_TOKEN;
          $('.pick[data-i=' + move.i + '][data-j=' + move.j + ']').html(PLAYER_TWO_TOKEN);
          turn = 'Player One';
          alreadyClicked = false;

          // include winning check here because of the delayed display
          winner = isGameOver(grid);
          if (winner || winner === null) {
             listResult(winner);
          } else {
            displayTurn();
          }
        }, 800);
      } else {
        // next player comes, so change the turn
        turn = (turn === 'Player One') ? 'Player Two' : 'Player One';
        displayTurn();
      }
    }
  }

  function listResult(winner) {
    $('#msg').fadeOut(300);
    setTimeout(function(){
      if (winner === PLAYER_TOKEN) {
        $("#msg").html("Player One won!").fadeIn(300);
        playerOneResult++;
      } else if (winner === PLAYER_TWO_TOKEN) {
        if (gameMode === "oneP") {
          $("#msg").html("Computer won!").fadeIn(300);
          computerResult++;
        } else {
          $("#msg").html("Player Two won!").fadeIn(300);
          playerTwoResult++;
        }
      } else {
        $("#msg").html("It's a tie!").fadeIn(300);
      }
    }, 300)
  }

});
