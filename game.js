import Background from "./background.js";
import Pipe from "./pipe.js";
import Foreground from "./foreground.js";
import Bird from "./bird.js";
import Scoreboard from "./scoreboard.js";
import Sound from "./sound.js";

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.background = new Background("./img/background.png");
        this.backgroundX = 0;
        this.pipeGap = 120;
        this.pipeSpeed = 1;
        this.pipes = [];
        const pipeTopImgSrc = "./img/pipeTop.png";
        const pipeBottomImgSrc = "./img/pipeBottom.png";
        this.pipes.push(new Pipe(pipeTopImgSrc, pipeBottomImgSrc, this.canvasWidth, this.pipeSpeed, this.ctx, this.canvas));
        this.foreground = new Foreground("./img/foreground.png", this.canvasHeight);
        this.bird = new Bird(10, 150, "./img/birdAnim.png");
        this.scoreboard = new Scoreboard("./img/scoreboard.png");
        this.gravity = 2.5;
        this.score = 0;
        this.bestScore = localStorage.getItem("bestScore") || 0;
        this.gameOver = false;

        this.flapSound = new Sound("./sounds/Flap.mp3");
        this.hitSound = new Sound("./sounds/Hit.mp3");
        this.pointSound = new Sound("./sounds/Point.mp3");

        document.addEventListener("click", () => this.handleInput());
        document.addEventListener("keydown", () => this.handleInput());

        this.startButton = document.getElementById('startButton');
        this.restartButton = document.getElementById('restartButton');
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.restart());
    }

    handleInput() {
        this.bird.flap();
        this.flapSound.play();
    }

    draw() {
        this.ctx.drawImage(this.background.image, this.backgroundX, 0);
        this.ctx.drawImage(this.background.image, this.backgroundX + this.background.image.width, 0);
        this.backgroundX -= 1;
        if (this.backgroundX <= -this.background.image.width) {
            this.backgroundX = 0;
        }

        this.pipes.forEach(pipe => {
            pipe.draw();
            pipe.update();
        });
        this.foreground.draw(this.ctx);

        this.bird.draw(this.ctx);
        this.scoreboard.draw(this.ctx);

        this.ctx.fillStyle = "#000";
        this.ctx.font = "24px Verdana";
        this.ctx.fillText("" + this.score, 108, this.canvasHeight - 40);
        this.ctx.fillText("" + this.bestScore, 160, this.canvasHeight - 40);
    }

    update() {
        if (!this.gameOver) {
            this.bird.update(this.gravity);
            if (this.bird.y < 0) {
                this.bird.y = 0;
            }
            for(let i = 0; i < this.pipes.length; i++) {
                const pipe = this.pipes[i];
                if ((this.bird.x + this.bird.width >= pipe.pipes[0].x &&
                this.bird.x <= pipe.pipes[0].x + pipe.pipeWidth &&
                this.bird.y <= pipe.pipes[0].y + pipe.imageTop.height) || 

                (this.bird.x + this.bird.width >= pipe.pipes[0].x &&
                this.bird.x <= pipe.pipes[0].x + pipe.pipeWidth &&
                this.bird.y + this.bird.height >= pipe.pipes[0].y + pipe.imageTop.height + this.pipeGap) || 

                (this.bird.y + this.bird.height >= this.canvasHeight - this.foreground.image.height)) {
                    this.gameOver = true;
                    this.hitSound.play();
                    this.showRestartButton();
                }

                if (pipe.pipes[0].x === -50) {
                    this.score++;
                    this.pointSound.play();
                }

                if (this.score > this.bestScore) {
                    this.bestScore = this.score;
                    localStorage.setItem("bestScore", this.bestScore);
                }
            }
        }
    }

    showRestartButton() {
        this.restartButton.style.display = 'block';
    }

    hideRestartButton() {
        this.restartButton.style.display = 'none';
    }

    showStartButton() {
        this.startButton.style.display = 'block';
    }

    hideStartButton() {
        this.startButton.style.display = 'none';
    }

    startGame() {
        this.hideStartButton();
        this.run();
    }

    restart() {
        this.hideRestartButton();
        this.bird = new Bird(10, 150, "./img/birdAnim.png");
        this.pipes = [];
        const pipeTopImgSrc = "./img/pipeTop.png";
        const pipeBottomImgSrc = "./img/pipeBottom.png";
        this.pipes.push(new Pipe(pipeTopImgSrc, pipeBottomImgSrc, this.canvasWidth, this.pipeSpeed, this.ctx, this.canvas));
        this.score = 0;
        this.gameOver = false;
        this.run();
    }

    run() {
        if (!this.gameOver) {
            this.draw();
            this.update();
            requestAnimationFrame(() => this.run());
        }
    }
}

const game = new Game("canvas");
game.showStartButton();
