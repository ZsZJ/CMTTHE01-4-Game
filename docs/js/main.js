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
        this._type = type;
        this._playScreen = playScreen;
        this._element = document.createElement(this.type);
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
    Object.defineProperty(GameObject.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "playScreen", {
        get: function () {
            return this._playScreen;
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
        _this._move = false;
        _this._viewDirection = 0;
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "walkFrames", {
        get: function () {
            return this._walkFrames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "attackFrames", {
        get: function () {
            return this._attackFrames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AnimatedGameObject.prototype, "dieFrames", {
        get: function () {
            return this._dieFrames;
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
        this.gameObject.playScreen.game.user.userStats.currentHealth--;
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
var DieBehavior = (function (_super) {
    __extends(DieBehavior, _super);
    function DieBehavior(gameObject, rewardCoins, rewardScore) {
        var _this = _super.call(this, gameObject) || this;
        _this.rewardCoins = rewardCoins;
        _this.rewardScore = rewardScore;
        _this.gameAnimation = new GameAnimation("images/" + _this.gameObject.type + "/die/die", _this.gameObject.dieFrames, _this, gameObject);
        return _this;
    }
    DieBehavior.prototype.performBehavior = function () {
        this.gameObject.playScreen.game.user.score += this.rewardScore;
        this.gameObject.playScreen.game.user.coins += this.rewardCoins;
        this.gameObject.state = 3;
        this.gameObject.move = false;
        this.gameObject.element.classList.remove('shoot');
        this.gameObject.element.classList.add('dead');
    };
    DieBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.element.remove();
        this.gameObject.playScreen.wave.currentMonsters--;
    };
    return DieBehavior;
}(Behavior));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(type, playScreen, xPos, yPos) {
        var _this = _super.call(this, type, playScreen, xPos, yPos) || this;
        _this.health = 0;
        _this._rewardScore = 0;
        _this._rewardCoins = 0;
        if (_this.objectPosX < _this.playScreen.player.getRectangle().left) {
            _this._viewDirection = 0;
            _this.element.style.transform += "scaleX(-1)";
        }
        else {
            _this._viewDirection = 1;
            _this.element.style.transform += "scaleX(1)";
        }
        _this.element.style.filter += "hue-rotate(" + (360 - (_this.playScreen.game.enemyLevel * 50)) + "deg)";
        return _this;
    }
    Object.defineProperty(Enemy.prototype, "rewardScore", {
        get: function () {
            return this._rewardScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Enemy.prototype, "rewardCoins", {
        get: function () {
            return this._rewardCoins;
        },
        enumerable: true,
        configurable: true
    });
    Enemy.prototype.spawn = function () {
        this.behavior = new AppearBehavior(this);
        this.behavior.performBehavior();
    };
    Enemy.prototype.hit = function () {
        this.health -= (this.playScreen.game.user.userStats.bulletPowerLevel + 1);
        if (this.health <= 0) {
            this.behavior = new DieBehavior(this, this._rewardCoins, this._rewardScore);
            this.behavior.performBehavior();
        }
    };
    return Enemy;
}(AnimatedGameObject));
var Game = (function () {
    function Game() {
        this._user = new User();
        this._enemyLevel = 0;
        this.screen = new StartScreen(this);
        this.gameLoop();
    }
    Object.defineProperty(Game.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "enemyLevel", {
        get: function () {
            return this._enemyLevel;
        },
        set: function (l) {
            this._enemyLevel = l;
        },
        enumerable: true,
        configurable: true
    });
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
        this.animationCompleteTriggered = false;
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
        if (this.currentFrame == this.amountFrames && this.animationCompleteTriggered === false) {
            this.animationCompleteTriggered = true;
            if (this.amountFrames == 7) {
            }
            this.behavior.onAnimationCompleted();
        }
    };
    return GameAnimation;
}());
var GameScreen = (function () {
    function GameScreen(g) {
        this._game = g;
    }
    Object.defineProperty(GameScreen.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    GameScreen.prototype.nextWave = function () {
        this.game.user.level++;
        this.game.user.userStats.currentHealth = this.game.user.userStats.health;
        this.game.user.userStats.currentBullets = this.game.user.userStats.bulletCap;
        document.body.innerHTML = "";
        this.game.screen = new PlayScreen(this.game);
    };
    GameScreen.prototype.update = function () {
    };
    return GameScreen;
}());
var GameOverScreen = (function (_super) {
    __extends(GameOverScreen, _super);
    function GameOverScreen(g) {
        var _this = _super.call(this, g) || this;
        document.body.innerHTML = "";
        _this.element = document.createElement("splash");
        document.body.appendChild(_this.element);
        _this.title = document.createElement("title");
        _this.element.appendChild(_this.title);
        _this.title.innerHTML = "Game Over!";
        _this.menu = document.createElement("menu");
        _this.element.appendChild(_this.menu);
        _this.endScore = document.createElement("option");
        _this.endScore.classList.add("endscore");
        _this.endScore.innerHTML = "You died at wave " + _this.game.user.level;
        _this.menu.appendChild(_this.endScore);
        _this.return = document.createElement("option");
        _this.return.classList.add("return");
        _this.return.innerHTML = "Return to menu";
        _this.menu.appendChild(_this.return);
        var ground = document.createElement("ground");
        document.body.appendChild(ground);
        _this.return.addEventListener("click", function () { return _this.returnMenu(); });
        return _this;
    }
    GameOverScreen.prototype.returnMenu = function () {
        document.body.innerHTML = "";
        new Game();
    };
    GameOverScreen.prototype.update = function () {
    };
    return GameOverScreen;
}(GameScreen));
var IdleBehavior = (function (_super) {
    __extends(IdleBehavior, _super);
    function IdleBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, _this, gameObject);
        return _this;
    }
    IdleBehavior.prototype.performBehavior = function () {
    };
    IdleBehavior.prototype.onAnimationCompleted = function () {
        if (this.gameObject.playScreen.player.die == false) {
            this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, this, this.gameObject);
        }
        else {
            this.gameObject.behavior = new PlayerDeadBehavior(this.gameObject);
        }
    };
    return IdleBehavior;
}(Behavior));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(playScreen, xPos, yPos) {
        var _this = _super.call(this, "Player", playScreen, xPos, yPos) || this;
        _this._direction = 1;
        _this._reloading = false;
        _this._die = false;
        _this.behavior = new IdleBehavior(_this);
        _this.event = function (e) { return _this.control(e); };
        window.addEventListener("keydown", _this.event);
        return _this;
    }
    Object.defineProperty(Player.prototype, "viewDirection", {
        get: function () {
            return this._direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "reloading", {
        get: function () {
            return this._reloading;
        },
        set: function (r) {
            this._reloading = r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "die", {
        get: function () {
            return this._die;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.control = function (e) {
        if (this._die == false) {
            switch (e.keyCode) {
                case 37:
                    this.element.style.transform = "translate(" + this.objectPosX + "px, 0) scaleX(-1)";
                    this._direction = 0;
                    break;
                case 39:
                    this.element.style.transform = "translate(" + this.objectPosX + "px, 0) scaleX(1)";
                    this._direction = 1;
                    break;
                case 32:
                    if (this.playScreen.game.user.userStats.currentBullets != 0 && this._reloading == false) {
                        this.behavior = new ShootBehavior(this);
                        this.behavior.performBehavior();
                    }
                    break;
                case 82:
                    if (this.playScreen.game.user.userStats.currentBullets != this.playScreen.game.user.userStats.bulletCap && this.reloading == false) {
                        this.behavior = new ReloadBehavior(this);
                        this.behavior.performBehavior();
                    }
                    break;
            }
        }
    };
    Player.prototype.update = function () {
        if (this.playScreen.game.user.userStats.currentHealth <= 0 && this._die == false) {
            this._die = true;
            this.behavior = new PlayerDeadBehavior(this);
        }
        this.behavior.update();
    };
    Player.prototype.removeListener = function () {
        window.removeEventListener("keydown", this.event);
    };
    return Player;
}(AnimatedGameObject));
var PlayerDeadBehavior = (function (_super) {
    __extends(PlayerDeadBehavior, _super);
    function PlayerDeadBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/hero/die/die", 9, _this, gameObject);
        _this.performBehavior();
        return _this;
    }
    PlayerDeadBehavior.prototype.performBehavior = function () {
        this.gameObject.element.classList.add("dead");
    };
    PlayerDeadBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.playScreen.game.screen = new GameOverScreen(this.gameObject.playScreen.game);
    };
    return PlayerDeadBehavior;
}(Behavior));
var PlayScreen = (function (_super) {
    __extends(PlayScreen, _super);
    function PlayScreen(g) {
        var _this = _super.call(this, g) || this;
        _this.bullets = new Array;
        _this._enemies = new Array;
        var ground = document.createElement("ground");
        document.body.appendChild(ground);
        _this._player = new Player(_this, (window.innerWidth / 2 - 50), 0);
        _this.scoreText = document.createElement("scoreText");
        _this.scoreText.innerHTML = "" + _this.game.user.score;
        document.body.appendChild(_this.scoreText);
        _this.coinsPlaceHolder = document.createElement("coinsPlaceholder");
        document.body.appendChild(_this.coinsPlaceHolder);
        var coinsImage = document.createElement("coinsImage");
        _this.coinsPlaceHolder.appendChild(coinsImage);
        _this.coinsText = document.createElement("coinsText");
        _this.coinsText.innerHTML = "" + _this.game.user.coins;
        _this.coinsPlaceHolder.appendChild(_this.coinsText);
        _this.waveText = document.createElement("waveText");
        _this.waveText.innerHTML = "Wave : " + _this.game.user.level;
        document.body.appendChild(_this.waveText);
        _this.bulletPlaceHolder = document.createElement("bulletplaceholder");
        document.body.appendChild(_this.bulletPlaceHolder);
        _this.bulletCap = document.createElement("bulletcap");
        _this.bulletPlaceHolder.appendChild(_this.bulletCap);
        var bulletImage = document.createElement("bulletimage");
        _this.bulletPlaceHolder.appendChild(bulletImage);
        _this.healthPlaceHolder = document.createElement("healthplaceholder");
        document.body.appendChild(_this.healthPlaceHolder);
        _this.healthCap = document.createElement("healthcap");
        _this.healthPlaceHolder.appendChild(_this.healthCap);
        var healthImage = document.createElement("healthimage");
        _this.healthPlaceHolder.appendChild(healthImage);
        _this._wave = new Wave(_this, _this._player);
        return _this;
    }
    Object.defineProperty(PlayScreen.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayScreen.prototype, "wave", {
        get: function () {
            return this._wave;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayScreen.prototype, "enemies", {
        get: function () {
            return this._enemies;
        },
        enumerable: true,
        configurable: true
    });
    PlayScreen.prototype.addEnemy = function (e) {
        this._enemies.push(e);
    };
    PlayScreen.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    PlayScreen.prototype.update = function () {
        this._player.update();
        this.healthCap.innerHTML = "" + this.game.user.userStats.currentHealth;
        this.scoreText.innerHTML = "" + this.game.user.score;
        this.coinsText.innerHTML = "" + this.game.user.coins;
        this.bulletCap.innerHTML = "" + this.game.user.userStats.currentBullets;
        if (this.game.user.userStats.currentBullets == 0) {
            this.bulletCap.classList.add('red');
        }
        else {
            this.bulletCap.classList.remove('red');
        }
        if (this.player.reloading == true) {
            this.bulletCap.innerHTML = 'Reloading...';
            this.bulletCap.classList.remove('red');
        }
        for (var _i = 0, _a = this._enemies; _i < _a.length; _i++) {
            var e = _a[_i];
            e.update();
            if (this.checkCollision(e.getRectangle(), this.player.getRectangle())) {
                e.move = false;
            }
        }
        for (var _b = 0, _c = this.bullets; _b < _c.length; _b++) {
            var b = _c[_b];
            b.update();
            for (var _d = 0, _e = this._enemies; _d < _e.length; _d++) {
                var e = _e[_d];
                if (this.checkCollision(b.getRectangle(), e.getRectangle()) && e.state == 2) {
                    b.element.remove();
                    e.hit();
                }
            }
        }
        this.wave.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return PlayScreen;
}(GameScreen));
var ReloadBehavior = (function (_super) {
    __extends(ReloadBehavior, _super);
    function ReloadBehavior(gameObject) {
        return _super.call(this, gameObject) || this;
    }
    ReloadBehavior.prototype.performBehavior = function () {
        var _this = this;
        this.gameObject.playScreen.bulletCap.innerHTML = "Reloading...";
        this.gameObject.playScreen.player.reloading = true;
        setTimeout(function () { return _this.onAnimationCompleted(); }, this.gameObject.playScreen.game.user.userStats.reload);
    };
    ReloadBehavior.prototype.onAnimationCompleted = function () {
        this.gameObject.playScreen.player.reloading = false;
        this.gameObject.playScreen.game.user.userStats.currentBullets = this.gameObject.playScreen.game.user.userStats.bulletCap;
        this.gameObject.behavior = new IdleBehavior(this.gameObject);
    };
    ReloadBehavior.prototype.update = function () {
    };
    return ReloadBehavior;
}(Behavior));
var ShootBehavior = (function (_super) {
    __extends(ShootBehavior, _super);
    function ShootBehavior(gameObject) {
        var _this = _super.call(this, gameObject) || this;
        _this.gameAnimation = new GameAnimation("images/hero/modegun/shot/attack", 9, _this, gameObject);
        return _this;
    }
    ShootBehavior.prototype.performBehavior = function () {
        this.gameObject.playScreen.game.user.userStats.currentBullets--;
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
        if (this.gameObject.playScreen.player.die == false) {
            this.gameAnimation = new GameAnimation("images/hero/modegun/idle/idle", 9, this, this.gameObject);
        }
        else {
            this.gameObject.behavior = new PlayerDeadBehavior(this.gameObject);
        }
    };
    return ShootBehavior;
}(Behavior));
var ShopScreen = (function (_super) {
    __extends(ShopScreen, _super);
    function ShopScreen(g) {
        var _this = _super.call(this, g) || this;
        _this.menu = document.createElement("shopmenu");
        document.body.appendChild(_this.menu);
        var title = document.createElement("title");
        title.innerHTML = "Upgrades Shop";
        _this.menu.appendChild(title);
        _this.upgrades = document.createElement("upgrades");
        _this.menu.appendChild(_this.upgrades);
        _this.bulletPowerPrice = 400 * (_this.game.user.userStats.bulletPowerLevel + 1);
        _this.bulletCapPrice = 600 * (_this.game.user.userStats.bulletCapLevel + 1);
        _this.reloadSpeedPrice = 250 * (_this.game.user.userStats.reloadLevel + 1);
        _this.maxHealthPrice = 450 * (_this.game.user.userStats.healthLevel + 1);
        _this.createBulletPowerTile();
        _this.createBulletCapTile();
        _this.createReloadSpeedTile();
        _this.createMaxHealthTile();
        _this.amountCoins = document.createElement("amount");
        _this.menu.appendChild(_this.amountCoins);
        var nextButton = document.createElement("NextButton");
        nextButton.innerHTML = "Next Wave";
        _this.menu.appendChild(nextButton);
        nextButton.addEventListener("click", function () { return _this.nextWave(); });
        return _this;
    }
    ShopScreen.prototype.update = function () {
        this.amountCoins.innerHTML = "You Have : " + this.game.user.coins + "G";
        this.bulletPowerPrice = 400 * (this.game.user.userStats.bulletPowerLevel + 1);
        this.bulletCapPrice = 600 * (this.game.user.userStats.bulletCapLevel + 1);
        this.reloadSpeedPrice = 250 * (this.game.user.userStats.reloadLevel + 1);
        this.maxHealthPrice = 450 * (this.game.user.userStats.healthLevel + 1);
    };
    ShopScreen.prototype.upgrade = function (price, type, text, cost) {
        var _this = this;
        if (this.game.user.coins >= price) {
            this.game.user.coins -= price;
            switch (type) {
                case 0:
                    this.game.user.userStats.bulletPowerLevel = 1;
                    text.innerHTML = "Bullet power <br /> Level : " + this.game.user.userStats.bulletPowerLevel;
                    cost.innerHTML = price + 400 + "G";
                    break;
                case 1:
                    this.game.user.userStats.bulletCapLevel = 1;
                    text.innerHTML = "Bullet cap <br /> Level : " + this.game.user.userStats.bulletCapLevel;
                    cost.innerHTML = price + 600 + "G";
                    break;
                case 2:
                    this.game.user.userStats.reloadLevel = 1;
                    text.innerHTML = "Reload speed <br /> Level : " + this.game.user.userStats.reloadLevel;
                    cost.innerHTML = price + 250 + "G";
                    break;
                case 3:
                    this.game.user.userStats.healthLevel = 1;
                    text.innerHTML = "Max health <br /> Level : " + this.game.user.userStats.healthLevel;
                    cost.innerHTML = price + 450 + "G";
                    break;
            }
        }
        else {
            this.amountCoins.classList.add("warning");
            setTimeout(function () { return _this.amountCoins.classList.remove("warning"); }, 1000);
        }
    };
    ShopScreen.prototype.createBulletPowerTile = function () {
        var _this = this;
        var tile = document.createElement("bulletpowerupgrade");
        tile.classList.add("tile");
        this.upgrades.appendChild(tile);
        var image = document.createElement("bulletpowerupgradeimage");
        image.classList.add("image");
        tile.appendChild(image);
        var text = document.createElement("bulletPowerUpgradetext");
        text.classList.add("text");
        text.innerHTML = "Bullet power <br /> Level : " + this.game.user.userStats.bulletPowerLevel;
        tile.appendChild(text);
        var cost = document.createElement("bulletPowerUpgradeCost");
        cost.classList.add("cost");
        cost.innerHTML = this.bulletPowerPrice + "G";
        tile.appendChild(cost);
        tile.addEventListener("click", function () { return _this.upgrade(_this.bulletPowerPrice, 0, text, cost); });
    };
    ShopScreen.prototype.createBulletCapTile = function () {
        var _this = this;
        var tile = document.createElement("bulletcapupgrade");
        tile.classList.add("tile");
        this.upgrades.appendChild(tile);
        var image = document.createElement("bulletcapupgradeimage");
        image.classList.add("image");
        tile.appendChild(image);
        var text = document.createElement("bulletcapUpgradetext");
        text.classList.add("text");
        text.innerHTML = "Bullet cap <br /> Level : " + this.game.user.userStats.bulletCapLevel;
        tile.appendChild(text);
        var cost = document.createElement("bulletcapUpgradeCost");
        cost.classList.add("cost");
        cost.innerHTML = this.bulletCapPrice + "G";
        tile.appendChild(cost);
        tile.addEventListener("click", function () { return _this.upgrade(_this.bulletCapPrice, 1, text, cost); });
    };
    ShopScreen.prototype.createReloadSpeedTile = function () {
        var _this = this;
        var tile = document.createElement("reloadspeedupgrade");
        tile.classList.add("tile");
        this.upgrades.appendChild(tile);
        var image = document.createElement("reloadspeedupgradeimage");
        image.classList.add("image");
        tile.appendChild(image);
        var text = document.createElement("reloadspeedUpgradetext");
        text.classList.add("text");
        text.innerHTML = "Reload speed <br /> Level : " + this.game.user.userStats.reloadLevel;
        tile.appendChild(text);
        var cost = document.createElement("reloadspeedUpgradeCost");
        cost.classList.add("cost");
        cost.innerHTML = this.reloadSpeedPrice + "G";
        tile.appendChild(cost);
        tile.addEventListener("click", function () { return _this.upgrade(_this.reloadSpeedPrice, 2, text, cost); });
    };
    ShopScreen.prototype.createMaxHealthTile = function () {
        var _this = this;
        var tile = document.createElement("maxhealthupgrade");
        tile.classList.add("tile");
        this.upgrades.appendChild(tile);
        var image = document.createElement("maxhealthupgradeimage");
        image.classList.add("image");
        tile.appendChild(image);
        var text = document.createElement("maxhealthupgradetext");
        text.classList.add("text");
        text.innerHTML = "Max health <br /> Level : " + this.game.user.userStats.healthLevel;
        tile.appendChild(text);
        var cost = document.createElement("maxhealthupgradecost");
        cost.classList.add("cost");
        cost.innerHTML = this.maxHealthPrice + "G";
        tile.appendChild(cost);
        tile.addEventListener("click", function () { return _this.upgrade(_this.maxHealthPrice, 3, text, cost); });
    };
    return ShopScreen;
}(GameScreen));
var Sound = (function () {
    function Sound() {
        this.soundFiles = ['sounds/intro.mp3', 'sounds/battle.mp3'];
        this.intro = new Howl({
            src: [this.soundFiles[0]],
            loop: true
        });
        this.battle = new Howl({
            src: [this.soundFiles[1]],
            loop: true
        });
    }
    Sound.getInstance = function () {
        if (Sound.instance == null) {
            Sound.instance = new Sound();
        }
        return Sound.instance;
    };
    Sound.prototype.playIntro = function () {
        this.stopBattle();
        this.intro.play();
    };
    Sound.prototype.stopIntro = function () {
        this.intro.stop();
    };
    Sound.prototype.playBattle = function () {
        this.battle.play();
    };
    Sound.prototype.stopBattle = function () {
        this.battle.stop();
    };
    Sound.instance = null;
    return Sound;
}());
var StartScreen = (function (_super) {
    __extends(StartScreen, _super);
    function StartScreen(g) {
        var _this = _super.call(this, g) || this;
        _this.element = document.createElement("splash");
        document.body.appendChild(_this.element);
        _this.title = document.createElement("title");
        _this.element.appendChild(_this.title);
        _this.title.innerHTML = "Grave Rampage";
        _this.menu = document.createElement("menu");
        _this.element.appendChild(_this.menu);
        _this.start = document.createElement("option");
        _this.start.classList.add("start");
        _this.menu.appendChild(_this.start);
        _this.start.innerHTML = "Start";
        _this.start.addEventListener("click", function () { return _this.startGame(); });
        Sound.getInstance().playIntro();
        return _this;
    }
    StartScreen.prototype.startGame = function () {
        Sound.getInstance().stopIntro();
        document.body.innerHTML = "";
        this.game.screen = new PlayScreen(this.game);
    };
    StartScreen.prototype.update = function () {
    };
    return StartScreen;
}(GameScreen));
var User = (function () {
    function User() {
        this._level = 1;
        this._score = 0;
        this._coins = 0;
        this._stats = new UserStats();
    }
    Object.defineProperty(User.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (l) {
            this._level = l;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (s) {
            this._score = s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "coins", {
        get: function () {
            return this._coins;
        },
        set: function (c) {
            this._coins = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "userStats", {
        get: function () {
            return this._stats;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
var UserStats = (function () {
    function UserStats() {
        this._healthLevel = 0;
        this._reloadLevel = 0;
        this._bulletPowerLevel = 0;
        this._bulletCapLevel = 0;
        this._health = 5;
        this._reload = 1700;
        this._bullet = 1;
        this._bulletCap = 3;
        this._currentHealth = 5;
        this._currentBullets = 3;
        this.healthLevel = 0;
        this._reloadLevel = 0;
        this._bulletPowerLevel = 0;
        this._bulletCapLevel = 0;
    }
    Object.defineProperty(UserStats.prototype, "healthLevel", {
        get: function () {
            return this._healthLevel;
        },
        set: function (h) {
            this._health += h;
            this._healthLevel += h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "reloadLevel", {
        get: function () {
            return this._reloadLevel;
        },
        set: function (r) {
            this._reload -= (r * 50);
            this._reloadLevel += r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "bulletPowerLevel", {
        get: function () {
            return this._bulletPowerLevel;
        },
        set: function (b) {
            this._bullet += b;
            this._bulletPowerLevel += b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "bulletCapLevel", {
        get: function () {
            return this._bulletCapLevel;
        },
        set: function (b) {
            this._bulletCap += b;
            this._bulletCapLevel += b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "currentBullets", {
        get: function () {
            return this._currentBullets;
        },
        set: function (b) {
            this._currentBullets = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "currentHealth", {
        get: function () {
            return this._currentHealth;
        },
        set: function (h) {
            this._currentHealth = h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "bulletCap", {
        get: function () {
            return this._bulletCap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "health", {
        get: function () {
            return this._health;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "reload", {
        get: function () {
            return this._reload;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserStats.prototype, "bullet", {
        get: function () {
            return this._bullet;
        },
        enumerable: true,
        configurable: true
    });
    return UserStats;
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
    function Wave(playScreen, player) {
        this.waveComplete = false;
        this._currentMonsters = 0;
        this.playScreen = playScreen;
        this.player = player;
        this.amountMonsters = Math.floor(this.playScreen.game.user.level * 1.50);
        if (this.playScreen.game.user.level % 10 == 0) {
            this.playScreen.game.enemyLevel++;
        }
        this.waveIntroElement = document.createElement("waveintro");
        this.waveIntro();
    }
    Object.defineProperty(Wave.prototype, "currentMonsters", {
        get: function () {
            return this._currentMonsters;
        },
        set: function (c) {
            this._currentMonsters = c;
        },
        enumerable: true,
        configurable: true
    });
    Wave.prototype.waveIntro = function () {
        var _this = this;
        this.waveIntroElement.innerHTML = "Wave " + this.playScreen.game.user.level;
        document.body.appendChild(this.waveIntroElement);
        Sound.getInstance().playBattle();
        setTimeout(function () { return _this.createEnemies(); }, 5000);
    };
    Wave.prototype.createEnemies = function () {
        var _this = this;
        this.waveIntroElement.remove();
        var posX = this.setEnemyPosition();
        var posY = 0;
        this.playScreen.addEnemy(new Zombie(this.playScreen, posX, posY));
        this._currentMonsters++;
        if (this.waveComplete == false && this.playScreen.enemies.length < this.amountMonsters) {
            setTimeout(function () { return _this.createEnemies(); }, 1000);
        }
    };
    Wave.prototype.setEnemyPosition = function () {
        var posX = 0;
        var playerHitBox = this.player.getRectangle();
        do {
            posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 70));
        } while (posX > playerHitBox.left - 150 && posX < playerHitBox.right + 150);
        return posX;
    };
    Wave.prototype.update = function () {
        if (this.currentMonsters == 0 && this.playScreen.enemies.length == this.amountMonsters) {
            Sound.getInstance().stopBattle();
            this.waveComplete = true;
            this.player.removeListener();
            document.body.innerHTML = "";
            this.playScreen.game.screen = new WaveScreen(this.playScreen.game);
        }
    };
    return Wave;
}());
var WaveScreen = (function (_super) {
    __extends(WaveScreen, _super);
    function WaveScreen(g) {
        var _this = _super.call(this, g) || this;
        _this.element = document.createElement("Complete");
        _this.title = document.createElement("title");
        _this.title.innerHTML = "Wave Complete";
        _this.element.appendChild(_this.title);
        _this.upgradeButton = document.createElement("UpgradeButton");
        _this.upgradeButton.innerHTML = "Upgrades";
        _this.element.appendChild(_this.upgradeButton);
        _this.nextButton = document.createElement("NextButton");
        _this.nextButton.innerHTML = "Next Wave";
        _this.element.appendChild(_this.nextButton);
        document.body.appendChild(_this.element);
        _this.upgradeButton.addEventListener("click", function () { return _this.openUpgrades(); });
        _this.nextButton.addEventListener("click", function () { return _this.nextWave(); });
        return _this;
    }
    WaveScreen.prototype.openUpgrades = function () {
        document.body.innerHTML = "";
        this.game.screen = new ShopScreen(this.game);
    };
    WaveScreen.prototype.update = function () {
    };
    return WaveScreen;
}(GameScreen));
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(playScreen, xPos, yPos) {
        var _this = _super.call(this, "zombie", playScreen, xPos, yPos) || this;
        _this._appearFrames = 10;
        _this._walkFrames = 9;
        _this._attackFrames = 6;
        _this._dieFrames = 7;
        _this.health = (_this.playScreen.game.enemyLevel * 2) + 3;
        _this._rewardScore = (100 * (_this.playScreen.game.enemyLevel + 1));
        _this._rewardCoins = 50;
        _this.spawn();
        return _this;
    }
    return Zombie;
}(Enemy));
//# sourceMappingURL=main.js.map