(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var GameView = towerDefense.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.timerId = null;
    this.paused = false;
    this.bindListeners();
  };


  GameView.prototype.start = function () {

    var gameView = this;
    this.timerId = setInterval(function () {
      if (!gameView.paused){
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }
    }, 1000 / 30);
  };

  GameView.prototype.bindListeners = function(){

    window.onblur = function() {
      this.paused = true;
      console.log("blurred")
    }.bind(this);

    window.onfocus = function() {
      this.paused = false;
        console.log("focus")
    }.bind(this);
  }



})()
