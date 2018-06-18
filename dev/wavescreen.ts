class WaveScreen {

    private element : HTMLElement
    private game : Game
    
    private nextButton : HTMLElement

    constructor(g : Game) {
        this.game = g

         // Set element
         this.element = document.createElement("Complete")
         this.element.innerHTML = "Wave Complete"

         // Set Shop button
         let shopButton = document.createElement("ShopButton")
         this.element.appendChild(shopButton)

         // Set Next Wave button
        this.nextButton = document.createElement("NextButton")
        this.element.appendChild(this.nextButton)

        // Append the element to the body
        document.body.appendChild(this.element)

        // Click on next to start the next wave
        this.nextButton.addEventListener("click", () => this.nextWave())
    }

    private nextWave() {
        // Reset the body inner html and show the play screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update() {

    }

}