import { IdleAnimation } from "./idleAnimation";

export class Animations extends IdleAnimation {
    positionX: number;
    positionY: number;

    canvas: HTMLCanvasElement;
    spriteSheet: HTMLImageElement;
    context: CanvasRenderingContext2D | null;

    widthImage: number = 0;
    heightImage: number = 0;

    spriteNumber: number = 0;
    widthSprite: number = 0;

    currentSprite: number = 0;

    offsetX: number = 0;
    offsetY: number = 0;

    animationInterval: NodeJS.Timeout | null = null;

    constructor(canvasReference: HTMLCanvasElement, src: string, spriteNumber: number) {
        super()
        this.positionX = 0;
        this.positionY = 0;
        this.canvas = canvasReference;

        this.context = this.canvas.getContext('2d') || null;

        this.spriteSheet = new Image();
        this.spriteSheet.src = src;

        this.spriteSheet.onload = () => {
            this.widthImage = this.spriteSheet.width;
            this.heightImage = this.spriteSheet.height;
            this.spriteNumber = spriteNumber;
            this.widthSprite = this.widthImage / this.spriteNumber;

            this.canvasForm();
            this.draw();
        };
    }

    canvasForm() {
        if (!this.canvas || !this.context) return;

        const canvasWidth = this.canvas.clientWidth;
        const canvasHeight = this.canvas.clientHeight;

        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        const canvasAspect = canvasWidth / canvasHeight;
        const spriteAspect = this.widthSprite / this.heightImage;

        let newWidth = canvasWidth;
        let newHeight = newWidth / spriteAspect;

        if (newHeight < canvasHeight) {
            newHeight = canvasHeight;
            newWidth = newHeight * spriteAspect;
        }

        this.offsetX = (canvasWidth - newWidth) / 2;
        this.offsetY = (canvasHeight - newHeight) / 2;
    }

    draw() {
        if (!this.context || !this.spriteSheet.complete) return;

        this.context.clearRect(0, 0, this.canvas.width || 0, this.canvas.height || 0);
        this.context.drawImage(
            this.spriteSheet,
            this.widthSprite * this.currentSprite, 0, this.widthSprite, this.heightImage,
            this.offsetX, this.offsetY, this.canvas.width || 0, this.canvas.height || 0
        );
    }

    loop(loop: boolean, rate: number, onComplete?: () => void): boolean | void {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }

        this.animationInterval = setInterval(() => {
            this.currentSprite++;
            if (loop && this.currentSprite >= this.spriteNumber) {
                this.currentSprite = 0;
            } else if (!loop && this.currentSprite >= this.spriteNumber) {
                if (onComplete) onComplete()
                return
            }

            this.draw();
        }, rate);
    }

    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    idle() {
        this.startAnimation(this.canvas)
    }
}
