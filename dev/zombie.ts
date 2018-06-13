/// <reference path="enemy.ts"/>

class Zombie extends Enemy {

    constructor(playScreen : PlayScreen) {
        
        super("Zombie", playScreen)

        // Set in appear statement
        this.behavior = new AppearBehavior(10, this)
    }

}