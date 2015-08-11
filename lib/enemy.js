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

    ctx.fillStyle = "#f00";

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 10, 0, 2 * Math.PI, true
    );

    ctx.fill();
  };

  Enemy.prototype.moveToWayPoint = function () {
    if (this.x < this.wayPoints[this.nextWayPoint].x) {
      this.x += 1
    } else if (this.x > this.wayPoints[this.nextWayPoint].x) {
      this.x -= 1
    } else if (this.y < this.wayPoints[this.nextWayPoint].y) {
      this.y += 1
    } else if (this.y > this.wayPoints[this.nextWayPoint].y) {
      this.y -= 1
    } else {
      if (this.nextWayPoint === this.wayPoints.length - 1) {
        this.succeeded = true;
      } else {
        this.nextWayPoint += 1;
      }
    }
  };

})()
