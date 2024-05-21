export default class Sound {
    constructor(src) {
        this.sound = new Audio(src);
    }

    play() {
        this.sound.currentTime = 0;
        this.sound.play();
    }
}