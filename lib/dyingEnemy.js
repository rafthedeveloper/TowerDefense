(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var DyingEnemy = towerDefense.DyingEnemy = function (options) {
    this.x = options.x;
    this.y = options.y;
    this.direction = options.direction;
    this.dyingEnemies = options.dyingEnemies;

    this.sprite = new Image();
    this.sprite.src = "assets/images/worm_splat.png";

    this.ticker = 0;
    this.frameController = 0;

  }

  DyingEnemy.prototype.draw = function (ctx) {
    if (this.direction === "N") {
      ctx.drawImage(this.sprite, this.ticker + 256, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "S") {
      ctx.drawImage(this.sprite, this.ticker + 128, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "W") {
      ctx.drawImage(this.sprite, this.ticker + 128, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "E") {
      ctx.drawImage(this.sprite, this.ticker, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    }

    if (this.frameController === 0) {
      this.ticker = this.ticker + 32;
      this.frameController = 4;
    }

    if (this.ticker === 128) {
      this.dyingEnemies.shift()
    }

    this.frameController -= 1;
  }


})()
