class ReloadBehavior extends Behavior {

    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
    }

    public performBehavior() {
        
        // After hero stats reload speed
        console.log('reloading....')

        this.gameObject.playScreen.bulletCap.innerHTML = "Reloading..."

        this.gameObject.playScreen.player.reloading = true

        setTimeout( () => this.onAnimationCompleted(),  this.gameObject.playScreen.game.user.userStats.reload)
    }

    public onAnimationCompleted() {

        console.log("Done reloading!")

        this.gameObject.playScreen.player.reloading = false

        // If reloading is done, give the bullet cap back to the player
        this.gameObject.playScreen.game.user.userStats.currentBullets = this.gameObject.playScreen.game.user.userStats.bulletCap

        // Set Hero back to Idle after reloading
        this.gameObject.behavior = new IdleBehavior(this.gameObject)
    }

    // Interface things NO USE
    public update() {

    }

}