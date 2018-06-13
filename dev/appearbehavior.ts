/// <reference path="behavior.ts" />

class AppearBehavior extends Behavior {

    constructor(amountFrames : number, gameObject : AnimatedGameObject) {
        
        super(gameObject)
        
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/appear/appear`, amountFrames, this, gameObject)
    }

    public performBehavior(playScreen : PlayScreen) {

    }

    public onAnimationCompleted() {

    }
}