(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tile = towerDefense.Tile = function (options) {
    this.tileType = options.tileType;

    this.x = options.x;
    this.y = options.y;

    this.sprite  = new Image();


    this.giveType(options.tileType);

    this.tower = null;
    this.hovered = false;

    this.typeKey = {
      0: "Path",
      1: "Barren",
      2: "Buildable"
    };
  }

  var tileKey = {
    0: "assets/images/stone.png",
    1: "assets/images/barren.png",
    2: "assets/images/grass.png"
  }

  Tile.prototype.giveType = function (tileType) {
    this.tileType = tileType;
    this.sprite.src = tileKey[tileType];
  };

  Tile.prototype.addTower = function (tower) {

  };

  Tile.prototype.removeTower = function () {

  };

  Tile.prototype.isEmpty = function () {
    !!this.structure;
  };

  Tile.prototype.draw = function (ctx) {
    if (!this.hovered || this.tileType === 0) {
      ctx.drawImage(this.sprite, this.x, this.y, 30, 30);
    } else {
      ctx.save();
      ctx.translate(0, -5);

      ctx.fillStyle = "rgba(0, 0, 0, .3)";
      ctx.fillRect(this.x + 2, this.y + 5, 26, 28);


      ctx.drawImage(this.sprite, this.x, this.y, 30, 30);
      ctx.restore();
    }
  };

})()
