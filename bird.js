export default class Bird {
    constructor(x, y, imgSrc) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imgSrc;
        this.frameIndex = 0;
        this.frames = [
            { sx: 0, sy: 0, sWidth: 34, sHeight: 24 },
            { sx: 0, sy: 24, sWidth: 34, sHeight: 24 },
            { sx: 0, sy: 48, sWidth: 34, sHeight: 24 }
        ];

        this.width = this.frames[0].sWidth;
        this.height = this.frames[0].sHeight;
        
        this.frameInterval = 200;
        this.lastFrameChange = Date.now();
        this.velocity = 0;
        this.gravity = 0.4;
        this.lift = -7;
        this.rotation = 0;
    }

    draw(ctx) {
        const currentFrame = this.frames[this.frameIndex];
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            this.image,
            currentFrame.sx, currentFrame.sy, currentFrame.sWidth, currentFrame.sHeight,
            -this.width / 2, -this.height / 2, this.width, this.height
        );
        ctx.restore();

        if (Date.now() - this.lastFrameChange > this.frameInterval) {
            this.frameIndex = (this.frameIndex + 1) % this.frames.length;
            this.lastFrameChange = Date.now();
        }
    }

    flap() {
        this.velocity = this.lift;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.velocity < 0) {
            this.rotation = Math.max(-0.25, this.velocity / 10);
        } else {
            this.rotation = Math.min(0.25, this.velocity / 10);
        }
    }
}