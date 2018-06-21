class StartScreen extends GameScreen {

    private element : HTMLElement
    private title : HTMLElement
    private start : HTMLElement
    private menu : HTMLElement

    constructor(g : Game) {

        super(g)

        // Create Start Splash element
        this.element = document.createElement("splash")
        document.body.appendChild(this.element)

        // Make title element
        this.title = document.createElement("title")
        this.element.appendChild(this.title)
        this.title.innerHTML = "Grave Rampage"

        // Make the menu placeholder
        this.menu = document.createElement("menu")
        this.element.appendChild(this.menu)

        // Make the start option
        this.start = document.createElement("option")
        this.start.classList.add("start")
        this.menu.appendChild(this.start)
        this.start.innerHTML = "Start"

        // Click on start to start the game
        this.start.addEventListener("click", () => this.startGame())

        Sound.getInstance().playIntro()
    }

    private startGame() {

        // Stop the intro sound
        Sound.getInstance().stopIntro()

        // Reset the body inner html and show the play screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update() {
        
    }

}