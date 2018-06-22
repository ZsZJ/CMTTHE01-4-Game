class WaveScreen extends GameScreen {

    private element : HTMLElement
    
    private upgradeButton : HTMLElement
    private nextButton : HTMLElement
    private title : HTMLElement

    constructor(g : Game) {

        super(g)
    
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
        this.upgradeButton.addEventListener("click", () => this.openUpgrades())
        this.nextButton.addEventListener("click", () => this.nextWave())
    }

    // Open the upgrade shop
    private openUpgrades() {
        document.body.innerHTML = ""
        this.game.screen = new ShopScreen(this.game)
    }

    public update() {

    }

}