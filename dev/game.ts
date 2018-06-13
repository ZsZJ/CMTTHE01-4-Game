class Game {

    public screen : any

    constructor() {
        this.screen = new StartScreen(this)
        this.gameLoop()
    }

    private gameLoop() {
        this.screen.update()
        requestAnimationFrame(()=>this.gameLoop())
    }   

}

window.addEventListener("load", () => new Game())