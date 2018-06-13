abstract class Behavior {

    protected gameAnimation : GameAnimation
    protected gameObject : AnimatedGameObject

    constructor(gameObject : AnimatedGameObject) {
        this.gameObject = gameObject
    }

    abstract performBehavior(playScreen : PlayScreen, gameObject : AnimatedGameObject) : void
    abstract onAnimationCompleted() : void

    public update() : void {
        this.gameAnimation.update()
    }
}