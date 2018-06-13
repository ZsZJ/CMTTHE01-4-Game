/// <reference path="behavior.ts" />

class WalkBehavior extends Behavior {

    constructor(path : string, amountFrames : number, gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation(path, amountFrames, this, gameObject)
    }

    public performBehavior(playScreen : PlayScreen) {

    }

    public onAnimationCompleted() {
        
    }

}