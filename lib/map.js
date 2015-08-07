(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Map = towerDefense.Map = function (options) {
    this.tiles = [];
    this.WIDTH = 20;
    this.HEIGHT = 20;

    this.generateTiles();
    this.generatePath();
  }

  var tileKey = {
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    5: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
    10: 1
  }

  Map.prototype.generateTiles = function () {
    for (var i = 0; i < this.WIDTH * this.HEIGHT; i++) {

      var tile = new towerDefense.Tile({
        x: (i * 30) % 600,
        y: Math.floor(i / 20) * 30,
        tileType: tileKey[Math.ceil(Math.random() * 10)]
      })

      this.tiles.push(tile);
    }
  };

  Map.prototype.generatePath = function () {
    for (var i = 10; i < this.WIDTH * this.HEIGHT; i = i + 20) {
      this.tiles[i].giveType(0);
    }
  };

  Map.prototype.draw = function (ctx) {
    this.tiles.forEach(function (tile) {
      tile.draw(ctx);
    })
  };


})()
