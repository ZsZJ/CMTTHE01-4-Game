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

        super("zombie", playScreen, xPos, yPos)

        // Animation amount frames
        this._appearFrames = 10
        this._walkFrames = 9
        this._attackFrames = 6
        this._dieFrames = 7

        // Zombie stats
        this.health = (this.playScreen.game.enemyLevel * 2) + 3

        // Reward Zombie
        this._rewardScore = (100 * (this.playScreen.game.enemyLevel + 1) )
        this._rewardCoins = 50
        
        // Let the zombie spawn
        this.spawn()        
    }

}