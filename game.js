export default class game extends Phaser.Scene {
    constructor() {
      super("game");
    }
}

class GameObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }
}

class Player extends GameObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'playerTexture');
        // Agregar teclas de flecha como propiedades al jugador
        this.cursors = scene.input.keyboard.createCursorKeys();
    }


    PlayerMovement() {
        // Actualizar el movimiento del jugador en función de las teclas presionadas
        if (this.cursors.left.isDown) {
            this.x -= 5; // Mover hacia la izquierda
        } else if (this.cursors.right.isDown) {
            this.x += 5; // Mover hacia la derecha
        }

        if (this.cursors.up.isDown) {
            this.y -= 5; // Mover hacia arriba
        } else if (this.cursors.down.isDown) {
            this.y += 5; // Mover hacia abajo
        }
    }
}

class Enemy extends GameObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyTexture');
    }

    BounceSystem() {
        // Lógica de actualización del enemigo

        // Movimiento del enemigo
        this.x += this.speedX;
        this.y += this.speedY;

        // Colisiones con el obstáculo
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), obstacle.getBounds())) {
            this.speedX = -this.speedX; // Cambia la dirección horizontal
            this.speedY = -this.speedY; // Cambia la dirección vertical
        }
        // Colisiones con las paredes
        if (this.x <= 0 || this.x >= this.scene.game.config.width) {
            this.speedX = -this.speedX; // Invierte la dirección horizontal
        }

        if (this.y <= 0 || this.y >= this.scene.game.config.height) {
            this.speedY = -this.speedY; // Invierte la dirección vertical
        }
        // Colisiones con el jugador
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), player.getBounds())) {
            this.speedX = -this.speedX; // Cambia la dirección horizontal
            this.speedY = -this.speedY; // Cambia la dirección vertical
        }
    }
}

class Obstacle extends GameObject {
    constructor(scene, x, y) {
     super(scene, x, y, 'obstacleTexture');
    }
}

function preload() {
    this.load.image('playerTexture', 'assets/player.png');
    this.load.image('enemyTexture', 'assets/enemy.png');
    this.load.image('obstacleTexture', 'assets/obstacle.png');
}

function create() {
    this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000);
    this.player = new Player(this, 100, 300);
    this.enemy = new Enemy(this, 700, 300);
    this.obstacle = new Obstacle(this, 400, 300);


}

function update() {

    player.PlayerMovement();
    enemy.BounceSystem();

}



