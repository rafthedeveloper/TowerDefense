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

    this.nextWave();
  };

  Wave.prototype.generateEnemy = function(){
    if (this.enemiesGenerated < this.numEnemies) {
      this.enemiesGenerated += 1;


      this.enemies.push(new towerDefense.Enemy({
        wayPoints: this.wayPoints,
        health: this.currentWave * 100,
        worth: this.currentWave - 1 * 1 + 5
      }));

    } else {
      this.nextWave();
      this.enemiesGenerated = 0;
    }
  };

  Wave.prototype.nextWave = function(){
    this.currentWave += 1;
    this.displayWave();
    document.getElementById('waves').innerHTML = this.currentWave;
  };

  Wave.prototype.displayWave = function(){
    document.getElementById("waves-modal").style.display = 'block';
    document.getElementById("wave-number").innerHTML = this.currentWave;
    setTimeout(function(){
      document.getElementById("waves-modal").style.display = 'none';
    }, 5000);
  };

  Wave.prototype.draw = function(ctx){
    this.enemies.forEach(function (enemy) {
      enemy.draw(ctx);
    });
  };




})();
