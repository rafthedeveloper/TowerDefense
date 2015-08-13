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
      if (!this.paused && !this.game.gameIsOver){
        this.game.step();
        this.game.draw(this.ctx);
      }
    }.bind(this), 1000 / 30);
  };

  GameView.prototype.bindListeners = function(){
    window.onblur = function() {
      if (!this.game.gameIsOver){
        this.paused = true;
        document.getElementById("paused").style.display = 'block';
      }
    }.bind(this);

    document.getElementById("unpause-game").addEventListener("click", function(){
      document.getElementById("paused").style.display = 'none';
      this.paused = false;
    }.bind(this));

  };



})();
