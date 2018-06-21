class User {

    private _level : number = 1
    private _userStats : UserStats

    // Score & Coins
    private _score : number = 0
    private _coins : number = 0

    constructor() {
        this._userStats = new UserStats()
    }

    public set level (l : number) {
        this._level = l
    }

    public get level () : number {
        return this._level
    }

    public set score (s : number) {
        this._score = s
    }

    public get score () : number {
        return this._score
    }

    public set coins (c : number) {
        this._coins = c
    }

    public get coins() : number {
        return this._coins
    }

    public get userStats() : UserStats {
        return this._userStats
    }

}