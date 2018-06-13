abstract class Behavior {

    protected gameAnimation : GameAnimation
    protected gameObject : GameObject

    constructor(gameObject : GameObject) {
        this.gameObject = gameObject
    }

    abstract performBehavior(playScreen : PlayScreen, gameObject : GameObject) : void
    abstract onAnimationCompleted() : void

    public update() : void {
        this.gameAnimation.update()
    }
}