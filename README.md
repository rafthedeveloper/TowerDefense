# SpaceWorms TD
A traditional tower defense game that utilizes HTML5's canvas element and JS to draw images straight to the DOM without any applets or load times.

## Made by:
This game was brought to life by [Sam Hone-Studer][sam], [Rafael Maldonado][raf] and [Dan Reich][dan]. They are all awesome people, and you should definitely check out their work.

[sam]:https://github.com/sporeport
[raf]: http://www.github.com/rafthedeveloper
[dan]: http://www.github.com/itsjustdanger

[Live]
[live]: http://rafdev.com/TowerDefense


## How it's made:
This game is made using vanilla JavaScript using HTML, CSS and HTML5's Canvas Element.

### Structure
The game utilizes highly abstracted object oriented design to keep code nice and DRY and help make additional features easy to implement.

### AI
The enemy AI is built to be flexible enough to adapt to any path that's provided. This allows us to quickly add new levels and modify existing game elements without needing to rewrite a bunch of code.


### Sprites
The sprites are managed with vanilla JS. We created spritesheets of all the images and set each to animate through the game loop. We took this a step further to animate the background, which utilizes three separate layers animating at different speeds to create a parallax effect.

### Want to contribute?
Feel free to fork our game and add features, if we like it, we'll accept the pull request and give you credit :)
