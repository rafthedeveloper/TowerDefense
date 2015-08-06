(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tile = towerDefense.Tile = function (options) {
    this.tileType = options.tileType;
    this.tower = null;
    this.typeKey = {
      0: "Path",
      1: "Barren",
      2: "Buildable"
    }
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

})()
