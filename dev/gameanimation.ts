class GameAnimation {

    private path : string
    private behavior : Behavior
    private gameObject : GameObject

    private delayCounter : number = 0
    private currentFrame : number = 0
    private amountFrames : number
    private animationCompleteTriggered = false;

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
        if (this.currentFrame == this.amountFrames && this.animationCompleteTriggered === false) {

            // Make sure the animation is completed once ( Loop too fast )
            this.animationCompleteTriggered = true;
            
            if (this.amountFrames == 7) {
            // console.log(this.currentFrame)
            // console.log(this.amountFrames)
            }

            this.behavior.onAnimationCompleted()
        }

    }

}