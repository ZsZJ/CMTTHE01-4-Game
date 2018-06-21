class PlayScreen {

    private _game : Game
    private _player : Player
    private _enemies : Enemy[]
    private bullets : Bullet[]
    private _wave : Wave

    // HTML ELEMENTS
    private bulletPlaceHolder : HTMLElement
    public bulletCap : HTMLElement

    private healthPlaceHolder : HTMLElement
    public healthCap : HTMLElement

    public scoreText : HTMLElement

    public waveText : HTMLElement

    private coinsPlaceHolder : HTMLElement
    public coinsText : HTMLElement

    constructor(g : Game) {

        // Assign Game Object
        this._game = g

        // Assign arrays
        this.bullets = new Array
        this._enemies = new Array

        // Create the ground
        let ground = document.createElement("ground")
        document.body.appendChild(ground)

        // Create the player
        this._player = new Player(this, (window.innerWidth / 2 - 50), 0)

        /**
         * 
         *  Create the UI / Stats
        */

        // Score
        this.scoreText = document.createElement("scoreText")
        this.scoreText.innerHTML = `${this.game.user.score}`
        document.body.appendChild(this.scoreText)

        // Coins
        this.coinsPlaceHolder = document.createElement("coinsPlaceholder");
        document.body.appendChild(this.coinsPlaceHolder)

        let coinsImage = document.createElement("coinsImage")
        this.coinsPlaceHolder.appendChild(coinsImage)

        this.coinsText = document.createElement("coinsText")
        this.coinsText.innerHTML = `${this.game.user.coins}`

        this.coinsPlaceHolder.appendChild(this.coinsText)

        // Current wave
        this.waveText = document.createElement("waveText")
        this.waveText.innerHTML = `Wave : ${this.game.user.level}`
        document.body.appendChild(this.waveText)

        // Current bullet UI
        this.bulletPlaceHolder = document.createElement("bulletplaceholder")
        document.body.appendChild(this.bulletPlaceHolder)

        this.bulletCap = document.createElement("bulletcap")
        this.bulletPlaceHolder.appendChild(this.bulletCap)

        let bulletImage = document.createElement("bulletimage")
        this.bulletPlaceHolder.appendChild(bulletImage)

        // Current health UI
        this.healthPlaceHolder = document.createElement("healthplaceholder")
        document.body.appendChild(this.healthPlaceHolder)

        this.healthCap = document.createElement("healthcap")
        this.healthPlaceHolder.appendChild(this.healthCap)

        let healthImage = document.createElement("healthimage")
        this.healthPlaceHolder.appendChild(healthImage)

        // END UI CREATION

        // Create the Wave
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

        // HEALTH UI
        this.healthCap.innerHTML = `${this._game.user.userStats.currentHealth}`

        // BULLET UI 

        // Keep the score update
        this.scoreText.innerHTML = `${this.game.user.score}`
        this.coinsText.innerHTML = `${this.game.user.coins}`

        // Keep the current bullets updated
        this.bulletCap.innerHTML = `${this._game.user.userStats.currentBullets}`

        // Make the bullet cap text red if there is zero bullets
        if(this._game.user.userStats.currentBullets == 0) {
            this.bulletCap.classList.add('red')
        } 
        // Remove the red class of there are bullets
        else {
            this.bulletCap.classList.remove('red')
        }
        
        // Player is reloading replace text with reloading
        if (this.player.reloading == true) {
            this.bulletCap.innerHTML = 'Reloading...'
            this.bulletCap.classList.remove('red')
        }
        // END BULLET UI

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