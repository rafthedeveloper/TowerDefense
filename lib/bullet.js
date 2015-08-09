(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var lazer = towerDefense.Bullet = function (options) {
    this.tower = options.tower;
    this.targetX = options.targetX;
    this.targetY = options.targetY;
    this.timeOnScreen = 3;
  }

})()
