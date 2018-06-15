/// <reference path="gameobject.ts"/>

class Bullet extends GameObject {

    private viewDirection : number
    private xSpeed : number

    constructor(x : number, y : number, viewDirection : number, playScreen : PlayScreen) {

        super("Bullet", playScreen, x, y) 

        // The side of the player the bullet is shot from (Left or Right)
        this.viewDirection = viewDirection

        // Speed of the bullet
        this.xSpeed = 5
    }

    public update():void {

        // Bullet move left
        if ( this.viewDirection === 0) {
            this.objectPosX -= this.xSpeed
        } 
        // Bullet move right
        else {
            this.objectPosX += this.xSpeed
        }

        // Remove bullet from level if reached the outer window
        if ( this.objectPosX <= 0 || this.objectPosX >= window.innerWidth) {
            this.element.remove()
        }

        // Move Bullet
        this.element.style.transform = `translate(${this.objectPosX}px, ${this.objectPosY}px)`
    }
}