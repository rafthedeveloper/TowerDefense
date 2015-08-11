(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Map = towerDefense.Map = function (options) {
    this.tiles = [];
    this.WIDTH = 20;
    this.HEIGHT = 20;

    this.wayPoints = [];

    this.generateTiles();
    this.generatePath();

    this.bindMouse();
    this.lastHovered = null;

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

  Map.prototype.bindMouse = function () {
    var canvas = document.getElementById("canvas");

    canvas.addEventListener("mousemove", function (event) {
      var i = Math.floor(event.layerX / 30) + (Math.floor(event.layerY / 30) * 20);
      if (this.lastHovered === null) {
        this.lastHovered = i;
        this.tiles[this.lastHovered].hovered = true;
      }

      if (i != this.lastHovered) {
        this.tiles[this.lastHovered].hovered = false;
        this.lastHovered = i;
        this.tiles[this.lastHovered].hovered = true;
      }
    }.bind(this))

    canvas.addEventListener("click", function (event) {
      var i = Math.floor(event.layerX / 30) + (Math.floor(event.layerY / 30) * 20);

      if (event.shiftKey) {
        this.tiles[i].addTower({towerType: "bunker"});
      } else {
        this.tiles[i].addTower({towerType: "lazer"});
      }
    }.bind(this))

  };

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

  var path1 =
    [ "E",
     200, 201, 202, 203, 204,
     184, 164, 144, 124, 104,
     105, 106, 107, 108, 109,
     129, 149, 169, 189, 209,
     229, 249, 269, 289, 309,
     310, 311, 312, 313, 314,
     294, 274, 254, 234, 214,
     215, 216, 217, 218, 219]

  Map.prototype.generatePath = function () {
    for (var i = 0; i < path1.length; i++) {

      if (i !== 0) {
        var tile = this.tiles[path1[i]]
        tile.giveType(0);
      }

      if (i === 1) {
        this.wayPoints.push({
          direction: path1[0],
          x: tile.x + 15,
          y: tile.y + 15
        });
      } else if (i !== 0){
        switch(path1[i] - path1[i - 1]) {
          case -1:
            this.wayPoints.push({
              direction: "W",
              x: tile.x + 15,
              y: tile.y + 15
            });
            break;
          case 1:
            this.wayPoints.push({
              direction: "E",
              x: tile.x + 15,
              y: tile.y + 15
            });
            break;
          case -20:
            this.wayPoints.push({
              direction: "N",
              x: tile.x + 15,
              y: tile.y + 15
            });
            break;
          case 20:
            this.wayPoints.push({
              direction: "S",
              x: tile.x + 15,
              y: tile.y + 15
            });
            break;
        }
      }
    }

  };

  Map.prototype.draw = function (ctx) {
    this.tiles.forEach(function (tile) {
      tile.draw(ctx);
    })

  };


})()
