class GameAnimation {

    public _path : string
    private behavior : Behavior
    private gameObject : GameObject

    private delayCounter : number = 0
    public currentFrame : number = 0
    public amountFrames : number

    constructor(p : string, af : number, behavior : Behavior, gameObject : GameObject) {
        
        this._path = p
        this.amountFrames = af
        this.behavior = behavior
        this.gameObject = gameObject
    }

    public update() {
     
        this.delayCounter ++

        if (this.delayCounter == 5) {
            
            this.currentFrame ++

            this.delayCounter = 0
        }
        
        // Change the sprite
        this.gameObject.element.style.backgroundImage = `url(${this._path}_${this.currentFrame}.png)`
        
        if (this.currentFrame == this.amountFrames) {
            this.behavior.onAnimationCompleted()
        }

    }

}