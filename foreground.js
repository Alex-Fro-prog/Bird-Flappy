export default class Foreground {
    constructor(imgSrc, canvasHeight) {
        this.image = new Image();
        this.image.src = imgSrc;
        this.canvasHeight = canvasHeight;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, this.canvasHeight - this.image.height);
    }
}