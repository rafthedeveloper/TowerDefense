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
        x: (i * 30) % 600,
        y: Math.floor(i / 20) * 30,
        tileType: Math.ceil(Math.random() * 2)
      })

      this.tiles.push(tile);
    }
  };

  Map.prototype.draw = function (ctx) {
    this.tiles.forEach(function (tile) {
      tile.draw(ctx);
    })
  };


})()
