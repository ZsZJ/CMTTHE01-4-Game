/// <reference path="gameobject.ts"/>

class AnimatedGameObject extends GameObject {

    // Behavior property
    protected behavior : Behavior

    constructor(type : string, playScreen : PlayScreen) {
        super(type, playScreen)
    }

    public set objectBehavior(b : Behavior) {
        this.behavior = b
    }

    public onAnimationCompleted() : void {
        this.behavior.onAnimationCompleted()
    }

    public update() {
        this.behavior.update()
    }

}
