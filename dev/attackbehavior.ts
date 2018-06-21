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
        
        // If enemy attacked player decrease the player health
        this.gameObject.playScreen.game.user.userStats.currentHealth--

        this.gameObject.behavior = new AttackBehavior(this.gameObject)
    }

}