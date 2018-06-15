/// <reference path="behavior.ts" />

class WalkBehavior extends Behavior {

    /**
     * gameAnimation
     * gameObject
     */

    constructor(gameObject : AnimatedGameObject) {

        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/walk/go`, this.gameObject.walkFrames, this, gameObject)
        
    }

    public performBehavior() {

        this.gameObject.state = 2

        // Enemy has collision with player
        if (this.gameObject.playScreen.checkCollision(this.gameObject.getRectangle(), this.gameObject.playScreen.player.getRectangle())) {
            this.gameObject.behavior = new AttackBehavior(this.gameObject)
        }

    }

    public onAnimationCompleted() : void {
        
        // Repeat the behavior
        if (this.gameObject.playScreen.checkCollision(this.gameObject.getRectangle(), this.gameObject.playScreen.player.getRectangle())) {
            this.gameObject.behavior = new AttackBehavior(this.gameObject)
        } else {
            this.gameObject.behavior = new WalkBehavior(this.gameObject)
        }
        
    }

}