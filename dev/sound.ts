class Sound {

    private static instance:Sound | null = null;

    private soundFiles:Array<string> = ['sounds/intro.mp3', 'sounds/battle.mp3'];
    // private sounds:Array<Howl> = [];

    private intro : Howl
    private battle : Howl


    constructor() {
        // Load sounds
        // TODO: verwijder constante, en voeg type toe
        this.intro = new Howl({
            src: [this.soundFiles[0]],
            loop: true
        })

        this.battle = new Howl({
            src: [this.soundFiles[1]],
            loop: true
        })

    }

    public static getInstance():Sound {

        if(Sound.instance == null) {
            Sound.instance = new Sound()
        }

        return Sound.instance;
    }

    public playIntro() {
        // play intro sound
        this.intro.play()
    }

    public stopIntro(){
        // stop intro sound
        this.intro.stop()
    }

    public playBattle() {
        // play battle sound
        this.battle.play()
    }

    public stopBattle() {
        // stop battle sound
        this.battle.stop()
    }

}