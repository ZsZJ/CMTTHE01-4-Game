/// <reference path="enemy.ts"/>

class Zombie extends Enemy {

    /**
     * behavior : Behavior (SET) [AnimatedGameObject]
     */

    constructor(playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [Enemy]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super("Zombie", playScreen, xPos, yPos)

        // Animation amount frames
        this.appearFrames = 10
        this.walkFrames = 9
        this.attackFrames = 6
        this.dieFrames = 7
        
        // Let the zombie spawn
        this.spawn()        
    }

}