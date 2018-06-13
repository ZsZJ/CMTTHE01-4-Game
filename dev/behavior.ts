abstract class Behavior {

    protected gameAnimation : GameAnimation
    protected gameObject : GameObject

    constructor(gameObject : GameObject) {
        this.gameObject = gameObject
        // this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack", 9, false, this, gameObject)
    }

    abstract performBehavior(playScreen : PlayScreen, player : Player) : void
    abstract onAnimationCompleted() : void

    public update() : void {
        this.gameAnimation.update()
    }
}