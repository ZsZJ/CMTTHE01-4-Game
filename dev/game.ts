class Game {

    public screen : any

    // This will be the actual player who is playing the game ( Needed for stats and levels )
    private _user : User

    // Every 10 waves the enemy will become stronger
    private _enemyLevel : number
    
    constructor() {
        this._user = new User()
        this._enemyLevel = 0
        this.screen = new StartScreen(this)
        this.gameLoop()
    }

    public get user() : User {
        return this._user
    }

    // Enemy level
    public get enemyLevel() : number {
        return this._enemyLevel
    }
    public set enemyLevel(l : number) {
        this._enemyLevel = l
    }

    private gameLoop() {
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }   

}

window.addEventListener("load", () => new Game())