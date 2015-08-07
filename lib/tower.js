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
          shot = true;

          console.log(enemy.health)
        }

        i++
      }


      this.attack();
    }.bind(this), this.attackSpeed)
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
