class GameScreen {

    private _game : Game
    
    constructor(g : Game) {
        this._game = g
    }

    public get game() : Game {
        return this._game
    }

    protected nextWave() {

        // Wave Level Up
        this.game.user.level ++

        // Reset the health and bullets for the player
        this.game.user.userStats.currentHealth = this.game.user.userStats.health
        this.game.user.userStats.currentBullets = this.game.user.userStats.bulletCap

        // Reset the body inner html and show the wave start screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update () {
        
    }

}