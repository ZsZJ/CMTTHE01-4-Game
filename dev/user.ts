class User {

    private _level : number = 1
    private _userStats : UserStats

    constructor() {
        this._userStats = new UserStats()
    }

    public set level (l : number) {
        this._level = l
    }

    public get level () : number {
        return this._level
    }

    public get userStats() : UserStats {
        return this._userStats
    }

}