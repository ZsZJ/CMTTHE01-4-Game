"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(type, playScreen) {
        this.type = type;
        this.playScreen = playScreen;
        this.element = document.createElement(this.type);
        document.body.appendChild(this.element);
    }
    return GameObject;
}());
var AnimatedGameObject = (function (_super) {
    __extends(AnimatedGameObject, _super);
    function AnimatedGameObject(type, playScreen) {
        return _super.call(this, type, playScreen) || this;
    }
    Object.defineProperty(AnimatedGameObject.prototype, "behavior", {
        get: function () {
            return this._behavior;
        },
        set: function (b) {
            this._behavior = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "frames", {
        get: function () {
            return this._frames;
        },
        set: function (f) {
            this._frames = f;
        },
        enumerable: true,
        configurable: true
    });
    AnimatedGameObject.prototype.update = function () {
        this._behavior.update();
    };
    return AnimatedGameObject;
}(GameObject));
var Behavior = (function () {
    function Behavior(gameObject) {
        this.gameObject = gameObject;
    }
    Behavior.prototype.update = function () {
        this.gameAnimation.update();
    };
    return Behavior;
}());
var AppearBehavior = (function (_super) {
    __extends(AppearBehavior, _super);
    function AppearBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/appear/appear", _this.gameObject.frames, _this, gameObject);
        return _this;
    }
    AppearBehavior.prototype.performBehavior = function () {
    };
    AppearBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.behavior = new WalkBehavior(this.gameObject.frames, this.gameObject);
    };
    return AppearBehavior;
}(Behavior));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, side, playScreen) {
        var _this = _super.call(this, "Bullet", playScreen) || this;
        _this.x = x;
        _this.y = y;
        _this.side = side;
        _this.xSpeed = 5;
        return _this;
    }
    Bullet.prototype.update = function () {
        if (this.side === 0) {
            this.x -= this.xSpeed;
        }
        else {
            this.x += this.xSpeed;
        }
        if (this.x <= 0 || this.x >= window.innerWidth) {
            this.element.remove();
        }
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Bullet;
}(GameObject));
var PlayerDeadBehavior = (function (_super) {
    __extends(PlayerDeadBehavior, _super);
    function PlayerDeadBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/Hero/06-Die/", 9, _this, gameObject);
        return _this;
    }
    PlayerDeadBehavior.prototype.performBehavior = function (playScreen, player) {
    };
    PlayerDeadBehavior.prototype.onAnimationCompleted = function () {
    };
    return PlayerDeadBehavior;
}(Behavior));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, playScreen) {
        return _super.call(this, type, playScreen) || this;
    }
    Enemy.prototype.spawn = function () {
        this.frames = this.appearFrames;
        this.behavior = new AppearBehavior(this);
        this.frames = this.walkFrames;
    };
    return Enemy;
}(AnimatedGameObject));
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
        this.level = 1;
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameAnimation = (function () {
    function GameAnimation(path, amountFrames, behavior, gameObject) {
        this.delayCounter = 0;
        this.currentFrame = 0;
        this.path = path;
        this.amountFrames = amountFrames;
        this.behavior = behavior;
        this.gameObject = gameObject;
    }
    GameAnimation.prototype.update = function () {
        this.delayCounter++;
        if (this.delayCounter == 7) {
            this.currentFrame++;
            this.delayCounter = 0;
        }
        this.gameObject.element.style.backgroundImage = "url(" + this.path + "_" + this.currentFrame + ".png)";
        if (this.currentFrame == this.amountFrames) {
            this.behavior.onAnimationCompleted();
        }
    };
    return GameAnimation;
}());
var IdleBehavior = (function (_super) {
    __extends(IdleBehavior, _super);
    function IdleBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, _this, gameObject);
        return _this;
    }
    IdleBehavior.prototype.performBehavior = function () {
    };
    IdleBehavior.prototype.onAnimationCompleted = function () {
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, this, this.gameObject);
    };
    return IdleBehavior;
}(Behavior));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(p) {
        var _this = _super.call(this, "Player", p) || this;
        _this.currentSide = 1;
        window.addEventListener("keydown", function (e) { return _this.control(e); });
        _this.behavior = new IdleBehavior(_this);
        return _this;
    }
    Object.defineProperty(Player.prototype, "viewDirection", {
        get: function () {
            return this.currentSide;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.control = function (e) {
        switch (e.keyCode) {
            case 37:
                this.element.style.transform = "translate(-50%, 0) scaleX(-1)";
                this.currentSide = 0;
                break;
            case 39:
                this.element.style.transform = "translate(-50%, 0) scaleX(1)";
                this.currentSide = 1;
                break;
            case 32:
                this.behavior = new ShootBehavior(this);
                this.behavior.performBehavior(this.playScreen, this);
                break;
        }
    };
    return Player;
}(AnimatedGameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.game = g;
        this.bullets = new Array;
        this.enemies = new Array;
        var ground = document.createElement("ground");
        document.body.appendChild(ground);
        this.player = new Player(this);
        console.log(this.player);
        for (var i = 0; i < 5; i++) {
            this.enemies.push(new Zombie(this));
        }
    }
    PlayScreen.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        this.player.update();
        for (var _b = 0, _c = this.enemies; _b < _c.length; _b++) {
            var e = _c[_b];
            e.update();
        }
    };
    return PlayScreen;
}());
var ShootBehavior = (function (_super) {
    __extends(ShootBehavior, _super);
    function ShootBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack", 9, _this, gameObject);
        return _this;
    }
    ShootBehavior.prototype.performBehavior = function (playScreen, player) {
        this.gameObject.element.classList.add("shoot");
        var rect = this.gameObject.element.getBoundingClientRect();
        var rectSide = rect.left;
        if (player.viewDirection === 1) {
            rectSide = rect.right;
        }
        var bullet = new Bullet(rectSide - 10, rect.bottom - 70, player.viewDirection, playScreen);
        playScreen.addBullet(bullet);
    };
    ShootBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.element.classList.remove("shoot");
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, this, this.gameObject);
    };
    return ShootBehavior;
}(Behavior));
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.element = document.createElement("splash");
        document.body.appendChild(this.element);
        this.title = document.createElement("title");
        this.element.appendChild(this.title);
        this.title.innerHTML = "Grave Rampage";
        this.start = document.createElement("start");
        this.element.appendChild(this.start);
        this.start.innerHTML = "Start";
        this.highscores = document.createElement("highscores");
        this.element.appendChild(this.highscores);
        this.highscores.innerHTML = "Highscores";
        this.start.addEventListener("click", function () { return _this.startGame(); });
    }
    StartScreen.prototype.startGame = function () {
        document.body.innerHTML = "";
        this.game.screen = new PlayScreen(this.game);
    };
    StartScreen.prototype.update = function () {
    };
    return StartScreen;
}());
var WalkBehavior = (function (_super) {
    __extends(WalkBehavior, _super);
    function WalkBehavior(amountFrames, gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/walk/go", amountFrames, _this, gameObject);
        return _this;
    }
    WalkBehavior.prototype.performBehavior = function (playScreen, gameObject) {
    };
    WalkBehavior.prototype.onAnimationCompleted = function () {
        this.gameAnimation = new GameAnimation("images/" + this.gameObject.type + "/walk/go", this.gameObject.frames, this, this.gameObject);
    };
    return WalkBehavior;
}(Behavior));
var Wave = (function () {
    function Wave(l) {
        this.level = l;
        this.amountMonsters = l * 1.25;
    }
    Wave.prototype.update = function () {
    };
    return Wave;
}());
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(playScreen) {
        var _this = _super.call(this, "Zombie", playScreen) || this;
        _this.appearFrames = 10;
        _this.walkFrames = 9;
        _this.attackFrames = 6;
        _this.dieFrames = 7;
        _this.spawn();
        return _this;
    }
    return Zombie;
}(Enemy));
//# sourceMappingURL=main.js.map