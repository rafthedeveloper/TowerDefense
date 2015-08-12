(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var towerAssetKey = {
    "bunker": "assets/images/bunker.png",
    "lazer": "assets/images/lazerTower.png"
  }

  var towerAttackSpeedKey = {
    "bunker": 250,
    "lazer": 500
  }

  var towerDamageSpeedKey = {
    "bunker": 3,
    "lazer": 10
  }

  var towerCritKey = {
    "bunker": 5,
    "lazer": 0
  }

  var Tower = towerDefense.Tower = function (options) {
    this.towerType = options.towerType;
    this.attackSpeed = towerAttackSpeedKey[this.towerType];
    this.damage = towerDamageSpeedKey[this.towerType];
    this.criticalChance = towerCritKey[this.towerType];

    this.cost;
    this.range = 100;
    this.modeifiers = [];
    this.criticaled = 0;

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

            var bullet = new towerDefense.Bullet({
              tower: this,
              targetX: enemy.x + sprayX,
              targetY: enemy.y + sprayY,
            })

            towerDefense.projectiles.push(bullet);

          } else if (this.towerType === "lazer") {

            var lazer = new towerDefense.Lazer({
              tower: this,
              enemy: enemy
            })

            towerDefense.projectiles.push(lazer);
            setTimeout(function() { lazer.remove = true }, this.attackSpeed);
          }
          var roll = Math.floor(Math.random() * 100)

          if (roll < this.criticalChance) {
            enemy.health -= this.damage * Math.floor(Math.random() * 10);
            this.criticaled = 10;
          } else {
            enemy.health -= this.damage;
          }

          shot = true;
        }

        i++
      }


      this.attack();
    }.bind(this), this.attackSpeed)
  }

  Tower.prototype.draw = function (ctx) {
    if (this.criticaled) {
      ctx.font = "12px Arial";
      ctx.fillStyle = "red";
      ctx.fillText("CRIT!", this.x - 15, this.y - 20);
      this.criticaled -= 1;
    }
    ctx.drawImage(this.sprite, this.x - 15, this.y - 15, 30, 30)
  };


})()
