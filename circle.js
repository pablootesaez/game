var numLines = 6;
var numColumns = 7;
var verticalSpace = 100;
var horizontalSpace = 167;

//Constructor de círculos.
function Circle() {
  this.x = 0;
  this.y = 0;
  this.radius = (canvas.height - verticalSpace)/(6*2);
  this.color = 'white';
  this.border = "black";
  this.status = "empty";
}

// Pintamos cada círculo.
Circle.prototype.draw = function() {
  ctx.strokeRect(0, 0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.border;
  ctx.fill();
  ctx.stroke();
};

//Posicionamos cada agujero.
Circle.prototype.positioner = function(i, j) {
    this.x = this.radius + this.radius * 2 * i + (horizontalSpace / (numColumns + 1)) * (i + 1);
    this.y = this.radius + this.radius * 2 * (numLines - j - 1) + (verticalSpace / (numLines + 1)) * (numLines - j);
};
