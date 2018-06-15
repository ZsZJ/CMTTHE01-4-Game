/// <reference path="animatedgameobject.ts" />

class Player extends AnimatedGameObject {

    // protected behavior : Behavior
    private _direction : number = 1

    // Getter player direction
    public get viewDirection() : number {
        return this._direction
    }
    
    constructor(playScreen : PlayScreen, xPos : number, yPos : number) {

        // Call parent constructor
        super("Player", playScreen, xPos, yPos)

        // Add controls to the player
        window.addEventListener("keydown", (e:KeyboardEvent) => this.control(e))

        // Player behavior idle
        this.behavior = new IdleBehavior(this)
    }

    private control(e:KeyboardEvent): void {

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
                this.behavior = new ShootBehavior(this)
                this.behavior.performBehavior()
                break
        }
    }   
}