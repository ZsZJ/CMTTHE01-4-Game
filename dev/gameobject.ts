class GameObject {

    public element : HTMLElement

    constructor(type : string) {
        // Create the element
        this.element = document.createElement(type)
        document.body.appendChild(this.element)
    }
}