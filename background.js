export default class Background {
    constructor(imgSrc) {
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 0, 0);
    }
}