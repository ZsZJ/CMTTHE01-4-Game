# CMTTHE01-4-Game
Link voor een demo
- https://zszj.github.io/CMTTHE01-4-Game/

# Checklist
- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [ ] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [x] De game gebruikt een externe library uit de lijst in deze modulewijzer. 


# Toelichting OOP principes
## Classes
In dit project maak ik gebruik van OOP. Classes zijn een hoofdonderdeel in de OOP principes. Classes zijn componenten
die deel uit maken van een groot geheel. Met Classes zorg je ervoor dat je een soort blauwdruk maakt van een component,
hierdoor hoef je voor een 2e component niet nogmaals de zelfde code te schrijven.
Hier een klein voorbeeld:
```
/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    protected health : number = 0

    // Rewards
    private _rewardScore : number = 0
    private _rewardCoins : number = 0

    // Reward Score GETTER & SETTERS
    public get rewardScore() : number {
        return this._rewardScore
    }

    public set rewardScore(r : number) {
        this._rewardScore = r
    }

    public get rewardCoins() : number {
        return this._rewardCoins
    }

    public set rewardCoins(r : number) {
        this._rewardCoins = r
    } 

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [AnimatedGameObject]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super(type, playScreen, xPos, yPos)

        // Flip the enemy sprite depends on side
        if ( this.objectPosX < this.playScreen.player.getRectangle().left ) {
            this.viewDirection = 0 // Left
            this.element.style.transform += `scaleX(-1)`
        }
        else {
            this.viewDirection = 1 // Right
            this.element.style.transform += `scaleX(1)`
        }
        // Change the color if the enemy is stronger
        this.element.style.filter += `hue-rotate(${360 - (this.playScreen.game.enemyLevel * 50)}deg)`
    }

    // Enemy Spawn
    public spawn () {
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)
        this.behavior.performBehavior()
    }

    // Enemy is hit by bullet
    public hit () {
        // Subtract health according to bullet power level
        this.health -= (this.playScreen.game.user.userStats.bulletPowerLevel + 1)
        // If health is zero give enemy die behavior
        if (this.health <= 0) {
            // Die Behavior enemy
            this.behavior = new DieBehavior(this, this._rewardCoins, this._rewardScore)
            this.behavior.performBehavior()
        }
    }    
}
```

## Encapsulation
Dit principe gebruik je wanneer properties wilt blootstellen of afschermen, bij andere Class instancies.
'public' Ieder onderdeel mag gebruik maken van deze property
'protected' Alleen de classes die erven van deze class mag deze property gebruiken
'private' Enkel de class, waarin deze property staat mag deze property gebruiken <br/>
Hier een voorbeeld: <br/>
- Protected, omdat ik de children van dit object de health wil laten bepalen, omdat dit voor elke child uniek is, wel heeft de enemy deze property als gemeenschappelijke property.
- Private ( onder enemy class code ), omdat het geen enkel ander bestand deze element nodig heeft of hoeft te gebruiken, ik verberg dat als een private.
- Public getters gebruik ik zodat ik alsnog de waardes overal kan aanroepen, ondanks dat mijn properties op private/protected staan, zelf gebruik ik bijna nooit public properties ( dit los ik meestal op door public setters/getters ).

