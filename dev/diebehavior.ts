class DieBehavior extends Behavior {

    private rewardCoins : number
    private rewardScore : number

    constructor(gameObject : AnimatedGameObject, rewardCoins : number, rewardScore : number) {

        super(gameObject)

        // Rewards of the enemy
        this.rewardCoins = rewardCoins
        this.rewardScore = rewardScore

        this.gameAnimation = new GameAnimation(`images/${this.gameObject.type}/die/die`, this.gameObject.dieFrames, this, gameObject)
    }

    public performBehavior() {

        console.log(this.rewardScore)

        // Give player the rewards of killing enemy
        this.gameObject.playScreen.game.user.score += this.rewardScore
        this.gameObject.playScreen.game.user.coins += this.rewardCoins

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