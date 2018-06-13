/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    constructor(type : string, playScreen : PlayScreen) {
        // Give the type of the enemy to the parent constructor
        super(type, playScreen)
    }

    public onAnimationCompleted() {
        
    }

}