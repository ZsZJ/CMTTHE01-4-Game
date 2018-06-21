class StartScreen {

    private element : HTMLElement
    private title : HTMLElement
    private start : HTMLElement
    //private highscores: HTMLElement

    private game : Game

    constructor(g : Game) {

        // Create Start Splash element
        this.game = g
        this.element = document.createElement("splash")
        document.body.appendChild(this.element)

        // Make title element
        this.title = document.createElement("title")
        this.element.appendChild(this.title)
        this.title.innerHTML = "Grave Rampage"

        // Make the start option
        this.start = document.createElement("start")
        this.element.appendChild(this.start)
        this.start.innerHTML = "Start"

        // Make the highscore option
        // this.highscores = document.createElement("highscores")
        // this.element.appendChild(this.highscores)
        // this.highscores.innerHTML = "Highscores"

        // Click on start to start the game
        this.start.addEventListener("click", () => this.startGame())
    }

    private startGame() {
        // Reset the body inner html and show the play screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update() {
        
    }

}