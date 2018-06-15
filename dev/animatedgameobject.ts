/// <reference path="gameobject.ts"/>

class AnimatedGameObject extends GameObject {

    /**
     * element : HTMLElement
     * type : string
     * playScreen : PlayScreen
     */
    private _behavior : Behavior | null = null
    private _viewDirection : number = 0
    private _move : boolean = false

    // Animation Behavior Frames
    private _appearFrames : number = 0
    private _walkFrames : number = 0
    private _attackFrames : number = 0
    private _dieFrames : number = 0

    // Object state
    private _state : number = 0

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {
        /* Parent constructor [GameObject]
        *  type : string
        *  playScreen : PlayScreen
        */
        super(type, playScreen, xPos, yPos)
    }

    // Set State Object
    public set state(s : number) {
        this._state = s
    }

    // Get State Object
    public get state() : number {
        return this._state
    }

    // Getter appear frames
    public get appearFrames() : number {
        return this._appearFrames
    }

    // Setter appear frames
    public set appearFrames(f : number) {
        this._appearFrames = f
    }

    // Getter walk frames
    public get walkFrames() : number {
        return this._walkFrames
    }

    // Setter walk frames
    public set walkFrames(f : number) {
        this._walkFrames = f
    }

    // Getter attack frames
    public get attackFrames() {
        return this._attackFrames
    }

    // Setter attacks frames
    public set attackFrames(f : number) {
        this._attackFrames = f
    }

    // Getter die frames
    public get dieFrames() {
        return this._dieFrames
    }

    // Setter die frames
    public set dieFrames(f : number) {
        this._dieFrames = f
    }

    // Behavior Getter
    public get behavior() : Behavior {
        return this._behavior!
    }

    // Behavior Setter
    public set behavior(b : Behavior) {
        this._behavior = b
    }

    // Direction setter
    public set viewDirection(v : number) {
        this._viewDirection = v
    }

    // Direction getter
    public get viewDirection() : number {
        return this._viewDirection
    }

    // Move Getter
    public get move() : boolean {
        return this._move!
    }

    // Move Setter
    public set move(m : boolean) {
        this._move = m
    }

    // Update the behavior
    public update() {
        
        this._behavior!.update()

        /**
         * IS THERE ANY OTHER POSSIBLE WAY!? PLS HELP! 
         * Moving object
         */

        // Move the Object the facing way
        if (this.move == true) {
            
            // Left view
            if (this._viewDirection == 0) {
                this.objectPosX += 1
                this.element.style.transform = `translate(${this.objectPosX}px, ${this.objectPosY}px) scaleX(-1)`

            }
            // Right view
            else {
                this.objectPosX -= 1
                this.element.style.transform = `translate(${this.objectPosX}px, ${this.objectPosY}px) scaleX(1)`
            }

        }
    }

}
