/// <reference path="behavior.ts" />

class PlayerDeadBehavior extends Behavior {
    
    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation("images/hero/die/die", 9, this, gameObject)
        this.performBehavior()
    }

    public performBehavior() {
        // Add dead class to player
        this.gameObject.element.classList.add("dead")
    }

    public onAnimationCompleted() { 

        this.gameObject.playScreen.game.screen = new GameOverScreen(this.gameObject.playScreen.game)

    }

}