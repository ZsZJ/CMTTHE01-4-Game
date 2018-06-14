/// <reference path="enemy.ts"/>

class Zombie extends Enemy {

    /**
     * behavior : Behavior (SET) [AnimatedGameObject]
     */

    constructor(playScreen : PlayScreen) {
        
        /* Parent constructor [Enemy]
        *  type : string
        *  playScreen : PlayScreen
        */
        super("Zombie", playScreen)

        // Animation amount frames
        this.appearFrames = 10
        this.walkFrames = 9
        this.attackFrames = 6
        this.dieFrames = 7

        // Let the zombie spawn
        this.spawn()        
    }

}