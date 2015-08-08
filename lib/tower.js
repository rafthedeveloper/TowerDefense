(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tower = towerDefense.Tower = function (options) {
    this.towerType;
    this.attackSpeed = 1000;
    this.damage = 10;
    this.cost;
    this.range = 100;
    this.criticalChance;
    this.modeifiers = [];

    this.arrows = [];
    this.x = options.x;
    this.y = options.y;

    // this.isAttacking = false;
  }

  Tower.prototype.attack = function () {
    setTimeout(function() {
      var enemies = window.towerDefense.game.enemies;
      var shot = false;
      var i = 0;

      while (i < enemies.length && shot === false) {
        var enemy = enemies[i];

        if (enemy.x < this.x + this.range && enemy.x > this.x - this.range &&
            enemy.y < this.y + this.range && enemy.y > this.y - this.range) {

          enemy.health -= this.damage;
          this.fireArrowAt(enemy);
          shot = true;
        }

        i++
      }


      this.attack();
    }.bind(this), this.attackSpeed)
  }

  function calculateTarget(pX, pY, nX, nY) {
    var xAlpha = nX - pX;
    var yAlpha = nY - pY;

    // nX ^ 2 + xAlpha ^ 2 + (2 * nX * xAlpha + 2 * nY * yAlpha) * t + xAlpha ^ 2 + yAlpha ^ 2 - 2 ^ 2) * t ^ 2

    var c = Math.pow(nX, 2) + Math.pow(xAlpha, 2);
    var b = 2 * nX * xAlpha + 2 * nY * yAlpha;
    var a = Math.pow(xAlpha, 2) + Math.pow(yAlpha, 2) - Math.pow(2, 2);

    // quadratic formula
    var opt1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / 2 * a;
    var opt2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / 2 * a;

    debugger
  }

  Tower.prototype.fireArrowAt = function (enemy) {
    previousX = enemy.x;
    previousY = enemy.y;


    setTimeout(function () {
      calculateTarget(previousX, previousY, enemy.x, enemy.y)

      // this.arrows.push({
      //   targetX: ,
      //   targetY: ,
      //   x: this.tower.x,
      //   y: this.tower.y,
      // })
    }, 100)
  }

  Tower.prototype.draw = function (ctx) {
    ctx.fillStyle = "yellow";

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 10, 0, 2 * Math.PI, true
    );

    ctx.fill();
  };


})()
