class GameAnimation {

    public path : string
    private behavior : Behavior
    private gameObject : GameObject

    private delayCounter : number = 0
    public currentFrame : number = 0
    public amountFrames : number

    constructor(path : string, amountFrames : number, behavior : Behavior, gameObject : GameObject) {
        
        this.path = path
        this.amountFrames = amountFrames
        this.behavior = behavior
        this.gameObject = gameObject
    }

    public update() {
        
        // Count the delay counter
        this.delayCounter ++

        if (this.delayCounter == 6) {
            
            this.currentFrame ++
            this.delayCounter = 0
        }
                
        // Change the sprite
        this.gameObject.element.style.backgroundImage = `url(${this.path}_${this.currentFrame}.png)`
        
        // Animation is complete
        if (this.currentFrame == this.amountFrames) {
            this.behavior.onAnimationCompleted()
        }

    }

}