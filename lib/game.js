(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Game = towerDefense.Game = function () {
    this.lives = 20;
    this.resources = 300;

    this.map = new towerDefense.Map();
    this.wave = new towerDefense.Wave({ wayPoints: this.map.wayPoints });

    this.enemies = this.wave.enemies;
    this.frameCount = 60;
    this.gameIsOver = false;
  };

  Game.prototype.restartGame = function () {
    this.lives = 20;
    this.resources = 300;

    this.map = new towerDefense.Map();
    this.wave = new towerDefense.Wave({ wayPoints: this.map.wayPoints });

    this.enemies = this.wave.enemies;
    this.frameCount = 60;
    this.gameIsOver = false;
    document.getElementById('lives').innerHTML = this.lives;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;

  Game.prototype.gameOver = function() {
    this.gameIsOver = true;
    document.getElementById("game-over").style.display = 'block';

    document.getElementById("restart-game").addEventListener("click", function(){
      document.getElementById("game-over").style.display = 'none';
      this.restartGame();
    }.bind(this));

  };


  Game.prototype.step = function () {
    document.getElementById('gold').innerHTML = this.resources;
    this.frameCount--;

    if (this.frameCount === 0) {
      this.wave.generateEnemy();
      this.frameCount = 60;
    }

    var i = 0;
    while (i < this.enemies.length) {
      var enemy = this.enemies[i];

      if (enemy.succeeded) {
        this.enemies.splice(i, 1);
        this.lives--;

        if (this.lives === 0) { this.gameOver(); }
        document.getElementById('lives').innerHTML = this.lives;
      } else if (enemy.health <= 0) {
        this.resources += this.enemies[i].worth;
        this.enemies.splice(i, 1);
      } else {
        enemy.moveToWayPoint();
        i += 1;
      }
    }
  };


  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.map.draw(ctx);

    var i = 0;
    while (i < towerDefense.projectiles.length) {
      var projectile = towerDefense.projectiles[i];

      if (projectile.tower.towerType === "lazer") {
        if (projectile.remove === true || projectile.enemy.health <= 0) {
          towerDefense.projectiles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.moveTo(projectile.tower.x, projectile.tower.y);
          ctx.lineTo(projectile.enemy.x, projectile.enemy.y);
          ctx.strokeStyle = "blue";
          ctx.stroke();
          i++;
        }
      }

      if (projectile.tower.towerType ===  "bunker") {

        if (projectile.timeOnScreen === 0) {
          towerDefense.projectiles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.moveTo(projectile.tower.x, projectile.tower.y);
          ctx.lineTo(projectile.targetX, projectile.targetY);
          ctx.strokeStyle = "white";
          ctx.stroke();

          projectile.timeOnScreen--;
          i++;
        }
      }
    }

    this.wave.draw(ctx);

  };


})()
