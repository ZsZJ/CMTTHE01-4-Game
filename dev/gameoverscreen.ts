/// <reference path="gamescreen.ts" />

class GameOverScreen extends GameScreen {

    private element : HTMLElement
    private title : HTMLElement

    private menu : HTMLElement

    // Menu options
    private endScore : HTMLElement
    private return : HTMLElement


    constructor(g : Game) {

        super(g)

        document.body.innerHTML = ""

        // Create splash gameover element
        this.element = document.createElement("splash")
        document.body.appendChild(this.element)

        // Make title element
        this.title = document.createElement("title")
        this.element.appendChild(this.title)
        this.title.innerHTML = "Game Over!"

        // Make the menu placeholder
        this.menu = document.createElement("menu")
        this.element.appendChild(this.menu)

        /**
         *  Make the options
        **/

        // End score
        this.endScore = document.createElement("option")
        this.endScore.classList.add("endscore")
        this.endScore.innerHTML = `You died at wave ${this.game.user.level}`
        this.menu.appendChild(this.endScore)

        // Make the return option
        this.return = document.createElement("option")
        this.return.classList.add("return")
        this.return.innerHTML = "Return to menu"
        this.menu.appendChild(this.return)

        // Make the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Click on start to start the game
        this.return.addEventListener("click", () => this.returnMenu())
    }   
    
    // Return to the start screen ( New Game )
    private returnMenu() {
        document.body.innerHTML = ""
        new Game()
    }

    public update() {
        
    }

}