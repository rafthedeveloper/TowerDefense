(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tile = towerDefense.Tile = function (options) {
    this.tileType = options.tileType;
    this.x = options.x;
    this.y = options.y;

    this.tower = null;
    this.typeKey = {
      0: "Path",
      1: "Barren",
      2: "Buildable"
    };
  }

  var colorKey = {
    0: "#000",
    1: "#f00",
    2: "#0a0"
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
    ctx.fillStyle = colorKey[this.tileType];
    ctx.fillRect(this.x, this.y, 30, 30);
  };

})()
