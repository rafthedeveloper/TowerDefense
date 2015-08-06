(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Game = window.towerDefense.Game = function () {
    this.lives = 20;
    this.resources = 0;
    this.currentWave = 1;
  }

})
