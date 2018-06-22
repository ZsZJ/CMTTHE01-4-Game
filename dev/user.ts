class User {

    // Wave Level
    private _level : number = 1

    // Score & Coins
    private _score : number = 0
    private _coins : number = 0

    // User Stats
    private _stats : UserStats = new UserStats()

    public get level () : number {
        return this._level
    }

    public set level (l : number) {
        this._level = l
    }

    public get score () : number {
        return this._score
    }

    public set score (s : number) {
        this._score = s
    }

    public get coins() : number {
        return this._coins
    }

    public set coins (c : number) {
        this._coins = c
    }

    public get userStats() : UserStats {
        return this._stats
    }

}