class PlayScreen {

    private game : Game

    private player : Player
    private enemies : Enemy[]
    private bullets : Bullet[]

    constructor(g : Game) {

        this.game = g
        this.bullets = new Array

        // Make the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Create the player
        this.player = new Player(this)
    }

    public addBullet(b:Bullet) {
        this.bullets.push(b)
    }

    public update() {
        for (let b of this.bullets) {
            b.update()
        }
    }

}