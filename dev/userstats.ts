class UserStats {

    // Player levels ( Default level 1 )
    private _healthLevel : number = 0
    private _reloadLevel : number = 0
    private _bulletPowerLevel : number = 0
    private _bulletCapLevel : number = 0

    // Player stats defaults
    private _health : number = 5
    private _reload : number = 1700
    private _bullet : number = 1
    private _bulletCap : number = 3

    // Player current tempory stats ( FIRST INIT IN GAME )
    private _currentHealth : number = 5
    private _currentBullets : number = 3

    /**
     * LEVEL UP SETTERS
     */

    // Set the health according to level
    public set healthLevel(h : number) {
        this._health += h
        this._healthLevel += h
    }

    // Set the reload speed according to level
    public set reloadLevel(r : number) {
        this._reload -= (r * 50)
        this._reloadLevel += r
    }

    // Set the bullet power according to level
    public set bulletPowerLevel(b : number) {
        this._bullet += b
        this._bulletPowerLevel += b
    }

    // Set the bullet cap according to level
    public set bulletCapLevel(b : number) {
        this._bulletCap += b
        this._bulletCapLevel += b
    }

    /**
     * LEVEL GETTERS
     */

    // Get the health level
    public get healthLevel() : number {
        return this._healthLevel
    }

    // Get the reload level
    public get reloadLevel() : number {
        return this._reloadLevel
    }

    // Get the bullet power level
    public get bulletPowerLevel() : number {
        return this._bulletPowerLevel
    }

    // Get the bullet cap level
    public get bulletCapLevel() : number {
        return this._bulletCapLevel
    }

    /**
     * LIVE DATA GETTERS & SETTERS
     */

    // Get the current bullets to keep track of amount of bullets in game
    public get currentBullets() : number {
        return this._currentBullets
    }

    // Set the current bullets to reset the bullets when reloading
    public set currentBullets(b : number) {
        this._currentBullets = b
    }

    // Get the current health to keep track of player is still alive
    public get currentHealth() : number {
        return this._currentHealth
    }

    // Set the current health to reset the health when the wave is completed
    public set currentHealth(h : number) {
        this._currentHealth = h
    }

    // Get the Bullet Cap to know how much bullets the player can reload
    public get bulletCap() : number {
        return this._bulletCap
    }

    // Get the Health Cap to know how much health needs to be restored after the wave
    public get health() : number {
        return this._health
    }

    // Get the reload speed to determine the settimeout for reloading
    public get reload() : number {
        return this._reload
    }

    constructor() {

        // Set health according to level (default health + health level)
        this.healthLevel = 0

        // Set reload speed according to level ( default speed - level * 200)
        this._reloadLevel = 0

        // Set bullet power according to level ( default power + level )
        this._bulletPowerLevel = 0

        // Set bullet cap according to level ( default cap + level )
        this._bulletCapLevel = 0
    }

}