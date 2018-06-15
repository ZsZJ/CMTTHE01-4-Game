/// <reference path="behavior.ts" />

class PlayerDeadBehavior extends Behavior {
    
    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation("images/Hero/06-Die/", 9, this, gameObject)
    }

    public performBehavior() {
    
    }

    public onAnimationCompleted() { 

    }
}