(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Game = towerDefense.Game = function () {
    this.lives = 20;
    this.resources = 0;

    this.map = new towerDefense.Map();

    this.enemies = [];

    this.addingAnEnemy = false;
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 600;

  Game.prototype.step = function () {
    var that = this;

    if (!this.addingAnEnemy) {
      this.addingAnEnemy = true;

      setTimeout(function () {
        that.enemies.push(new towerDefense.Enemy({
          wayPoints: that.map.wayPoints
        }))

        that.addingAnEnemy = false;
      }, 2000)
    }

    var i = 0;
    while (i < this.enemies.length) {
      var enemy = this.enemies[i];

      if (enemy.succeeded) {
        this.enemies.splice(i, 1)
      } else if (enemy.health <= 0) {
        this.enemies.splice(i, 1)
      } else {
        enemy.moveToWayPoint();
        i += 1
      }
    }
  };


  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "#7c3409";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y)

    this.map.draw(ctx);

    this.enemies.forEach(function (enemy) {
      enemy.draw(ctx);
    })
  };


})()
