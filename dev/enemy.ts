/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    protected health : number = 0

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [AnimatedGameObject]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super(type, playScreen, xPos, yPos)

        // Flip the enemy sprite depends on side
        if ( this.objectPosX < this.playScreen.player.getRectangle().left ) {
            this.viewDirection = 0 // Left
            this.element.style.transform += `scaleX(-1)`
        }
        else {
            this.viewDirection = 1 // Right
            this.element.style.transform += `scaleX(1)`
        }
    }

    // Enemy Spawn
    public spawn () {
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)
        this.behavior.performBehavior()
    }

    // Enemy is hit by bullet
    public hit () {

        // Subtract health
        this.health--

        // If health is zero give enemy die behavior
        if (this.health == 0) {
            
            // Die Behavior enemy
            this.behavior = new DieBehavior(this)
            this.behavior.performBehavior()

        }

    }
     
}