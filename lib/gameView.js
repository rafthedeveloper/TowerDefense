(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var GameView = towerDefense.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
  };


  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / 30
    );
  };



})()
