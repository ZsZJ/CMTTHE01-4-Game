/// <reference path="behavior.ts" />

class ShootBehavior extends Behavior{
    
    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation("images/hero/modegun/shot/attack", 9, this, gameObject)
    }

    /**
     * performBehavior
     */
    public performBehavior() {

        // After shooting decrease current amount of bullets
        this.gameObject.playScreen.game.user.userStats.currentBullets --

        // Set Shooting class
        this.gameObject.element.classList.add("shoot");

        // Get the element boundings
        let rect:ClientRect = this.gameObject.element.getBoundingClientRect()

        // Rect side for bullet positioning
        let rectSide = rect.left

        // Player is looking to the right
        if (this.gameObject.viewDirection === 1) {
            rectSide = rect.right
        }

        // Make new bullet instance
        let bullet = new Bullet(rectSide - 10, rect.bottom - 70, this.gameObject.viewDirection, this.gameObject.playScreen)
        this.gameObject.playScreen.addBullet(bullet)
    }

    public onAnimationCompleted() {

        this.gameObject.element.classList.remove("shoot");
        
        if(this.gameObject.playScreen.player.die == false) {
        
            this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, this, this.gameObject)
        }
        else {
            this.gameObject.behavior = new PlayerDeadBehavior(this.gameObject)
        }
    }
}