class Game {

    public screen : any

    // This will be the actual player who is playing the game ( Needed for stats and levels )
    private _user : User

    constructor() {
        this.screen = new StartScreen(this)
        this._user = new User()
        this.gameLoop()
    }

    public get user() : User {
        return this._user
    }

    private gameLoop() {
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }   

}

window.addEventListener("load", () => new Game())