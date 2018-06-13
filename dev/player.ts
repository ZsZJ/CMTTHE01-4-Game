/// <reference path="animatedgameobject.ts" />

class Player extends AnimatedGameObject {

    // protected behavior : Behavior
    protected currentSide : number = 1

    // Getter player direction
    public get viewDirection() {
        return this.currentSide
    }
    
    constructor(p : PlayScreen) {

        // Call parent constructor
        super("Player", p)

        // Add controls to the player
        window.addEventListener("keydown", (e:KeyboardEvent) => this.control(e))

        // Player behavior idle
        this.behavior = new IdleBehavior(this)
    }

    private control(e:KeyboardEvent): void {

        switch(e.keyCode) {
            // Player look left (Left arrow key)
            case 37 :
                this.element.style.transform = "translate(-50%, 0) scaleX(-1)"
                this.currentSide = 0
                break
            // Player look right (Right arrow key)
            case 39 :
                this.element.style.transform = "translate(-50%, 0) scaleX(1)"
                this.currentSide = 1
                break
            // Player shoots (Spacebar)
            case 32 :
                this.behavior = new ShootBehavior(this)
                this.behavior.performBehavior(this.playScreen, this)
                break
        }
    }
}