(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Wave = towerDefense.Wave = function (options) {
    this.enemies = [];
    this.enemiesGenerated = 0;

    this.numEnemies = 20;
    this.frameCount = 60;
    this.enemiesGenerated = 0;

    this.currentWave = 0;

    this.wayPoints = options.wayPoints;

    this.addingAnEnemy = false;
    this.nextWave();
  }

  Wave.prototype.generateEnemy = function(){
    if (this.enemiesGenerated < this.numEnemies) {
      this.enemiesGenerated += 1;


      this.enemies.push(new towerDefense.Enemy({
        wayPoints: this.wayPoints,
        health: this.currentWave * 100
      }))
      
    } else {
      this.nextWave;
      this.enemiesGenerated = 0;
    }
  }

  Wave.prototype.nextWave = function(){
    this.currentWave += 1;
    document.getElementById('waves').innerHTML = this.currentWave;
  }

  Wave.prototype.draw = function(ctx){
    this.enemies.forEach(function (enemy) {
      enemy.draw(ctx);
    })
  }


})();
