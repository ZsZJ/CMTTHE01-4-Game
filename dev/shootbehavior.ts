/// <reference path="behavior.ts" />

class ShootBehavior extends Behavior{
    
    constructor(gameObject : AnimatedGameObject) {
        super(gameObject)
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack", 9, this, gameObject)
    }

    /**
     * performBehavior
     */
    public performBehavior(playScreen : PlayScreen, player : Player) {

        // Set Shooting class
        this.gameObject.element.classList.add("shoot");

        // Get the element boundings
        let rect:ClientRect = this.gameObject.element.getBoundingClientRect()

        // Rect side for bullet positioning
        let rectSide = rect.left

        // Player is looking to the right
        if (player.viewDirection === 1) {
            rectSide = rect.right
        }

        // Make new bullet instance
        let bullet = new Bullet(rectSide - 10, rect.bottom - 70, player.viewDirection)
        playScreen.addBullet(bullet)
    }

    public onAnimationCompleted() {
        this.gameObject.element.classList.remove("shoot");
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, this, this.gameObject)
    }
}