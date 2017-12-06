var grid = [];
var player1 = [];
var player2 = [];
var turn = 1;
var gameStatus = 0;

var winCombi = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

var playGrid = function() {
  // console.log("turn" + turn);
  var gridClick = parseInt(this.getAttribute("id")[4]);
  if (playTurn(gridClick) && !isGameOver()) {
    showTurn();
    if (turn === 1) {
      this.textContent = "X";
      this.setAttribute("class", "col blue");
      player1.push(gridClick);
      turn++;
    } else {
      this.textContent = "O";
      this.setAttribute("class", "col red");
      player2.push(gridClick);
      turn--;
    }
  }
  whoWon();
  // console.log(player1);
  // console.log(player2);
  // console.log(whoWon());
};

// check if move is valid
var playTurn = function(index) {
  var boolean = true;
  for (var i = 0; i < player1.length; i++) {
    if (index === player1[i]) {
      // alert("Square is already taken. Choose again.");
      return boolean = false;
    }
  }
  for (var j = 0; j < player2.length; j++) {
    if (index === player2[j]) {
      // alert("Square is already taken. Choose again.");
      return boolean = false;
    }
  }
  // comment this out for game to work
  if (boolean === true) {
    if (turn === 1) {
      player1.push(index);
      turn++;
    } else {
      player2.push(index);
      turn--;
    }
  }
  return boolean;
};

var isGameOver = function() {
  if (gameStatus === 0) {
    return false;
  } else {
    return true;
  }
};

// check for draw
var whoWon = function() {
  var score = 0;
  // check player 1 for winning combination
  for (var combiIndex = 0; combiIndex < winCombi.length; combiIndex++) {
    for (var i = 0; i < player1.length; i++) {
      for (var combi = 0; combi < winCombi[combiIndex].length; combi++) {
        if (player1[i] === winCombi[combiIndex][combi]) {
          score++;
        }
      }
    }

    if (score === 3) {
      gameStatus = 1;
    } else {
      score = 0;
    }
  }

  // check player 2 for winning combination
  for (var combiIndex = 0; combiIndex < winCombi.length; combiIndex++) {
    for (var i = 0; i < player2.length; i++) {
      for (var combi = 0; combi < winCombi[combiIndex].length; combi++) {
        if (player2[i] === winCombi[combiIndex][combi]) {
          score++;
        }
      }
    }

    if (score === 3) {
      gameStatus = 2;
    } else {
      score = 0;
    }
  }

  if (player1.length + player2.length === 9 && gameStatus === 0) {
    gameStatus = 3;
  }
  // switch (gameStatus) {
  //   case 1:
  //     console.log("Player 1 won.");
  //     break;
  //   case 2:
  //     console.log("Player 2 won.");
  //     break;
  //   case 3:
  //     console.log("Draw.")
  //     break;
  // }
  return gameStatus;
};

// restart game
var restart = function() {
  isGameOver();
  player1 = [];
  player2 = [];
  turn = 1;
  gameStatus = 0;

  for (var id = 0; id < 9; id++) {
    grid[id].textContent = "";
  }
  document.querySelector(".player1-text").style.border = "2px solid blue";
  document.querySelector(".player2-text").style.border = "none";
};

// function to indicate whose turn through use of border
var showTurn = function() {
  if (turn === 1) {
    document.querySelector(".player2-text").style.border = "2px solid red";
    document.querySelector(".player1-text").style.border = "none";
  } else {
    document.querySelector(".player1-text").style.border = "2px solid blue";
    document.querySelector(".player2-text").style.border = "none";
  }
  switch (gameStatus) {
    case 1:
      document.querySelector(".player1-text").style.border = "2px solid blue";
      document.querySelector(".player2-text").style.border = "none";
      break;
    case 2:
      document.querySelector(".player1-text").style.border = "none";
      document.querySelector(".player2-text").style.border = "2px solid red";
      break;
    case 3:
      document.querySelector(".player1-text").style.border = "none";
      document.querySelector(".player2-text").style.border = "none";
      break;
  }
}

// event listener for grid
for (var id = 0; id < 9; id++) {
  grid[id] = document.querySelector("#grid" + id);
  grid[id].addEventListener("click", playGrid);
}

// event listener for clear button
var button = document.getElementsByTagName("button")[0];
button.addEventListener("click", restart);
