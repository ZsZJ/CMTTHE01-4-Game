/// <reference path="behavior.ts" />

class AppearBehavior extends Behavior {

    /** 
     * gameAnimation
     * gameObject
    */

    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/appear/appear`, this.gameObject.appearFrames, this, gameObject)
    }

    public performBehavior() {
        this.gameObject.state = 1
    }

    public onAnimationCompleted() {
        this.gameObject.behavior = new WalkBehavior(this.gameObject)
        this.gameObject.state = 2
        this.gameObject.move = true
    }
}