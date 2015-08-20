(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Enemy = towerDefense.Enemy = function (options) {
    this.wayPoints = options.wayPoints;
    this.x = this.wayPoints[0].x
    this.y = this.wayPoints[0].y
    this.direction = this.wayPoints[0].direction

    this.nextWayPoint = 1;
    this.totalHealth = options.health;
    this.health = options.health;
    this.succeeded = false;

    this.sprite = new Image();
    this.sprite.src = "assets/images/worm_all.png";

    this.ticker = 0;
    this.frameController = 0;
    this.worth = options.worth;
  }


  Enemy.prototype.draw = function (ctx) {
    if (this.health < this.totalHealth){
      ctx.clearRect(this.x - 10, this.y - 15, 20, 3);
      ctx.fillStyle = "#f00";
      ctx.fillRect(this.x - 10, this.y - 15, 20, 3)

      ctx.clearRect(this.x - 10, this.y - 15, (20 * (this.health / this.totalHealth)), 3);
      ctx.fillStyle = "#00FF00";
      ctx.fillRect(this.x - 10, this.y - 15, (20 * (this.health / this.totalHealth)), 3);
    }

    if (this.direction === "N") {
      ctx.drawImage(this.sprite, this.ticker + 256, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "S") {
      ctx.drawImage(this.sprite, this.ticker + 128, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "W") {
      //no west
      ctx.drawImage(this.sprite, this.ticker + 128, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    } else if (this.direction === "E") {
      ctx.drawImage(this.sprite, this.ticker, 0, 32, 32,
                    this.x - 15, this.y - 15, 30, 30);
    }

    if (this.frameController === 0) {
      this.ticker = (this.ticker + 32) % 128;
      this.frameController = 3;
    }

    this.frameController -= 1;
  };

  Enemy.prototype.moveToWayPoint = function () {
    if (this.x < this.wayPoints[this.nextWayPoint].x) {
      this.x += 1;
      this.direction = "E";
    } else if (this.x > this.wayPoints[this.nextWayPoint].x) {
      this.x -= 1;
      this.direction = "W";
    } else if (this.y < this.wayPoints[this.nextWayPoint].y) {
      this.y += 1;
      this.direction = "S";
    } else if (this.y > this.wayPoints[this.nextWayPoint].y) {
      this.y -= 1;
      this.direction = "N";
    } else {
      if (this.nextWayPoint === this.wayPoints.length - 1) {
        this.succeeded = true;
      } else {
        this.nextWayPoint += 1;
      }
    }
  };

})()
