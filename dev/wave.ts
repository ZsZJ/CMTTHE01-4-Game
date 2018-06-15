class Wave {

    private level : number
    private playScreen : PlayScreen
    private player : Player
    private amountMonsters : number

    constructor(level : number, playScreen : PlayScreen, player : Player) {
        
        // Set Level
        this.level = level

        // Set Playscreen
        this.playScreen = playScreen

        // Set Player
        this.player = player

        // Calculate amount monster ( FLOOR : level * 1.50 )
        this.amountMonsters = Math.floor(this.level * 1.50)

        // Create the enemies
        this.createEnemies()
    }

    private createEnemies() {

        for (let i : number = 0; i <= this.amountMonsters; i++) {

            // Set the position of the enemy
            let posX = this.setEnemyPosition()
            let posY = 0

            // Add the enemy to the playscreen
            this.playScreen.addEnemy(new Zombie(this.playScreen, posX, posY))
        }

    }

    private setEnemyPosition () : number {

        let posX = 0
        let posY = 0
        let playerHitBox = this.player.getRectangle()

        do {
            posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 70));
        } 
        while (posX > playerHitBox.left - 150 && posX < playerHitBox.right + 150)

        return posX
    }

    public update() {
        
    }

}