/// <reference path="behavior.ts" />

class WalkBehavior extends Behavior {

    /**
     * gameAnimation
     * gameObject
     */

    constructor(amountFrames : number, gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/walk/go`, amountFrames, this, gameObject)
    }

    public performBehavior(playScreen : PlayScreen, gameObject : AnimatedGameObject) {

    }

    public onAnimationCompleted() : void {
        // Repeat animation
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/walk/go`, this.gameObject.frames, this, this.gameObject)
    }

}