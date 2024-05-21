export default class Pipe {
    constructor(imageSrcTop, imageSrcBottom, canvasWidth, speed, ctx, canvas) {
        this.imageTop = new Image();
        this.imageTop.src = imageSrcTop;
        
        this.imageBottom = new Image();
        this.imageBottom.src = imageSrcBottom;
        
        this.canvasWidth = canvasWidth;
        this.speed = speed;
        this.ctx = ctx;
        this.canvas = canvas;
        this.gap = 120;
        this.pipeWidth = 68;

        this.pipes = [{
            x: this.canvasWidth,
            y: 0,
        }];
    }

    draw() {
        for (let i = 0; i < this.pipes.length; i++) {
            this.ctx.drawImage(
                this.imageTop,
                this.pipes[i].x,
                this.pipes[i].y,
                this.pipeWidth,
                this.imageTop.height
            );

            this.ctx.drawImage(
                this.imageBottom,
                this.pipes[i].x, 
                this.pipes[i].y + this.imageTop.height + this.gap,
                this.pipeWidth,
                this.imageBottom.height
            );

            this.pipes[i].x -= this.speed;

            if (this.pipes[i].x == 125) {
                this.pipes.push({
                    x: this.canvas.width + 45,
                    y: Math.floor(Math.random() * this.imageTop.height) - this.imageTop.height,
                });
            }

            if (this.pipes[i].x + this.pipeWidth <= 0) {
                this.pipes.shift();
            }
        }
    }

    update() {
        
    }
}