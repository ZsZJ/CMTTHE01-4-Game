class PlayScreen {

    private game : Game
    private player : Player
    private enemies : Enemy[]
    private bullets : Bullet[]

    constructor(g : Game) {

        // Assign Game Object
        this.game = g

        // Assign arrays
        this.bullets = new Array
        this.enemies = new Array

        // Make the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Create the player
        this.player = new Player(this)

        // Create 5 Zombies
        for(let i : number = 0; i < 5; i++) {
            this.enemies.push(new Zombie(this))
        }
    }

    // Add bullet in playscreen
    public addBullet(b:Bullet) {
        this.bullets.push(b)
    }

    // Update the game
    public update() {
        
        for (let b of this.bullets) {
            b.update()
        }

        // Keep the player updated
        this.player.update()

        // Loop through enemies
        for (let e of this.enemies) {
            // Update the enemy
            e.update()
        }

    }

}