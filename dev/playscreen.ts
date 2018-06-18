class PlayScreen {

    private _game : Game
    private _player : Player
    private _enemies : Enemy[]
    private bullets : Bullet[]
    private _wave : Wave

    constructor(g : Game) {
        // Assign Game Object
        this._game = g

        // Assign arrays
        this.bullets = new Array
        this._enemies = new Array

        // Make the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Create the player
        this._player = new Player(this, 640, 0)

        // Create Wave [Game.level : number]
        this._wave = new Wave(this, this._player)
    }

    // Get the game instance
    public get game() : Game {
        return this._game
    }

    // Get the player instance
    public get player() : Player {
        return this._player
    }

    // Get the wave instance
    public get wave() : Wave {
        return this._wave
    }

    // Get the enemies instance
    public get enemies() : Enemy[] {
        return this._enemies
    }

    // Push enemy in array
    public addEnemy(e : Enemy)
    {
        this._enemies.push(e)
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
         for (let e of this._enemies) {
            
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
            for (let e of this._enemies) {
                // Enemy has collision with bullet and is not spawning or dying
                if (this.checkCollision(b.getRectangle(), e.getRectangle()) && e.state == 2) {
                    // Remove bullet element
                    b.element.remove()
                    // Enemy is hit
                    e.hit()
                }
            }
        }

        // Keep the wave updated
        this.wave.update()

    }

    // Check Collision
    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

}