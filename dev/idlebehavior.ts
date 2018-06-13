class IdleBehavior extends Behavior {
    // private gameAnimation : GameAnimation
    constructor(gameObject : GameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, false, this, gameObject)
    }

    public performBehavior() : void {

    }

    public onAnimationCompleted() : void {
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, false, this, this.gameObject)
    }

    public update() {
        this.gameAnimation.update()
    }
}