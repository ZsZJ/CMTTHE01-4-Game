/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    protected health : number = 0

    // Rewards
    private _rewardScore : number = 0
    private _rewardCoins : number = 0

    // Reward Score GETTER & SETTERS
    public get rewardScore() : number {
        return this._rewardScore
    }

    public set rewardScore(r : number) {
        this._rewardScore = r
    }

    public get rewardCoins() : number {
        return this._rewardCoins
    }

    public set rewardCoins(r : number) {
        this._rewardCoins = r
    } 

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

        // Change the color if the enemy is stronger
        this.element.style.filter += `hue-rotate(${360 - (this.playScreen.game.enemyLevel * 50)}deg)`
    }

    // Enemy Spawn
    public spawn () {
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)
        this.behavior.performBehavior()
    }

    // Enemy is hit by bullet
    public hit () {

        // Subtract health according to bullet power level
        this.health -= (this.playScreen.game.user.userStats.bulletPowerLevel + 1)

        // If health is zero give enemy die behavior
        if (this.health <= 0) {
            
            // Die Behavior enemy
            this.behavior = new DieBehavior(this, this._rewardCoins, this._rewardScore)
            this.behavior.performBehavior()

        }

    }
     
}