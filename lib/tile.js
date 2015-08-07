(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tile = towerDefense.Tile = function (options) {
    this.tileType = options.tileType;
    this.x = options.x;
    this.y = options.y;
    this.sprite  = new Image();
    this.sprite.src = tileKey[this.tileType];

    this.tower = null;
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

  Tile.prototype.makePath = function () {

  };

  Tile.prototype.addTowers = function (tower) {

  };

  Tile.prototype.removeTowers = function () {

  };

  Tile.prototype.isEmpty = function () {
    !!this.structure;
  };

  Tile.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, 30, 30);
  };

})()
