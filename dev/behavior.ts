abstract class Behavior {

    protected gameAnimation : GameAnimation | null = null
    protected gameObject : AnimatedGameObject

    constructor(gameObject : AnimatedGameObject) {
        this.gameObject = gameObject
    }

    abstract performBehavior() : void
    abstract onAnimationCompleted() : void

    public update() : void {
        this.gameAnimation!.update()
    }
}