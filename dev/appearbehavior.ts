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
    
    }

    public onAnimationCompleted() {
        this.gameObject.behavior = new WalkBehavior(this.gameObject)
        this.gameObject.move = true
    }
}