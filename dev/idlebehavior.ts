/// <reference path="behavior.ts" />

class IdleBehavior extends Behavior {

    // private gameAnimation : GameAnimation
    constructor(gameObject : AnimatedGameObject) {

        super(gameObject)

        this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, this, gameObject)
    }

    public performBehavior() : void {
        
    }

    public onAnimationCompleted() : void {
        if(this.gameObject.playScreen.player.die == false) {
            this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, this, this.gameObject)
        }
        else {
            this.gameObject.behavior = new PlayerDeadBehavior(this.gameObject)
        }
    }
}