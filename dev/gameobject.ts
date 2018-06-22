class GameObject {

    // Essentials
    private _element : HTMLElement
    private _type : string
    private _playScreen : PlayScreen

    // Object Position
    private xPos : number
    private yPos : number

    public get objectPosX() : number {
        return this.xPos
    }

    public set objectPosX(xPos : number) {
        this.xPos = xPos
    }

    public get objectPosY() : number {
        return this.yPos
    }

    public set objectPosY(yPos : number) {
        this.yPos = yPos
    }

    // Getters
    public get element() : HTMLElement {
        return this._element
    }

    public get type() : string {
        return this._type
    }

    public get playScreen() : PlayScreen {
        return this._playScreen
    }

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {

        // Set position
        this.xPos = xPos
        this.yPos = yPos

        // Set the type
        this._type = type
        
        // Set the PlayScreen
        this._playScreen = playScreen

        // Create the element
        this._element = document.createElement(this.type)

        // Place the element at position
        this.element.style.transform = `translate(${this.objectPosX}px, ${this.objectPosY}px)`

        // Append the element to the body
        document.body.appendChild(this.element)
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

}