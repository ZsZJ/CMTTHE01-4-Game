/// <reference path="gameobject.ts" />


class Player extends GameObject {

    private playScreen : PlayScreen
    // private animation : GameAnimation

    protected behavior : Behavior

    protected currentSide : number = 1

    public set playerBehavior(b : Behavior) {
        this.behavior = b
    }

    public get viewDirection() {
        return this.currentSide
    }
    
    // private state : number

    constructor(p : PlayScreen) {
        super("Player")
        this.playScreen = p

        // Add controls to the player
        window.addEventListener("keydown", (e:KeyboardEvent) => this.control(e))

        // Set in idle state
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

    public update() {
        this.behavior.update()
    }

    public onAnimationCompleted() : void {
        this.behavior.onAnimationCompleted()
    }

}