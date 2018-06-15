class GameObject {

    public element : HTMLElement
    public type : string
    public playScreen : PlayScreen

    // Object Position
    private xPos : number
    private yPos : number

    public set objectPosX(xPos : number) {
        this.xPos = xPos
    }

    public get objectPosX() : number {
        return this.xPos
    }

    public set objectPosY(yPos : number) {
        this.yPos = yPos
    }

    public get objectPosY() : number {
        return this.yPos
    }

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {

        // Set position
        this.xPos = xPos
        this.yPos = yPos

        // Set the type
        this.type = type
        
        // Set the PlayScreen
        this.playScreen = playScreen

        // Create the element
        this.element = document.createElement(this.type)

        // Place the element at position
        this.element.style.transform = `translate(${this.objectPosX}px, ${this.objectPosY}px)`

        // Append the element to the body
        document.body.appendChild(this.element)
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

}