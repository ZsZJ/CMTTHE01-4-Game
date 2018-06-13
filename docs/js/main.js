"use strict";
var Bullet = (function () {
    function Bullet(x, y, side) {
        this.element = document.createElement("bullet");
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
var Enemy = (function () {
    function Enemy() {
    }
    return Enemy;
}());
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
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
    function GameAnimation(p, go) {
        this._path = p;
        this.gameObject = go;
    }
    return GameAnimation;
}());
var Hero = (function () {
    function Hero(left, right, spacebar, rKey, g) {
        var _this = this;
        this.sprite = "";
        this.currentState = 1;
        this.amountFrames = 0;
        this.delayAmount = 0;
        this.health = 3;
        this.element = document.createElement('hero');
        document.body.appendChild(this.element);
        this.leftKey = left;
        this.rightKey = right;
        this.spaceBar = spacebar;
        this.rKey = rKey;
        this.game = g;
        this.idle();
        this.stats = new Stats(1, 1, 1, 1);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
    }
    Hero.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.leftKey:
                this.element.style.transform = "scaleX(-1)";
                this.currentState = this.leftKey;
                break;
            case this.rightKey:
                this.element.style.transform = "scaleX(1)";
                this.currentState = this.rightKey;
                break;
            case this.spaceBar:
                this.shoot();
                break;
            case this.rKey:
                this.reload();
                break;
        }
    };
    Hero.prototype.idle = function () {
        this.state = 1;
        this.element.classList.remove('shoot');
        this.amountFrames = 9;
        this.delayAmount = 4;
        this.animation = new GameAnimation("img/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle", this);
    };
    Hero.prototype.shoot = function () {
        this.state = 2;
        this.amountFrames = 9;
        this.delayAmount = 4;
        this.animation = new GameAnimation("img/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack", this);
        this.element.classList.add('shoot');
        var rect = this.element.getBoundingClientRect();
        var bullet = new Bullet(rect.left - 10, rect.top + 75, this.currentState);
        this.game.addBullet(bullet);
    };
    Hero.prototype.die = function () {
        this.state = 3;
        this.amountFrames = 9;
        this.delayAmount = 4;
        this.animation = new GameAnimation("img/Hero/06-Die/JK_P__Die", this);
        this.element.classList.add('dead');
    };
    Hero.prototype.hit = function (p) {
        this.health -= p;
        if (this.health == 0) {
            this.die();
        }
    };
    Hero.prototype.update = function () {
        switch (this.state) {
            case 1:
                if (this.animation.currentFrame >= this.amountFrames) {
                    this.animation.currentFrame = 0;
                }
                break;
            case 2:
                if (this.animation.currentFrame >= this.amountFrames) {
                    this.idle();
                }
                break;
            case 3:
                if (this.animation.currentFrame >= this.amountFrames) {
                    this.element.remove();
                }
                break;
        }
        this.animation.update();
        this.element.style.backgroundImage = "url(" + this.sprite;
    };
    return Hero;
}());
var Player = (function () {
    function Player(p) {
        var _this = this;
        this.currentSide = 1;
        this.playScreen = p;
        this.element = document.createElement("Player");
        document.body.appendChild(this.element);
        window.addEventListener("keydown", function (e) { return _this.control(e); });
    }
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
                this.attack();
                break;
        }
    };
    Player.prototype.attack = function () {
        var rect = this.element.getBoundingClientRect();
        var rectSide = rect.left;
        if (this.currentSide === 1) {
            rectSide = rect.right;
        }
        var bullet = new Bullet(rectSide - 10, rect.bottom - 70, this.currentSide);
        this.playScreen.addBullet(bullet);
    };
    Player.prototype.update = function () {
    };
    return Player;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.game = g;
        this.bullets = new Array;
        var ground = document.createElement("ground");
        document.body.appendChild(ground);
        this.player = new Player(this);
    }
    PlayScreen.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
    };
    return PlayScreen;
}());
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
//# sourceMappingURL=main.js.map