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

  Game.DIM_X = 603;
  Game.DIM_Y = 603;

  Game.prototype.step = function () {

  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "#7c3409";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y)

    this.map.draw(ctx);
  };


})()
