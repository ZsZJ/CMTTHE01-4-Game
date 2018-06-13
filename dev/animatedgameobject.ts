/// <reference path="gameobject.ts" />


class AnimatedGameObject extends GameObject {
    
    protected behavior : Behavior
    protected currentSide : number = 1

    public set playerBehavior(b : Behavior) {
        this.behavior = b
    }

    public get viewDirection() {
        return this.currentSide
    }
    constructor(type : string, behavior: Behavior) {
        super(type)
        this.behavior = behavior
    }

    public update() {
        this.behavior.update()
    }

    public onAnimationCompleted() : void {

    }
}