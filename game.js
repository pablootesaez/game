var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var domElementId = null;
var circleCounter = 0;

function Game() {
  this.circleMatrix = [];
  this.background = new Rectangle();
  this.columnNumber = 0;
  this.lineNumber = 0;
  this.hugeMatrix = [];
  this.winner = null;
}

Game.prototype.generateHugeMatrix = function(matrix){
  vectorNortSouth = [
    [matrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber+1], this.circleMatrix[this.columnNumber][this.lineNumber+2], this.circleMatrix[this.columnNumber][this.lineNumber+3]],
    [this.circleMatrix[this.columnNumber][this.lineNumber-1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber+1], this.circleMatrix[this.columnNumber][this.lineNumber+2]],
    [this.circleMatrix[this.columnNumber][this.lineNumber-2], this.circleMatrix[this.columnNumber][this.lineNumber-1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber+1]],
    [this.circleMatrix[this.columnNumber][this.lineNumber-3], this.circleMatrix[this.columnNumber][this.lineNumber-2], this.circleMatrix[this.columnNumber][this.lineNumber-1], this.circleMatrix[this.columnNumber][this.lineNumber]]
 ];

  vectorWestEast = [
    [this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber], this.circleMatrix[this.columnNumber+2][this.lineNumber], this.circleMatrix[this.columnNumber+3][this.lineNumber]],
    [this.circleMatrix[this.columnNumber-1][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber], this.circleMatrix[this.columnNumber+2][this.lineNumber]],
    [this.circleMatrix[this.columnNumber-2][this.lineNumber], this.circleMatrix[this.columnNumber-1][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber]],
    [this.circleMatrix[this.columnNumber-3][this.lineNumber], this.circleMatrix[this.columnNumber-2][this.lineNumber], this.circleMatrix[this.columnNumber-1][this.lineNumber], this.circleMatrix[this.columnNumber][this.lineNumber]]
 ];

  vectorNWSE = [
    [this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber-1], this.circleMatrix[this.columnNumber+2][this.lineNumber-2], this.circleMatrix[this.columnNumber+3][this.lineNumber-3]],
    [this.circleMatrix[this.columnNumber-1][this.lineNumber+1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber-1], this.circleMatrix[this.columnNumber+2][this.lineNumber-2]],
    [this.circleMatrix[this.columnNumber-2][this.lineNumber+2], this.circleMatrix[this.columnNumber-1][this.lineNumber+1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber-1]],
    [this.circleMatrix[this.columnNumber-3][this.lineNumber+3], this.circleMatrix[this.columnNumber-2][this.lineNumber+2], this.circleMatrix[this.columnNumber-1][this.lineNumber+1], this.circleMatrix[this.columnNumber][this.lineNumber]]
 ];

  vectorSWNE = [
    [this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber+1], this.circleMatrix[this.columnNumber+2][this.lineNumber+2], this.circleMatrix[this.columnNumber+3][this.lineNumber+3]],
    [this.circleMatrix[this.columnNumber-1][this.lineNumber-1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber+1], this.circleMatrix[this.columnNumber+2][this.lineNumber+2]],
    [this.circleMatrix[this.columnNumber-2][this.lineNumber-2], this.circleMatrix[this.columnNumber-1][this.lineNumber-1], this.circleMatrix[this.columnNumber][this.lineNumber], this.circleMatrix[this.columnNumber+1][this.lineNumber+1]],
    [this.circleMatrix[this.columnNumber-3][this.lineNumber-3], this.circleMatrix[this.columnNumber-2][this.lineNumber-2], this.circleMatrix[this.columnNumber-1][this.lineNumber-1], this.circleMatrix[i][this.lineNumber]]
 ];

 this.hugeMatrix.push(vectorNortSouth);
 this.hugeMatrix.push(vectorWestEast);
 this.hugeMatrix.push(vectorNWSE);
 this.hugeMatrix.push(vectorSWNE);

};

Game.prototype.checkGame = function(){
  this.generateHugeMatrix(this.circleMatrix);

  var sumLines;

   for ( var counter1 = 0; counter1 < 4; counter1++){
     for ( var counter2 = 0; counter2 < 4; counter2++)

     sumLines = 0;

       for ( var counter3 = 0; counter3 < 4; counter3++){
         sumLines += this.hugeMatrix() [counter1][counter2][counter3].status;
       }
       if (sumLines === 4){
         this.winner = 1;
         alert("PLAYER 1 WINS!");
         generateNewGame();
         break;
       } else if (sumLines === 0){
         this.winner = 0;
         alert("PLAYER 2 WINS!");
         generateNewGame();
         break;
      } else {
        winner = null;
      }
    }

};

Game.prototype.changeCircleStatus = function(domElementId){
  this.columnNumber = domElementId;
  this.lineNumber = 0;
  while (this.circleMatrix[this.columnNumber][this.lineNumber].status !== "empty"){
    this.lineNumber++;
  }
  if(circleCounter % 2){
    this.circleMatrix[this.columnNumber][this.lineNumber].status = 1;
    this.circleMatrix[this.columnNumber][this.lineNumber].color = "red";
  } else {
    this.circleMatrix[this.columnNumber][this.lineNumber].status = 0;
    this.circleMatrix[this.columnNumber][this.lineNumber].color = "blue";
  }
console.log(this.circleMatrix);
  circleCounter++;

  this.checkGame();
};

Game.prototype.start = function() {
  this.background.draw();
  this.generateNewGame();
  window.requestAnimationFrame(this.draw.bind(this));
};

Game.prototype.draw = function() {
  this.clear();
  this.background.draw();
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 6; j++) {
      this.circleMatrix [i] [j].draw();
    }
  }
  window.requestAnimationFrame(this.draw.bind(this));
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
        this.circleMatrix[i][j].draw("white");
      }
    }
};

var newGame = new Game();
newGame.start();

$(".playButton").click(function(event){
  var domElementId = event.target.id;
  newGame.changeCircleStatus(Number(domElementId));
});
