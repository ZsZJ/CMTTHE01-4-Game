class Player {

    private playScreen : PlayScreen
    private animation : GameAnimation

    private element : HTMLElement
    private currentSide : number = 1

    constructor(p : PlayScreen) {

        this.playScreen = p

        // Create the element
        this.element = document.createElement("Player")
        document.body.appendChild(this.element)

        // Add controls to the player
        window.addEventListener("keydown", (e:KeyboardEvent) => this.control(e))
    }

    private control(e:KeyboardEvent): void {

        switch(e.keyCode) {
            // Player look left (Left arrow key)
            case 37 :
                this.element.style.transform = "translate(-50%, 0) scaleX(-1)"
                this.currentSide = 0
            break
            // Player look right (Right arrow key)
            case 39 :
                this.element.style.transform = "translate(-50%, 0) scaleX(1)"
                this.currentSide = 1
            break
            // Player shoots (Spacebar)
            case 32 :
                this.attack();
            break
        }
    }

    private attack() {

        // this.animation = new GameAnimation()
        let rect:ClientRect = this.element.getBoundingClientRect()

        let rectSide = rect.left

        if (this.currentSide === 1) {
            rectSide = rect.right
        }
        
        let bullet = new Bullet(rectSide - 10, rect.bottom - 70, this.currentSide)

        this.playScreen.addBullet(bullet)
    }

    public update() {

    }

}