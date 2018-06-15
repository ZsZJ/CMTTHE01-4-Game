class DieBehavior extends Behavior {

    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/die/die`, this.gameObject.dieFrames, this, gameObject)
    }

    public performBehavior() {
        this.gameObject.state = 3
        this.gameObject.move = false
        this.gameObject.element.classList.add('dead')
    }

    public onAnimationCompleted() {

        // GameObject died
        this.gameObject.element.remove()

    }

}