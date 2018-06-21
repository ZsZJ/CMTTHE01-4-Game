class GameOverScreen {

    private element : HTMLElement
    private title : HTMLElement
    private return : HTMLElement

    private game : Game

    constructor(g : Game) {

        this.game = g

        document.body.innerHTML = ""

        // Create splash gameover element
        this.element = document.createElement("splash")
        document.body.appendChild(this.element)

        // Make title element
        this.title = document.createElement("title")
        this.element.appendChild(this.title)
        this.title.innerHTML = "Game Over!"

        // Make the return option
        this.return = document.createElement("return")
        this.element.appendChild(this.return)
        this.return.innerHTML = "Return to menu"

        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Click on start to start the game
        this.return.addEventListener("click", () => this.returnMenu())
    }   

    public returnMenu() {
        document.body.innerHTML = ""
        // Return to the Menu.. Means new Game :)
        new Game()
    }

    public update() {
        
    }

}