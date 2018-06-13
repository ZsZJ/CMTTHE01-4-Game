// class Hero {

//     // Set element
//     public element:HTMLElement;

//     // Set Game instance
//     private game:Game;

//     // Set Hero stats instance
//     private stats:Stats;

//     // Hero sprite image
//     private sprite:string = "";

//     // Keycodes (Controls)
//     private leftKey:number;
//     private rightKey:number;
//     private spaceBar:number;
//     private rKey:number;

//     // Direction hero is facing ( left or right )
//     private currentState:number = 1;

//     // 1: idle, 2: shoot, 3: hurt, 4: dead
//     public state:number;

//     // Game animation object
//     private animation:GameAnimation;
//     private amountFrames:number = 0;
//     private delayAmount:number = 0;

//     // Test properties
//     private health:number = 3;

//     constructor(left:number, right:number, spacebar:number, rKey:number, g:Game) {

//         // Create hero element
//         this.element = document.createElement('hero');

//         // Append hero to body
//         document.body.appendChild(this.element);

//         // Set the keys
//         this.leftKey = left;
//         this.rightKey = right;
//         this.spaceBar = spacebar;
//         this.rKey = rKey;

//         // Set the game instance
//         this.game = g;

//         // Set hero state
//         this.idle();

//         // Set hero stats
//         this.stats = new Stats(1, 1, 1, 1);

//         // Add event listener for hero controls
//         window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
//     }

//     // Key controls
//     private onKeyDown(e:KeyboardEvent): void {

//         switch (e.keyCode) {
//             // Look left
//             case this.leftKey:
//                 this.element.style.transform = "scaleX(-1)";
//                 this.currentState = this.leftKey;
//                 break;
//             // Look right
//             case this.rightKey:
//                 this.element.style.transform = "scaleX(1)";
//                 this.currentState = this.rightKey;
//                 break;
//             // Fire the gun
//             case this.spaceBar:
//                 this.shoot();
//                 break;
//             // Reload gun
//             case this.rKey :
//                 this.reload();
//                 break;
//         }
//     }

//     // Hero is idle
//     private idle() {

//         // Idle state
//         this.state = 1;

//         // Remove the class shoot
//         this.element.classList.remove('shoot');

//         // New Game animation
//         this.amountFrames = 9;
//         this.delayAmount = 4;

//         this.animation = new GameAnimation(`img/Hero/_Mode-Gun/01-Idle/JK_P_Gun__Idle`, this);
//     }

//     // Hero is shooting
//     private shoot():void {

//         // After every fire reduce bullets
//         //this.amountBullets--;

//         // Set state 2 : Shoot
//         this.state = 2;

//         // New Game animation
//         this.amountFrames = 9;
//         this.delayAmount = 4;

//         this.animation = new GameAnimation(`img/Hero/_Mode-Gun/03-Shot/JK_P_Gun__Attack`, this);

//         // Add the class shoot
//         this.element.classList.add('shoot');

//         // Get the position of the hero to place the bullet at the right place
//         let rect:ClientRect = this.element.getBoundingClientRect();
//         let bullet = new Bullet(rect.left - 10, rect.top + 75, this.currentState);

//         // Add the bullet to the game
//         this.game.addBullet(bullet);
//     }

//     // The Hero died !GAMEOVER!
//     private die():void {

//         // Set state 3 : Die
//         this.state = 3;

//         // New Game animation
//         this.amountFrames = 9;
//         this.delayAmount = 4;

//         this.animation = new GameAnimation(`img/Hero/06-Die/JK_P__Die`, this);

//         // Add the class dead
//         this.element.classList.add('dead');

//     }

//     // Hero gets hit by an enemy
//     public hit(p:number) {

//         this.health -= p;

//         // Check if the hero reached 0 hitpoints, die
//         if ( this.health == 0 ) {

//             this.die();

//         }
//     }

//     // TODO:Reload the gun
//     // private reload():void {
//     //
//     //     // Reset the amount bullets
//     //     this.amountBullets = this.maxBullets;
//     //
//     // }

//     // Update the hero loop
//     public update() {

//         switch (this.state) {

//             // Idle
//             case 1:

//                 // Reset the animation if animation ended
//                 if (this.animation.currentFrame >= this.amountFrames)
//                 {
//                     this.animation.currentFrame = 0;
//                 }

//                 break;

//             // Shooting
//             case 2:

//                 // After shooting animation go back to idle
//                 if (this.animation.currentFrame >= this.amountFrames)
//                 {
//                     this.idle();
//                 }

//                 break;

//             // Die
//             case 3:

//                 // After dying end the game
//                 if (this.animation.currentFrame >= this.amountFrames)
//                 {
//                     this.element.remove();
//                 }

//                 break;

//         }

//         this.animation.update();

//         this.element.style.backgroundImage = `url(${this.sprite}`;

//     }


// }