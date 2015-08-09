(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var lazer = towerDefense.Lazer = function (options) {
    this.tower = options.tower;
    this.enemy = options.enemy;
    this.remove = false;
  }

})()
