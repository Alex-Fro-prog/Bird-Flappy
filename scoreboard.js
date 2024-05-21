export default class Scoreboard {
    constructor(imgSrc) {
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 71, 420);
    }
}