```
class Enemy extends AnimatedGameObject {

    protected health : number = 0

    // Rewards
    protected _rewardScore : number = 0
    protected _rewardCoins : number = 0

    // Reward Score GETTER & SETTERS
    public get rewardScore() : number {
        return this._rewardScore
    }

    public get rewardCoins() : number {
        return this._rewardCoins
    }

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [AnimatedGameObject]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super(type, playScreen, xPos, yPos)

        // Flip the enemy sprite depends on side
        if ( this.objectPosX < this.playScreen.player.getRectangle().left ) {
            this.viewDirection = 0 // Left
            this.element.style.transform += `scaleX(-1)`
        }
        else {
            this.viewDirection = 1 // Right
            this.element.style.transform += `scaleX(1)`
        }

        // Change the color if the enemy is stronger
        this.element.style.filter += `hue-rotate(${360 - (this.playScreen.game.enemyLevel * 50)}deg)`
    }

    // Enemy Spawn
    public spawn () {
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)
        this.behavior.performBehavior()
    }

    // Enemy is hit by bullet
    public hit () {

        // Subtract health according to bullet power level
        this.health -= (this.playScreen.game.user.userStats.bulletPowerLevel + 1)

        // If health is zero give enemy die behavior
        if (this.health <= 0) {
            // Die Behavior enemy
            this.behavior = new DieBehavior(this, this._rewardCoins, this._rewardScore)
            this.behavior.performBehavior()
        }
    }    
}


class StartScreen {

    private element : HTMLElement
    private title : HTMLElement
    private start : HTMLElement
    private menu : HTMLElement

    private game : Game
```
## Inheritance
Het overerven van methods en properties voorkomt het schrijven van dubbele code. Neem als voorbeeld een zombie en een Skeleton. Dit zijn beide Enemies die als property Health gemeen hebben. Maar, omdat zombie weer andere properties heeft dan een Skeleton extend je de Enemy class in beide child classes.

Hieronder een voorbeeld : 
```
/// <reference path="animatedgameobject.ts"/>

class Enemy extends AnimatedGameObject {

    protected health : number = 0

    // Rewards
    protected _rewardScore : number = 0
    protected _rewardCoins : number = 0

    // Reward Score GETTER & SETTERS
    public get rewardScore() : number {
        return this._rewardScore
    }

    // public set rewardScore(r : number) {
    //     this._rewardScore = r
    // }

    public get rewardCoins() : number {
        return this._rewardCoins
    }

    // public set rewardCoins(r : number) {
    //     this._rewardCoins = r
    // } 

    constructor(type : string, playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [AnimatedGameObject]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super(type, playScreen, xPos, yPos)

        // Flip the enemy sprite depends on side
        if ( this.objectPosX < this.playScreen.player.getRectangle().left ) {
            this.viewDirection = 0 // Left
            this.element.style.transform += `scaleX(-1)`
        }
        else {
            this.viewDirection = 1 // Right
            this.element.style.transform += `scaleX(1)`
        }

        // Change the color if the enemy is stronger
        this.element.style.filter += `hue-rotate(${360 - (this.playScreen.game.enemyLevel * 50)}deg)`
    }

    // Enemy Spawn
    public spawn () {
        // Set Spawn Behavior
        this.behavior = new AppearBehavior(this)
        this.behavior.performBehavior()
    }

    // Enemy is hit by bullet
    public hit () {

        // Subtract health according to bullet power level
        this.health -= (this.playScreen.game.user.userStats.bulletPowerLevel + 1)

        // If health is zero give enemy die behavior
        if (this.health <= 0) {
            
            // Die Behavior enemy
            this.behavior = new DieBehavior(this, this._rewardCoins, this._rewardScore)
            this.behavior.performBehavior()

        }

    }
     
}
```
```
/// <reference path="../gameobject.ts" />

/// <reference path="enemy.ts"/>

class Zombie extends Enemy {

    /**
     * behavior : Behavior (SET) [AnimatedGameObject]
     */

    constructor(playScreen : PlayScreen, xPos : number, yPos : number) {
        
        /* Parent constructor [Enemy]
        *  type : string
        *  playScreen : PlayScreen
        *  xPosition
        *  yPosition
        */

        super("zombie", playScreen, xPos, yPos)

        // Animation amount frames
        this.appearFrames = 10
        this.walkFrames = 9
        this.attackFrames = 6
        this.dieFrames = 7

        // Zombie stats
        this.health = (this.playScreen.game.enemyLevel * 2) + 3

        // Reward Zombie
        this._rewardScore = (100 * (this.playScreen.game.enemyLevel + 1) )
        this._rewardCoins = 50
        
        // Let the zombie spawn
        this.spawn()        
    }

}
```

# Klassendiagram

![My image](ZsZJ.github.com/CMTTHE01-4-Game/classdiagram.png)


# Peer reviews
### PeerReview Marleen van Lubeek https://github.com/JuliaMarleen/Game

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

## Mijn feedback
Marleen heeft keihard gewerkt aan deze game. Ze heeft vanuit de base van het huiswerk een leuk spel in elkaar gezet.
