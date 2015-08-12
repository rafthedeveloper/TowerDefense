(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var GameView = towerDefense.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.paused = false;
    this.bindListeners();
  };


  GameView.prototype.start = function () {
    setInterval(function () {
      if (!this.paused){
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 1000 / 30);
  };

  GameView.prototype.bindListeners = function(){
    window.onblur = function() {
      this.paused = true;
    }.bind(this);

    window.onfocus = function() {
      this.paused = false;
    }.bind(this);
  }



})()
