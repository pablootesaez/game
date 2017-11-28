var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var collSpaceRecBalls = 100;
var lineSpaceRecBalls = 200;
var numCollums = 7;
var numLines = 6;

//Dibujamos el tablero.

$(document).ready( function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.rect(50, 100, canvas.width - collSpaceRecBalls, canvas.height - lineSpaceRecBalls);
  ctx.closePath();
  ctx.fillStyle = "brown";
  ctx.fill();    
});

function Circle() {
  this.x = 0;
  this.y = 0;
  this.radius = (canvas.height-lineSpaceRecBalls-100)/(6*2);
  this.color = 'white';
}

Circle.prototype.draw = function() {
  ctx.strokeRect(0, 0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();    
};

Circle.prototype.positioner = function(i, j) {
    this.y = 100 + this.radius + this.radius * 2 * i + (100 / (numLines + 1)) * (i + 1);
    this.x = 50 + this.radius + this.radius * 2 * j + (167 / (numCollums + 1)) * (j + 1);
};

$(document).ready( function() {
var circles = [];
for (var k = 0; k < 6; k++){
  circles[k] = new Array(7);
}
  
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      circles [i] [j] = new  Circle();
      circles [i] [j].positioner(i, j);
      circles [i] [j].draw();
    }
  }
});
