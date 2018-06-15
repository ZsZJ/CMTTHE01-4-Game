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
    function GameObject(type, playScreen, xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.type = type;
        this.playScreen = playScreen;
        this.element = document.createElement(this.type);
        this.element.style.transform = "translate(" + this.objectPosX + "px, " + this.objectPosY + "px)";
        document.body.appendChild(this.element);
    }
    Object.defineProperty(GameObject.prototype, "objectPosX", {
        get: function () {
            return this.xPos;
        },
        set: function (xPos) {
            this.xPos = xPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "objectPosY", {
        get: function () {
            return this.yPos;
        },
        set: function (yPos) {
            this.yPos = yPos;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return GameObject;
}());
var AnimatedGameObject = (function (_super) {
    __extends(AnimatedGameObject, _super);
    function AnimatedGameObject(type, playScreen, xPos, yPos) {
        var _this = _super.call(this, type, playScreen, xPos, yPos) || this;
        _this._behavior = null;
        _this._viewDirection = 0;
        _this._move = false;
        _this._appearFrames = 0;
        _this._walkFrames = 0;
        _this._attackFrames = 0;
        _this._dieFrames = 0;
        _this._state = 0;
        return _this;
    }
    Object.defineProperty(AnimatedGameObject.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (s) {
            this._state = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "appearFrames", {
        get: function () {
            return this._appearFrames;
        },
        set: function (f) {
            this._appearFrames = f;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "walkFrames", {
        get: function () {
            return this._walkFrames;
        },
        set: function (f) {
            this._walkFrames = f;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "attackFrames", {
        get: function () {
            return this._attackFrames;
        },
        set: function (f) {
            this._attackFrames = f;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "dieFrames", {
        get: function () {
            return this._dieFrames;
        },
        set: function (f) {
            this._dieFrames = f;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(AnimatedGameObject.prototype, "viewDirection", {
        get: function () {
            return this._viewDirection;
        },
        set: function (v) {
            this._viewDirection = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "move", {
        get: function () {
            return this._move;
        },
        set: function (m) {
            this._move = m;
        },
        enumerable: true,
        configurable: true
    });
    AnimatedGameObject.prototype.update = function () {
        this._behavior.update();
        if (this.move == true) {
            if (this._viewDirection == 0) {
                this.objectPosX += 1;
                this.element.style.transform = "translate(" + this.objectPosX + "px, " + this.objectPosY + "px) scaleX(-1)";
            }
            else {
                this.objectPosX -= 1;
                this.element.style.transform = "translate(" + this.objectPosX + "px, " + this.objectPosY + "px) scaleX(1)";
            }
        }
    };
    return AnimatedGameObject;
}(GameObject));
var Behavior = (function () {
    function Behavior(gameObject) {
        this.gameAnimation = null;
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
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/appear/appear", _this.gameObject.appearFrames, _this, gameObject);
        return _this;
    }
    AppearBehavior.prototype.performBehavior = function () {
        this.gameObject.state = 1;
    };
    AppearBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.behavior = new WalkBehavior(this.gameObject);
        this.gameObject.state = 2;
        this.gameObject.move = true;
    };
    return AppearBehavior;
}(Behavior));
var AttackBehavior = (function (_super) {
    __extends(AttackBehavior, _super);
    function AttackBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/attack/hit", _this.gameObject.attackFrames, _this, gameObject);
        _this.performBehavior();
        return _this;
    }
    AttackBehavior.prototype.performBehavior = function () {
        this.gameObject.element.classList.add("attack");
    };
    AttackBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.behavior = new AttackBehavior(this.gameObject);
    };
    return AttackBehavior;
}(Behavior));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, viewDirection, playScreen) {
        var _this = _super.call(this, "Bullet", playScreen, x, y) || this;
        _this.viewDirection = viewDirection;
        _this.xSpeed = 5;
        return _this;
    }
    Bullet.prototype.update = function () {
        if (this.viewDirection === 0) {
            this.objectPosX -= this.xSpeed;
        }
        else {
            this.objectPosX += this.xSpeed;
        }
        if (this.objectPosX <= 0 || this.objectPosX >= window.innerWidth) {
            this.element.remove();
        }
        this.element.style.transform = "translate(" + this.objectPosX + "px, " + this.objectPosY + "px)";
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
    PlayerDeadBehavior.prototype.performBehavior = function () {
    };
    PlayerDeadBehavior.prototype.onAnimationCompleted = function () {
    };
    return PlayerDeadBehavior;
}(Behavior));
var DieBehavior = (function (_super) {
    __extends(DieBehavior, _super);
    function DieBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/die/die", _this.gameObject.dieFrames, _this, gameObject);
        return _this;
    }
    DieBehavior.prototype.performBehavior = function () {
        this.gameObject.state = 3;
        this.gameObject.move = false;
        this.gameObject.element.classList.add('dead');
    };
    DieBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.element.remove();
    };
    return DieBehavior;
}(Behavior));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, playScreen, xPos, yPos) {
        var _this = _super.call(this, type, playScreen, xPos, yPos) || this;
        _this.health = 0;
        if (_this.objectPosX < _this.playScreen.player.getRectangle().left) {
            _this.viewDirection = 0;
            _this.element.style.transform += "scaleX(-1)";
        }
        else {
            _this.viewDirection = 1;
            _this.element.style.transform += "scaleX(1)";
        }
        return _this;
    }
    Enemy.prototype.spawn = function () {
        this.behavior = new AppearBehavior(this);
        this.behavior.performBehavior();
    };
    Enemy.prototype.hit = function () {
        this.health--;
        if (this.health == 0) {
            this.behavior = new DieBehavior(this);
            this.behavior.performBehavior();
        }
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
        if (this.delayCounter == 6) {
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
    function Player(playScreen, xPos, yPos) {
        var _this = _super.call(this, "Player", playScreen, xPos, yPos) || this;
        _this._direction = 1;
        window.addEventListener("keydown", function (e) { return _this.control(e); });
        _this.behavior = new IdleBehavior(_this);
        return _this;
    }
    Object.defineProperty(Player.prototype, "viewDirection", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.control = function (e) {
        switch (e.keyCode) {
            case 37:
                this.element.style.transform = "translate(640px, 0) scaleX(-1)";
                this._direction = 0;
                break;
            case 39:
                this.element.style.transform = "translate(640px, 0) scaleX(1)";
                this._direction = 1;
                break;
            case 32:
                this.behavior = new ShootBehavior(this);
                this.behavior.performBehavior();
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
        this._player = new Player(this, 640, 0);
        this.wave = new Wave(g.level, this, this._player);
    }
    Object.defineProperty(PlayScreen.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    PlayScreen.prototype.addEnemy = function (e) {
        this.enemies.push(e);
    };
    PlayScreen.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    PlayScreen.prototype.update = function () {
        this._player.update();
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var e = _a[_i];
            e.update();
            if (this.checkCollision(e.getRectangle(), this.player.getRectangle())) {
                e.move = false;
            }
        }
        for (var _b = 0, _c = this.bullets; _b < _c.length; _b++) {
            var b = _c[_b];
            b.update();
            for (var _d = 0, _e = this.enemies; _d < _e.length; _d++) {
                var e = _e[_d];
                if (this.checkCollision(b.getRectangle(), e.getRectangle()) && e.state == 2) {
                    b.element.remove();
                    e.hit();
                }
            }
        }
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
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
    ShootBehavior.prototype.performBehavior = function () {
        this.gameObject.element.classList.add("shoot");
        var rect = this.gameObject.element.getBoundingClientRect();
        var rectSide = rect.left;
        if (this.gameObject.viewDirection === 1) {
            rectSide = rect.right;
        }
        var bullet = new Bullet(rectSide - 10, rect.bottom - 70, this.gameObject.viewDirection, this.gameObject.playScreen);
        this.gameObject.playScreen.addBullet(bullet);
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
    function WalkBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/walk/go", _this.gameObject.walkFrames, _this, gameObject);
        return _this;
    }
    WalkBehavior.prototype.performBehavior = function () {
        this.gameObject.state = 2;
        if (this.gameObject.playScreen.checkCollision(this.gameObject.getRectangle(), this.gameObject.playScreen.player.getRectangle())) {
            this.gameObject.behavior = new AttackBehavior(this.gameObject);
        }
    };
    WalkBehavior.prototype.onAnimationCompleted = function () {
        if (this.gameObject.playScreen.checkCollision(this.gameObject.getRectangle(), this.gameObject.playScreen.player.getRectangle())) {
            this.gameObject.behavior = new AttackBehavior(this.gameObject);
        }
        else {
            this.gameObject.behavior = new WalkBehavior(this.gameObject);
        }
    };
    return WalkBehavior;
}(Behavior));
var Wave = (function () {
    function Wave(level, playScreen, player) {
        this.level = level;
        this.playScreen = playScreen;
        this.player = player;
        this.amountMonsters = Math.floor(this.level * 1.50);
        this.createEnemies();
    }
    Wave.prototype.createEnemies = function () {
        for (var i = 0; i <= this.amountMonsters; i++) {
            var posX = this.setEnemyPosition();
            var posY = 0;
            this.playScreen.addEnemy(new Zombie(this.playScreen, posX, posY));
        }
    };
    Wave.prototype.setEnemyPosition = function () {
        var posX = 0;
        var posY = 0;
        var playerHitBox = this.player.getRectangle();
        do {
            posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 70));
        } while (posX > playerHitBox.left - 150 && posX < playerHitBox.right + 150);
        return posX;
    };
    Wave.prototype.update = function () {
    };
    return Wave;
}());
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(playScreen, xPos, yPos) {
        var _this = _super.call(this, "Zombie", playScreen, xPos, yPos) || this;
        _this.appearFrames = 10;
        _this.walkFrames = 9;
        _this.attackFrames = 6;
        _this.dieFrames = 7;
        _this.health = 3;
        _this.spawn();
        return _this;
    }
    return Zombie;
}(Enemy));
//# sourceMappingURL=main.js.map