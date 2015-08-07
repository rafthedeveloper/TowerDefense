(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Tower = towerDefense.Tower = function (options) {
    this.towerType;
    this.attackSpeed;
    this.damage;
    this.cost;
    this.range;
    this.criticalChance;
    this.modeifiers = [];
    this.x = options.x;
    this.y = options.y;
  }

  Tower.prototype.draw = function (ctx) {
    ctx.fillStyle = "yellow";

    ctx.beginPath();
    ctx.arc(
      this.x, this.y, 10, 0, 2 * Math.PI, true
    );

    ctx.fill();
  };


})()
