var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var domElementId = null;

function Game() {
  this.circleMatrix = [];
  this.background = new Rectangle();
  this.columnNumber = 0;
  this.lineNumber = 0;
  this.winner = null;
  this.circleCounter = 0;
  this.sumLines = null;
  this.winner = "";
  this.picture = new Picture("0", "0",
  "http://holiday-malta.com/media/images/active/images/Fireworks%20-%20Zebbug/Zebbug%20Fireworks%20Malta%20holiday-malta%203.jpg",
   "400", "300");
}

Game.prototype.resetGame = function() {
  //OJO
  this.winner = "";
  this.circleCounter = 0;
  this.start();
};

Game.prototype.celebration = function() {
  console.log(this.picture);
  this.picture.draw();
  var that = this;
  setTimeout(function(){that.resetGame()}, 3000);
};

Game.prototype.checkDiagonalsNWSE = function() {
  var j = 3;
  while(j < 6){
    var i = 0;
    while (i < 4){
      this.sumLines = 0;
      for (var k = 0; k < 4; k++){
        this.sumLines += this.circleMatrix[i + k][j - k].status;
      }
      if(this.sumLines === 4){
        this.winner = "Jugador Rojo";
        //debería hacer algo para detener el código.
        break;
      } else if(this.sumLines === 0){
        this.winner = "Jugador Azul";
        //debería hacer algo para detener el código.
        break;
      }else{
        i++;
      }
    }
    j++;
  }
};

Game.prototype.checkDiagonalsSWNE = function() {
  var j = 0;
  while(j < 3){
    var i = 0;
    while (i < 4){
      this.sumLines = 0;
      for (var k = 0; k < 4; k++){
        this.sumLines += this.circleMatrix[i + k][j + k].status;
      }
      if(this.sumLines === 4){
        this.winner = "Jugador Rojo";
        //debería hacer algo para detener el código.
        break;
      } else if(this.sumLines === 0){
        this.winner = "Jugador Azul";
        //debería hacer algo para detener el código.
        break;
      }else{
        i++;
      }
    }
    j++;
  }
};

Game.prototype.checkVerticals = function() {
  var j = 0;
  var i = 0;
  for (i = 0; i < 7; i++){
    j = 0;
    while (j < 3){
     this.sumLines = 0;
     for (var k = 0; k < 4; k++){
       this.sumLines += this.circleMatrix[i][j + k].status;
     }
     if(this.sumLines === 4){
       this.winner = "Jugador Rojo";
       //debería hacer algo para detener el código.
       break;
     } else if(this.sumLines === 0){
       this.winner = "Jugador Azul";
       //debería hacer algo para detener el código.
       break;
     }else{
       j++;
     }
    }
  }
};

Game.prototype.checkHorizontals = function() {
  var j = 0;
  var i = 0;
  for (j = 0; j < 6; j++){
    i = 0;
    while (i < 4){
      this.sumLines = 0;
      for (var k = 0; k < 4; k++){
        this.sumLines += this.circleMatrix[i + k][j].status;
      }
      if(this.sumLines === 4){
        this.winner = "Jugador Rojo";
        //debería hacer algo para detener el código.
        break;
      } else if(this.sumLines === 0){
        this.winner = "Jugador Azul";
      }else{
        i++;
      }
    }
   }
};

Game.prototype.checkGame = function() {
  this.checkHorizontals();
  this.checkVerticals();
  this.checkDiagonalsSWNE();
  this.checkDiagonalsNWSE();
  if(this.winner.length > 0){
    console.log(this.winner);
    this.celebration();
  }
     // this.circleCounter = 0;
     // generateNewGame();
};

Game.prototype.changeCircleStatus = function(domElementId) {
  this.columnNumber = domElementId;
  this.lineNumber = 0;
  while (this.circleMatrix[this.columnNumber][this.lineNumber].status !== "empty") {
    this.lineNumber++;
  }
  if(this.circleCounter % 2 === 0) {
    this.circleMatrix[this.columnNumber][this.lineNumber].status = 1;
    this.circleMatrix[this.columnNumber][this.lineNumber].color = "red";
  } else {
    this.circleMatrix[this.columnNumber][this.lineNumber].status = 0;
    this.circleMatrix[this.columnNumber][this.lineNumber].color = "blue";
  }
  //console.log(this.circleMatrix);
  //console.log(this.columnNumber);
  //console.log(this.lineNumber);
  this.circleCounter++;
  this.draw();
  this.checkGame();
};

Game.prototype.start = function() {
  this.background.draw();
  this.generateNewGame();
};

Game.prototype.draw = function() {
  this.clear();
  if(this.winner.length > 0){
    this.picture.draw();
  } else {
    this.background.draw();
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 6; j++) {
        this.circleMatrix [i] [j].draw();
      }
    }
  }
};

Game.prototype.clear = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

Game.prototype.generateNewGame = function() {
  for (var k = 0; k < 7; k++){
    this.circleMatrix[k] = new Array(6);
  }
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 6; j++) {
        this.circleMatrix[i][j] = new  Circle();
        this.circleMatrix[i][j].positioner(i, j);
        this.circleMatrix[i][j].circleReseter(i, j);
        this.circleMatrix[i][j].draw();
      }
    }
};

var newGame = new Game();
newGame.start();

$(".playButton").click(function(event) {
  var domElementId = event.target.id;
  newGame.changeCircleStatus(Number(domElementId));
});
