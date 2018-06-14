/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    /**
     * behavior : behavior (SET) [AnimatedGameObject]
     * frames : frames (SET) [AnimatedGameObjects]
     */
    protected appearFrames : number
    protected walkFrames : number
    protected attackFrames : number
    protected dieFrames : number

    constructor(type : string, playScreen : PlayScreen) {
        /* Parent constructor [AnimatedGameObject]
        *  type : string
        *  playScreen : PlayScreen
        */
        super(type, playScreen)
    }

    protected spawn () {

        // Set Spawn Frames
        this.frames = this.appearFrames
        
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)

        // After Spawn -> SET walk frames
        this.frames = this.walkFrames
    }

}