class Sound {

    private static instance:Sound | null = null;

    private soundFiles:Array<string> = ['sounds/intro.mp3'];
    private sounds:Array<Howl> = [];


    constructor() {
        // Load sounds
        // TODO: verwijder constante, en voeg type toe
        for(let i = 0; i < 5; i++) {

            let h = new Howl({
                src: [this.soundFiles[i]],
                loop: false
            });

            this.sounds.push(h);
        }

    }

    public static getInstance():Sound {
        if(Sound.instance == null) {
            Sound.instance = new Sound();
        }

        return Sound.instance;
    }

    public playIntro() {
        // play intro sound
        this.sounds[0].play();
    }

}