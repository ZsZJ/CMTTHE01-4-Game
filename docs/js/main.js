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
    function GameObject(type) {
        this.element = document.createElement(type);
        document.body.appendChild(this.element);
    }
    return GameObject;
}());
var AnimatedGameObject = (function (_super) {
    __extends(AnimatedGameObject, _super);
    function AnimatedGameObject(type, behavior) {
        var _this = _super.call(this, type) || this;
        _this.currentSide = 1;
        _this.behavior = behavior;
        return _this;
    }
    Object.defineProperty(AnimatedGameObject.prototype, "playerBehavior", {
        set: function (b) {
            this.behavior = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "viewDirection", {
        get: function () {
            return this.currentSide;
        },
        enumerable: true,
        configurable: true
    });
    AnimatedGameObject.prototype.update = function () {
        this.behavior.update();
    };
    AnimatedGameObject.prototype.onAnimationCompleted = function () {
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
var Bullet = (function () {
    function Bullet(x, y, side) {
        this.element = document.createElement("Bullet");
        document.body.appendChild(this.element);
        this.x = x;
        this.y = y;
        this.side = side;
        this.xSpeed = 5;
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
}());
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
    function GameAnimation(p, af, r, behavior, gameObject) {
        this.delayCounter = 0;
        this.currentFrame = 0;
        this._path = p;
        this.amountFrames = af;
        this.behavior = behavior;
        this.gameObject = gameObject;
    }
    GameAnimation.prototype.update = function () {
        this.delayCounter++;
        if (this.delayCounter == 5) {
            this.currentFrame++;
            this.delayCounter = 0;
        }
        this.gameObject.element.style.backgroundImage = "url(" + this._path + "_" + this.currentFrame + ".png)";
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
        _this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, false, _this, gameObject);
        return _this;
    }
    IdleBehavior.prototype.performBehavior = function () {
    };
    IdleBehavior.prototype.onAnimationCompleted = function () {
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, false, this, this.gameObject);
    };
    IdleBehavior.prototype.update = function () {
        this.gameAnimation.update();
    };
    return IdleBehavior;
}(Behavior));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(p) {
        var _this = _super.call(this, "Player") || this;
        _this.currentSide = 1;
        _this.playScreen = p;
        window.addEventListener("keydown", function (e) { return _this.control(e); });
        _this.behavior = new IdleBehavior(_this);
        return _this;
    }
    Object.defineProperty(Player.prototype, "playerBehavior", {
        set: function (b) {
            this.behavior = b;
        },
        enumerable: true,
        configurable: true
    });
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
    Player.prototype.update = function () {
        this.behavior.update();
    };
    Player.prototype.onAnimationCompleted = function () {
        this.behavior.onAnimationCompleted();
    };
    return Player;
}(GameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.game = g;
        this.bullets = new Array;
        var ground = document.createElement("ground");
        document.body.appendChild(ground);
        this.player = new Player(this);
        this.wave = new Wave(this.game.level);
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
    };
    return PlayScreen;
}());
var ShootBehavior = (function (_super) {
    __extends(ShootBehavior, _super);
    function ShootBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameObject = gameObject;
        _this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack", 9, false, _this, gameObject);
        return _this;
    }
    ShootBehavior.prototype.performBehavior = function (playScreen) {
        var rect = this.gameObject.element.getBoundingClientRect();
        var rectSide = rect.left;
        if (this.gameObject.viewDirection === 1) {
            rectSide = rect.right;
        }
        var bullet = new Bullet(rectSide - 10, rect.bottom - 70, player.viewDirection);
        playScreen.addBullet(bullet);
    };
    ShootBehavior.prototype.onAnimationCompleted = function () {
        this.gameAnimation = new GameAnimation("images/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", 9, true, this, this.gameObject);
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
var Wave = (function () {
    function Wave(l) {
        this.level = l;
        this.amountMonsters = l * 1.25;
    }
    Wave.prototype.update = function () {
    };
    return Wave;
}());
//# sourceMappingURL=main.js.map