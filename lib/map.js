(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Map = towerDefense.Map = function (options) {
    this.tiles = [];
    this.WIDTH = 20;
    this.HEIGHT = 20;


    this.generateTiles();
  }

  Map.prototype.generateTiles = function () {
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {

      var tile = new towerDefense.Tile({
        tileType: Math.ceil(Math.random() * 2)
      })

      this.tiles.push(tile);
    }
  };


})()
