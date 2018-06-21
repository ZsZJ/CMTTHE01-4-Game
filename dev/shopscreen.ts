class ShopScreen {

    // HTML element
    private menu : HTMLElement
    private upgrades : HTMLElement
    private amountCoins : HTMLElement

    // Upgrade prices
    private bulletPowerPrice : number
    private bulletCapPrice : number
    private reloadSpeedPrice : number
    private maxHealthPrice : number

    // Game instance
    private game : Game

    constructor(g : Game) {

        // Set the game instance
        this.game = g

        // Create the shop menu
        this.menu = document.createElement("shopmenu")
        document.body.appendChild(this.menu)

        // Create the title
        let title = document.createElement("title")
        title.innerHTML = "Upgrades Shop"
        this.menu.appendChild(title)

        // Create the upgrades menu
        this.upgrades = document.createElement("upgrades")
        this.menu.appendChild(this.upgrades)

        // Set prices of each upgrade
        this.bulletPowerPrice = 400 * (this.game.user.userStats.bulletPowerLevel + 1)
        this.bulletCapPrice = 250 * (this.game.user.userStats.bulletCapLevel + 1)
        this.reloadSpeedPrice = 250 * (this.game.user.userStats.reloadLevel + 1)
        this.maxHealthPrice = 450 * (this.game.user.userStats.healthLevel + 1)


        /**
         * Bullet power tile
         */
        this.createBulletPowerTile()

        /**
         * Bullet cap tile
         */
        this.createBulletCapTile()

        /**
         * Reload speed tile
         */
        this.createReloadSpeedTile()

        /**
         * Max health tile
         */
        this.createMaxHealthTile()

        // Amount coins
        this.amountCoins = document.createElement("amount")
        // this.amountCoins.innerHTML = `You Have : ${this.game.user.coins}G`
        this.menu.appendChild(this.amountCoins)

        // Next Wave Link
        let nextButton = document.createElement("NextButton")
        nextButton.innerHTML = "Next Wave"
        this.menu.appendChild(nextButton)

        // Event listener on the next wave
        nextButton.addEventListener("click", () => this.nextWave())
    }

    private nextWave() {

        // Wave Level Up
        this.game.user.level ++

        // Reset the health and bullets for the player
        this.game.user.userStats.currentHealth = this.game.user.userStats.health
        this.game.user.userStats.currentBullets = this.game.user.userStats.bulletCap

        // Reset the body inner html and show the wave start screen
        document.body.innerHTML = ""
        this.game.screen = new PlayScreen(this.game)
    }

    public update () {
        
        // Keep amount of coins up to date
        this.amountCoins.innerHTML = `You Have : ${this.game.user.coins}G`

        // Keep the prices up to date
        this.bulletPowerPrice = 400 * (this.game.user.userStats.bulletPowerLevel + 1)
        this.bulletCapPrice = 600 * (this.game.user.userStats.bulletCapLevel + 1)
        this.reloadSpeedPrice = 250 * (this.game.user.userStats.reloadLevel + 1)
        this.maxHealthPrice = 450 * (this.game.user.userStats.healthLevel + 1)

    }

    // Upgrade the level
    private upgrade(price : number, type : number, text : HTMLElement, cost : HTMLElement) {

        if (this.game.user.coins >= price) {

            // Remove amount of coins according to the upgrade
            this.game.user.coins -= price

            /**
             * 0 : Bulletpower
             * 1 : Bulletcap
             * 2 : Reload speed
             * 3 : Max health
             */
            switch(type) {

                case 0 :
                    this.game.user.userStats.bulletPowerLevel = 1
                    text.innerHTML = `Bullet power <br /> Level : ${this.game.user.userStats.bulletPowerLevel}`
                    cost.innerHTML = `${price + 400}G`
                    break
                case 1 :
                    this.game.user.userStats.bulletCapLevel = 1
                    text.innerHTML = `Bullet cap <br /> Level : ${this.game.user.userStats.bulletCapLevel}`
                    cost.innerHTML = `${price + 600}G`
                    break
                case 2 :
                    this.game.user.userStats.reloadLevel = 1
                    text.innerHTML = `Reload speed <br /> Level : ${this.game.user.userStats.reloadLevel}`
                    cost.innerHTML = `${price + 250}G`
                    break
                case 3 :
                    this.game.user.userStats.healthLevel = 1
                    text.innerHTML = `Max health <br /> Level : ${this.game.user.userStats.healthLevel}`
                    cost.innerHTML = `${price + 450}G`
                    break

            }

        }

        // Insufficient money
        else {
            this.amountCoins.classList.add("warning")
            setTimeout(() => this.amountCoins.classList.remove("warning"), 1000)
        }

    }

    // Creates the bullet power tile 
    private createBulletPowerTile() {

        // Create the button
        let tile = document.createElement("bulletpowerupgrade")
        tile.classList.add("tile")
        this.upgrades.appendChild(tile)

        // Create the image
        let image = document.createElement("bulletpowerupgradeimage")
        image.classList.add("image")
        tile.appendChild(image)

        // Create the text
        let text = document.createElement("bulletPowerUpgradetext")
        text.classList.add("text")
        text.innerHTML = `Bullet power <br /> Level : ${this.game.user.userStats.bulletPowerLevel}`
        tile.appendChild(text)

        // Create the text cost
        let cost = document.createElement("bulletPowerUpgradeCost")
        cost.classList.add("cost")
        cost.innerHTML = `${this.bulletPowerPrice}G`
        tile.appendChild(cost)

        // Add click event listener to buy upgrade
        tile.addEventListener("click", () => this.upgrade(this.bulletPowerPrice, 0, text, cost))
    }

    // Creates the bullet cap tile
    private createBulletCapTile() {

        // Create the button
        let tile = document.createElement("bulletcapupgrade") 
        tile.classList.add("tile")
        this.upgrades.appendChild(tile)

        // Create the image
        let image = document.createElement("bulletcapupgradeimage")
        image.classList.add("image")
        tile.appendChild(image)

        // Create the text
        let text = document.createElement("bulletcapUpgradetext")
        text.classList.add("text")
        text.innerHTML = `Bullet cap <br /> Level : ${this.game.user.userStats.bulletCapLevel}`
        tile.appendChild(text)

        // Create the text cost
        let cost = document.createElement("bulletcapUpgradeCost")
        cost.classList.add("cost")
        cost.innerHTML = `${this.bulletCapPrice}G`
        tile.appendChild(cost)

        // Add click event listener to buy upgrade
        tile.addEventListener("click", () => this.upgrade(this.bulletCapPrice, 1, text, cost))
    }

    // Creates the bullet cap tile
    private createReloadSpeedTile() {

        // Create the button
        let tile = document.createElement("reloadspeedupgrade") 
        tile.classList.add("tile")
        this.upgrades.appendChild(tile)

        // Create the image
        let image = document.createElement("reloadspeedupgradeimage")
        image.classList.add("image")
        tile.appendChild(image)

        // Create the text
        let text = document.createElement("reloadspeedUpgradetext")
        text.classList.add("text")
        text.innerHTML = `Reload speed <br /> Level : ${this.game.user.userStats.reloadLevel}`
        tile.appendChild(text)

        // Create the text cost
        let cost = document.createElement("reloadspeedUpgradeCost")
        cost.classList.add("cost")
        cost.innerHTML = `${this.reloadSpeedPrice}G`
        tile.appendChild(cost)

        // Add click event listener to buy upgrade
        tile.addEventListener("click", () => this.upgrade(this.reloadSpeedPrice, 2, text, cost))
    }

    // Creates the max health tile
    private createMaxHealthTile() {

        // Create the button
        let tile = document.createElement("maxhealthupgrade") 
        tile.classList.add("tile")
        this.upgrades.appendChild(tile)

        // Create the image
        let image = document.createElement("maxhealthupgradeimage")
        image.classList.add("image")
        tile.appendChild(image)

        // Create the text
        let text = document.createElement("maxhealthupgradetext")
        text.classList.add("text")
        text.innerHTML = `Max health <br /> Level : ${this.game.user.userStats.healthLevel}`
        tile.appendChild(text)

        // Create the text cost
        let cost = document.createElement("maxhealthupgradecost")
        cost.classList.add("cost")
        cost.innerHTML = `${this.maxHealthPrice}G`
        tile.appendChild(cost)

        // Add click event listener to buy upgrade
        tile.addEventListener("click", () => this.upgrade(this.maxHealthPrice, 3, text, cost))
    }

}