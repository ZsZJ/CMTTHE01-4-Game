/// <reference path="gameobject.ts"/>

class Bullet extends GameObject {

    //private element : HTMLElement

    public x : number;
    public y : number;

    private side : number
    private xSpeed : number

    constructor(x : number, y : number, side : number, playScreen : PlayScreen) {

        super("Bullet", playScreen) 

        // Position the bullet
        this.x = x
        this.y = y

        // The side of the player the bullet is shot from (Left or Right)
        this.side = side

        // Speed of the bullet
        this.xSpeed = 5
    }

    public update():void {

        // Bullet move left
        if ( this.side === 0) {
            this.x -= this.xSpeed
        } 
        // Bullet move right
        else {
            this.x += this.xSpeed
        }

        // Remove bullet from level if reached the outer window
        if ( this.x <= 0 || this.x >= window.innerWidth) {
            this.element.remove()
        }

        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}