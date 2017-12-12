function Picture(x, y, url, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.sprite = new Image();
  this.sprite.src = url;
  this.sprite.onload = (function(){
    console.log("Image ready!");
    this.sprite.isReady = true;
  }).bind(this);
}

Picture.prototype.isReady = function() {
  return this.sprite.isReady;
};

Picture.prototype.draw = function() {
  ctx.strokeRect(0,0,canvas.width,canvas.height);
  if (this.isReady()) {
      ctx.save();
      ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.width,
        this.height
      );
      ctx.restore();
    }
  };
