(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var GameView = towerDefense.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.paused = false;
    this.bindListeners();
    this.gameIsOver = false;
  };


  GameView.prototype.start = function () {

    var bg = new Image();
    bg.onload = function (){
      this.ctx.drawImage(bg, 0, 0);
    }.bind(this);

    var bg2 = new Image();
    bg2.onload = function () {
      this.ctx.drawImage(bg2, 0, 0);
    }.bind(this);

    var bg3 = new Image();
    bg3.onload = function () {
      this.ctx.drawImage(bg3, 0, 0);
    }.bind(this);

    bg.src = './assets/images/space_bg1.png';
    bg2.src = './assets/images/space_bg2.png';
    bg3.src = './assets/images/space_bg3.png';
    var bgX = 0;

    setInterval(function () {
      if (!this.paused && !this.gameIsOver){
        if (this.game.lives === 0) { this.gameOver(); }
        this.game.step();
        this.game.draw(this.ctx, {bg1: bg, bg2: bg2, bg3: bg3}, bgX);

        bgX += 1;
        if (bgX >= window.towerDefense.Game.DIM_X) {

          bgX = 0;
        }
      }
    }.bind(this), 1000 / 30);
  };

  GameView.prototype.gameOver = function() {
    this.gameIsOver = true;
    document.getElementById("game-over").style.display = 'block';

    document.getElementById("restart-game").addEventListener("click", function(){
      document.getElementById("game-over").style.display = 'none';
      this.restartGame();
    }.bind(this));

  };

  GameView.prototype.restartGame = function(){
    this.game = new towerDefense.Game();
    document.getElementById('lives').innerHTML = this.game.lives;
    this.gameIsOver = false;
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
