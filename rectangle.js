function Rectangle() {
  this.x = 0;
  this.y = 0;
  this.height = canvas.height;
  this.width = canvas.width;
  this.color = "yellow"; 
}

Rectangle.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
};
