class AttackBehavior extends Behavior {

    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/attack/hit`, this.gameObject.attackFrames, this, gameObject)
        this.performBehavior()
    }

    public performBehavior() {
        this.gameObject.element.classList.add("attack")
    }

    public onAnimationCompleted () {
        this.gameObject.behavior = new AttackBehavior(this.gameObject)
    }

}