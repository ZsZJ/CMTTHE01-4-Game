class DieBehavior extends Behavior {

    constructor(gameObject : AnimatedGameObject) {

        super(gameObject)
        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/die/die`, this.gameObject.dieFrames, this, gameObject)
    }

    public performBehavior() {

        // Die state
        this.gameObject.state = 3

        // Stop moving
        this.gameObject.move = false

        // Add class dead
        this.gameObject.element.classList.add('dead')

    }

    public onAnimationCompleted() {

        // GameObject died
        this.gameObject.element.remove()

        // Remove Wave current amount monsters
        this.gameObject.playScreen.wave.currentMonsters --
    }

}