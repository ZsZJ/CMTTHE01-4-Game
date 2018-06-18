class WaveScreen {

    private element : HTMLElement
    private game : Game
    
    private upgradeButton : HTMLElement
    private nextButton : HTMLElement
    private title : HTMLElement

    constructor(g : Game) {
        
        this.game = g

        // Set element
        this.element = document.createElement("Complete")

        // Set Title element
        this.title = document.createElement("title")
        this.title.innerHTML = "Wave Complete"
        this.element.appendChild(this.title)

        // Set Shop button
        this.upgradeButton = document.createElement("UpgradeButton")
        this.upgradeButton.innerHTML = "Upgrades"
        this.element.appendChild(this.upgradeButton)

        // Set Next Wave button
        this.nextButton = document.createElement("NextButton")
        this.nextButton.innerHTML = "Next Wave"
        this.element.appendChild(this.nextButton)

        // Append the element to the body
        document.body.appendChild(this.element)

        // Click on next to start the next wave
        this.nextButton.addEventListener("click", () => this.nextWave())
    }

    private nextWave() {

        // Game Level up
        this.game.user.level ++

        // Reset the health and bullets for the player
        this.game.user.userStats.currentHealth = this.game.user.userStats.health
        this.game.user.userStats.currentBullets = this.game.user.userStats.bulletCap

        // Reset the body inner html and show the wave start screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update() {

    }

}