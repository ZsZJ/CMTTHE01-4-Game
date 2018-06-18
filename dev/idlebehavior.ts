/// <reference path="behavior.ts" />

class IdleBehavior extends Behavior {

    // private gameAnimation : GameAnimation
    constructor(gameObject : AnimatedGameObject) {

        super(gameObject)

        this.gameAnimation = new GameAnimation("./images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, this, gameObject)
    }

    public performBehavior() : void {

    }

    public onAnimationCompleted() : void {
        this.gameAnimation = new GameAnimation("./images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, this, this.gameObject)
    }
}