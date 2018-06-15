class PlayScreen {

    private game : Game
    private _player : Player
    private enemies : Enemy[]
    private bullets : Bullet[]
    private wave : Wave

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
        this._player = new Player(this, 640, 0)

        // Create Wave [Game.level : number]
        this.wave = new Wave(g.level, this, this._player)
    }

    public get player() : Player {
        return this._player
    }

    // Push enemy in array
    public addEnemy(e : Enemy)
    {
        this.enemies.push(e)
    }

    // Add bullet in playscreen
    public addBullet(b:Bullet) {
        this.bullets.push(b)
    }

    // Update the game
    public update() {

        // Keep the player updated
        this._player.update()

         // Loop through enemies
         for (let e of this.enemies) {
            
            // update the enemies
            e.update()

            // Enemy has collision with player
            if (this.checkCollision(e.getRectangle(), this.player.getRectangle())) {
                e.move = false
            }

        }
        
        // Loop through bullets
        for (let b of this.bullets) {

            b.update()

            // Loop through enemies
            for (let e of this.enemies) {

                // Enemy has collision with player and is not spawning and dying
                if (this.checkCollision(b.getRectangle(), e.getRectangle()) && e.state == 2) {
                    b.element.remove()
                    e.hit()
                }

            }

        }

    }

    // Check Collision
    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

}