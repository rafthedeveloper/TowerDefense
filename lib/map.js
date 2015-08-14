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
    this.bindBuyTower();

    this.lastHovered = null;
    this.lastSelected = null;
  }

  var tileKey = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 2,
    10: 2
  }

  Map.prototype.bindBuyTower = function () {
    var towerOptions = document.getElementById("tower-options");
    that = this;

    document.getElementById("buy-lazer-tower")
            .addEventListener("click", function () {
      that.lastSelected.addTower({ towerType: "lazer" });
      document.getElementById("tower-options").className = "";
    })

    document.getElementById("buy-bunker")
            .addEventListener("click", function () {
      that.lastSelected.addTower({ towerType: "bunker" });
      document.getElementById("tower-options").className = "";
    })
  }

  Map.prototype.bindMouse = function () {
    canvas.addEventListener("mousemove", function (event) {
      var i = Math.floor(event.layerX / 30) + (Math.floor(event.layerY / 30) * 20);

      if (this.lastHovered && this.lastHovered !== this.tiles[i]) {
        this.lastHovered.hovered = false;
      }

      this.tiles[i].hovered = true;
      this.lastHovered = this.tiles[i];
    }.bind(this))

    canvas.addEventListener("mouseout", function (event) {
      if (this.lastHovered){
        this.lastHovered.hovered = false;
      }
    }.bind(this))


    canvas.addEventListener("click", function (event) {
      var i = Math.floor(event.layerX / 30) + (Math.floor(event.layerY / 30) * 20);

      if (this.lastSelected) {
        this.lastSelected.selected = false;
      }

      var towerOptions = document.getElementById("tower-options");
      if (!this.tiles[i].tower && this.tiles[i].tileType === 2) {
        towerOptions.className = "active";
        this.lastSelected = this.tiles[i];
        this.tiles[i].selected = true;
      } else {
        towerOptions.className = "";
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

        tile.direction = path1[0]
      } else if (i !== 0){
        switch(path1[i] - path1[i - 1]) {
          case -1:
            this.wayPoints.push({
              direction: "W",
              x: tile.x + 15,
              y: tile.y + 15
            });

            tile.direction = "W";
            break;
          case 1:
            this.wayPoints.push({
              direction: "E",
              x: tile.x + 15,
              y: tile.y + 15
            });

            tile.direction = "E";
            break;
          case -20:
            this.wayPoints.push({
              direction: "N",
              x: tile.x + 15,
              y: tile.y + 15
            });

            tile.direction = "N";
            break;
          case 20:
            this.wayPoints.push({
              direction: "S",
              x: tile.x + 15,
              y: tile.y + 15
            });

            tile.direction = "S";
            break;
        }
        if (this.lastTile) {
          this.lastTile.nextTile = tile;
        }
        this.lastTile = tile;
      }
    }

  };

  Map.prototype.draw = function (ctx) {
    this.tiles.forEach(function (tile) {
      tile.draw(ctx);
    })

  };


})()
