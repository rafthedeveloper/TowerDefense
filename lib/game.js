(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Game = towerDefense.Game = function () {
    this.lives = 20;
    this.resources = 0;
    // this.currentWave = new towerDefense.Wave();

    this.map = new towerDefense.Map();


  }

  Game.prototype.step = function () {

  };

  Game.prototype.draw = function (ctx) {

  };


})()
