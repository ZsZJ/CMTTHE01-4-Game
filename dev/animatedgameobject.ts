/// <reference path="gameobject.ts"/>

class AnimatedGameObject extends GameObject {

    /**
     * element : HTMLElement
     * type : string
     * playScreen : PlayScreen
     */

    private _behavior : Behavior
    private _frames : number

    constructor(type : string, playScreen : PlayScreen) {
        /* Parent constructor [GameObject]
        *  type : string
        *  playScreen : PlayScreen
        */
        super(type, playScreen)
    }

    // Behavio Getter
    public get behavior() : Behavior {
        return this._behavior
    }

    // Behavior Setter
    public set behavior(b : Behavior) {
        this._behavior = b
    }

    // Frames getter
    public get frames() : number {
        return this._frames
    }

    // Frames setter
    public set frames(f : number) {
        this._frames = f
    }

    // Update the behavior
    public update() {
        this._behavior.update()
    }

}
