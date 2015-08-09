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

    var i = 0
    while (i < towerDefense.projectiles.length) {
      var projectile = towerDefense.projectiles[i];

      if (projectile[2] === "lazer") {
        ctx.beginPath();
        ctx.moveTo(projectile[0].x, projectile[0].y);
        ctx.lineTo(projectile[1].x, projectile[1].y);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        i++
      }

      if (projectile[2] === "bullet") {

        if (projectile[3] === 0) {
          towerDefense.projectiles.splice(i, 1)
        } else {
          ctx.beginPath();
          ctx.moveTo(projectile[0].x, projectile[0].y);
          ctx.lineTo(projectile[1].x, projectile[1].y);
          ctx.strokeStyle = "white";
          ctx.stroke();

          projectile[3]--
          i++
        }
      }
    }


    this.enemies.forEach(function (enemy) {
      enemy.draw(ctx);
    })
  };


})()
