class Wave {

    private completeElement : HTMLElement

    private playScreen : PlayScreen
    private player : Player
    private amountMonsters : number
    private _currentMonsters : number = 0
    private waveComplete : boolean = false

    public get currentMonsters() : number {
        return this._currentMonsters
    }

    public set currentMonsters(c : number) {
        this._currentMonsters = c
    }

    constructor(playScreen : PlayScreen, player : Player) {
        
        // Set Playscreen
        this.playScreen = playScreen

        // Set Player
        this.player = player

        // Calculate amount monster ( FLOOR : level * 1.50 )
        this.amountMonsters = Math.floor(this.playScreen.game.level * 1.50)

        // Create the enemies
        this.createEnemies()
    }

    private createEnemies() {

        // Set the position of the enemy
        let posX = this.setEnemyPosition()
        let posY = 0

        // Add the enemy to the playscreen
        this.playScreen.addEnemy(new Zombie(this.playScreen, posX, posY))

        // Add currentMonster on the screen
        this.currentMonsters++

        if ( this.waveComplete == false && this.playScreen.enemies.length < this.amountMonsters) {
            // Create enemies every 2 seconds
            setTimeout(() => this.createEnemies(), 1000)
        } 

    }

    private setEnemyPosition () : number {

        // Position enemy on the X line
        let posX = 0

        // Position Player
        let playerHitBox = this.player.getRectangle()

        // Generate a random position, keep doing that if the position is at players position
        do {
            posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 70));
        } 
        while (posX > playerHitBox.left - 150 && posX < playerHitBox.right + 150)

        return posX
    }

    public update() {

        // If the amount of monster on screen is zero, complete the wave
        if (this.currentMonsters == 0 && this.playScreen.enemies.length == this.amountMonsters) {
            
            // Complete the wave
            this.waveComplete = true

            // Game Level up
            this.playScreen.game.level ++

            // Open the Wave Complete Screen
            this.playScreen.game.screen = new WaveScreen(this.playScreen.game)
        }

    }

}