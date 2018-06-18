/// <reference path="behavior.ts" />

class IdleBehavior extends Behavior {

    // private gameAnimation : GameAnimation
    constructor(gameObject : AnimatedGameObject) {

        super(gameObject)

        this.gameAnimation = new GameAnimation("images/hero/mode-gun/idle/idle", 9, this, gameObject)
    }

    public performBehavior() : void {

    }

    public onAnimationCompleted() : void {
        this.gameAnimation = new GameAnimation("images/hero/mode-gun/idle/idle", 9, this, this.gameObject)
    }
}