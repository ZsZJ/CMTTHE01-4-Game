/// <reference path="animatedgameobject.ts" />

class Player extends AnimatedGameObject {

    // Event listener
    private event : any

    // protected behavior : Behavior
    private _direction : number = 1

    // Check if character is reloading
    private _reloading : boolean = false

    // Check if character died
    private _die : boolean = false

    // Getter player direction
    public get viewDirection() : number {
        return this._direction
    }

    // Getter player reloading
    public get reloading() : boolean {
        return this._reloading
    }

    // Setter player reloading
    public set reloading(r : boolean) {
        this._reloading = r
    }

    // Getter die state
    public get die() : boolean {
        return this._die
    }
    
    constructor(playScreen : PlayScreen, xPos : number, yPos : number) {

        // Call parent constructor
        super("Player", playScreen, xPos, yPos)

        // Player behavior idle
        this.behavior = new IdleBehavior(this)

         // Add controls to the player
         this.event = (e:KeyboardEvent) => this.control(e)
         window.addEventListener("keydown", this.event)
    }

    // Player Controls
    private control(e:KeyboardEvent): void {

        // Disable the controls when the player died
        if(this._die == false) {

            switch(e.keyCode) {
                // Player look left (Left arrow key)
                case 37 :
                    this.element.style.transform = "translate(640px, 0) scaleX(-1)"
                    this._direction = 0
                    break
                // Player look right (Right arrow key)
                case 39 :
                    this.element.style.transform = "translate(640px, 0) scaleX(1)"
                    this._direction = 1
                    break
                // Player shoots (Spacebar)
                case 32 :
                    // Cannot shoot if the player has zero bullets
                    if (this.playScreen.game.user.userStats.currentBullets != 0 && this._reloading == false) {
                        this.behavior = new ShootBehavior(this)
                        this.behavior.performBehavior()
                    }
                    break
                case 82 :
                    // Reload if the player has less bullets than its cap
                    if ( this.playScreen.game.user.userStats.currentBullets != this.playScreen.game.user.userStats.bulletCap && this.reloading == false) {
                        this.behavior = new ReloadBehavior(this)
                        this.behavior.performBehavior()
                    }
                    break
            }
            
        }
    }

    public update() {

        // Check if player is dead
        if (this.playScreen.game.user.userStats.currentHealth <= 0 && this._die == false) { 
            this._die = true
            this.behavior = new PlayerDeadBehavior(this)
        }

        // Keep the behavior updated
        this.behavior.update(); 

    }

    // Remove the event listener
    public removeListener() {
        window.removeEventListener("keydown", this.event)
    }
}