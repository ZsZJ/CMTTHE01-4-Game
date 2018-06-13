class PlayScreen {

    private game : Game
    private player : Player
    // public enemies : Enemy[]
    private bullets : Bullet[]
    private wave : Wave

    constructor(g : Game) {

        this.game = g
        this.bullets = new Array

        // Make the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Create the player
        this.player = new Player(this)

        // Create the wave
        this.wave = new Wave(this.game.level)
    }

    public addBullet(b:Bullet) {
        this.bullets.push(b)
    }

    public update() {
        for (let b of this.bullets) {
            b.update()
        }

        this.player.update()
    }

}