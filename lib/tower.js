(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var towerAssetKey = {
    "bunker": "assets/images/bunker.png",
    "lazer": "assets/images/lazerTower.png"
  }

  var Tower = towerDefense.Tower = function (options) {
    this.towerType = options.towerType;
    this.attackSpeed = 500;
    this.damage = 10;
    this.cost;
    this.range = 100;
    this.criticalChance;
    this.modeifiers = [];

    this.sprite = new Image();
    this.sprite.src = towerAssetKey[this.towerType];

    this.x = options.x;
    this.y = options.y;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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

          if (this.towerType === "bunker") {
            var sprayX = getRandomArbitrary(-8, 8);
            var sprayY = getRandomArbitrary(-8, 8);

            towerDefense.projectiles.push([this, {
              x: enemy.x + sprayX,
              y: enemy.y + sprayY
            }, this.towerType, 3]);
          } else if (this.towerType === "lazer") {
            var lazer = new towerDefense.Lazer({
              tower: this,
              enemy: enemy
            })

            towerDefense.projectiles.push(lazer);
          }

          setTimeout(function() { lazer.remove = true }, this.attackSpeed);
          enemy.health -= 10;
          shot = true;
        }

        i++
      }


      this.attack();
    }.bind(this), this.attackSpeed)
  }

  Tower.prototype.draw = function (ctx) {
    ctx.drawImage(this.sprite, this.x - 15, this.y - 15, 30, 30)
  };


})()
