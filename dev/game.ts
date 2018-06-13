class Game {

    public screen : any

    public level : number

    constructor() {
        this.screen = new StartScreen(this)
        this.level = 1
        this.gameLoop()
    }

    private gameLoop() {
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }   

}

window.addEventListener("load", () => new Game())