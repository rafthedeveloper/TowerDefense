(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tile = towerDefense.Tile = function (options) {
    this.tileType = options.tileType;

    this.x = options.x;
    this.y = options.y;

    this.sprite = new Image();
    this.giveType(options.tileType);
    this.tower = null;
    this.hovered = false;

    this.findSpriteX();

    this.typeKey = {
      0: "Path",
      1: "Barren",
      2: "Buildable"
    };
  }

  var tileKey = {
    0: "assets/images/path_sheet.png",
    1: "assets/images/tile_sheet.png",
    2: "assets/images/tile_sheet.png"
  }

  Tile.prototype.findSpriteX = function () {
    if (this.tileType === 1 || this.tileType === 0) {
      var rand = Math.floor(Math.random() * 7);
      if (rand === 0) {
        this.sx = 0;
      } else if (rand === 1) {
        this.sx = 32;
      } else if (rand === 2) {
        this.sx = 64;
      } else if (rand === 3) {
        this.sx = 96;
      } else if (rand === 4) {
        this.sx = 128;
      } else if (rand === 5) {
        this.sx = 192;
      } else if (rand === 6) {
        this.sx = 320;
      } else {
        this.sx = 384;
      }
    } else if (this.tileType === 2) {
      this.sx = 256;
    }
  }

  Tile.prototype.giveType = function (tileType) {
    this.tileType = tileType;
    this.sprite.src = tileKey[tileType];

    if (this.tileType === 0) {
      this.bgSprite = new Image();
      this.bgSprite.src = "assets/images/tile_sheet.png";
    }

  };

  Tile.prototype.addTower = function (options) {
    if (this.tileType === 2 && !this.tower) {
      this.tower = new towerDefense.Tower({
        x: this.x + 15,
        y: this.y + 15,
        towerType: options.towerType
      });

      this.tower.attack();
    }
  };

  Tile.prototype.removeTower = function () {

  };

  Tile.prototype.isEmpty = function () {
    !!this.structure;
  };

  var directionKey = {
    "N": 32,
    "S": 32,
    "W": 0,
    "E": 0,
    "WN": 160,
    "EN": 128,
    "WS": 64,
    "ES": 96
  }

  Tile.prototype.findTileImage = function () {
    if (this.nextTile) {
      if (this.direction === "N") {
        if (this.nextTile.direction === "W") {
          return directionKey["WS"];
        } else if (this.nextTile.direction === "E") {
          return directionKey["ES"];
        }
      }

      if (this.direction === "S") {
        if (this.nextTile.direction === "W") {
          return directionKey["WN"];
        } else if (this.nextTile.direction === "E") {
          return directionKey["EN"];
        }
      }

      if (this.direction === "E") {
        if (this.nextTile.direction === "N") {
          return directionKey["WN"];
        } else if (this.nextTile.direction === "S") {
          return directionKey["WS"];
        }
      }

      if (this.direction === "W") {
        if (this.nextTile.direction === "S") {
          return directionKey["ES"];
        } else if (this.nextTile.direction === "N") {
          return directionKey["EN"];
        }
      }

      return directionKey[this.direction];
    } else {
      return directionKey[this.direction];
    }
  }

  Tile.prototype.draw = function (ctx) {
    if (this.tileType === 0) {
      ctx.drawImage(this.bgSprite, this.sx,
                    0, 32, 32, this.x, this.y, 30, 30);

      ctx.drawImage(this.sprite, this.findTileImage(),
                    0, 32, 32, this.x, this.y, 30, 30);
    } else {
      ctx.drawImage(this.sprite, this.sx,
                    0, 32, 32, this.x, this.y, 30, 30);
    }

    if (this.hovered && this.tileType === 2) {
      ctx.strokeStyle = "rgba(124, 252, 0, 1)";
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, 29, 29);

    } else if (this.hovered && this.tileType !== 2){
      ctx.strokeStyle = "rgba(255, 0, 0, 1)";
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x, this.y, 29, 29);
    }

    if (this.tower) {
      this.tower.draw(ctx);
    }
  }
})()
