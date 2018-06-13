class GameObject {

    public element : HTMLElement

    public type : string

    public playScreen : PlayScreen

    constructor(type : string, playScreen : PlayScreen) {

        // Set the type
        this.type = type
        this.playScreen = playScreen

        // Create the element
        this.element = document.createElement(this.type)
        document.body.appendChild(this.element)
        
    }
}