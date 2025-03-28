import { Animations } from "./Animations";
import { ScrollViewer } from "./ScrollViewer";
import { IdleAnimation } from "./idleAnimation";

export class HildaController extends ScrollViewer {
    mainElement: HTMLDivElement;
    canvas: HTMLCanvasElement;
    canvasBomb: HTMLCanvasElement;

    animation!: Animations;
    animationBomb!: Animations;

    LandscapeCanvasSize: number = 0;
    PortraitCanvasSize: number = 0;
    canvasRatio: number = 0;
    bottomBomb: number = 0;

    LandscapeCanvasBombSize: number = 0;
    PortraitCanvasBombSize: number = 0;
    canvasBombRatio: number = 0;

    isPortrait: boolean = false;

    constructor({ state }: { state: (num: number) => void }) {
        super({ state });
        const element = document.querySelector(".background-hilda");
        this.mainElement = element as HTMLDivElement;
        this.canvas = document.createElement('canvas');
        this.canvasBomb = document.createElement('canvas');

        this.sizeWindow()
    }

    hildaApair() {
        this.cleanCanvas();

        this.LandscapeCanvasSize = 45;
        this.canvasRatio = 0.804;
        this.PortraitCanvasSize = 23;
        this.bottomBomb = 7;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-intro', 'absolute', 'z-30', 'bottom-[20%]', "right-[5%]", "portrait:right-0");
        this.animation = new Animations(this.canvas, "/resources/hilda_intro_spriteSheet.png", 16);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(true, 100);
    }

    hildaBomb() {
        this.LandscapeCanvasBombSize = 75;
        this.canvasBombRatio = 1.083;
        this.PortraitCanvasBombSize = 45;

        this.sizeBomb();

        this.canvasBomb.classList.add('absolute', 'z-40', "right-[-4%]", "portrait:right-[-30%]");
        this.canvasBomb.style.bottom = `${this.bottomBomb}%`;

        this.animationBomb = new Animations(this.canvasBomb, "/resources/hilda_explosion_spriteSheet.png", 15);

        this.cleanCanvas();
        this.mainElement.appendChild(this.canvasBomb);

        this.animationBomb.loop(false, 150, () => {
            this.animationBomb.stopAnimation();
            this.cleanCanvasBomb();
        });
    }

    hildaIdle() {
        this.hildaBomb();
        this.LandscapeCanvasSize = 40;
        this.canvasRatio = 0.911;
        this.PortraitCanvasSize = 18;
        this.bottomBomb = 40;

        this.sizeHilda()

        this.canvas.classList.add('absolute', 'z-30', 'bottom-[20%]', "right-[5%]", "portrait:right-0");
        this.animation = new Animations(this.canvas, "/resources/hilda_idle_spriteSheet.png", 21);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(true, 100);
        this.animation.idle();
    }

    moveToClose() {
        this.animation.moveToEnd(this.canvas);
    }

    hildaClose() {
        this.hildaBomb();
        this.LandscapeCanvasSize = 45;
        this.canvasRatio = 2.03;
        this.PortraitCanvasSize = 23;
        this.bottomBomb = 40;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-close', 'absolute', 'z-30', 'bottom-[56%]', "right-[5%]", "portrait:right-0");
        this.animation = new Animations(this.canvas, "/resources/hilda_close_spriteSheet.png", 27);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(false, 100);
    }

    hildaGeminiIdle() {
        this.hildaBomb();

        this.LandscapeCanvasSize = 50;
        this.canvasRatio = 0.97;
        this.PortraitCanvasSize = 23;
        this.bottomBomb = 40;

        this.sizeHilda()

        this.canvas.classList.add('absolute', 'z-30', 'bottom-[20%]', "right-[5%]", "portrait:right-0");
        this.animation = new Animations(this.canvas, "/resources/hilda_gemini_spriteSheet.png", 13);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(true, 100);
        this.animation.idle();
    }

    cleanCanvas() {
        if (this.canvas.parentElement === this.mainElement) {
            this.canvas.className = "";
            this.mainElement.removeChild(this.canvas);
        }

        try {
            this.animation.stop();
            this.animation.stopAnimation();
        } catch (e) {
        }
    }

    private cleanCanvasBomb() {
        if (this.canvasBomb.parentElement === this.mainElement) {
            this.mainElement.removeChild(this.canvasBomb);
        }
    }

    private sizeHilda() {
        if (!this.isPortrait) {
            this.canvas.style.height = this.LandscapeCanvasSize + "dvh";
            this.canvas.style.width = "calc(" + this.LandscapeCanvasSize + "dvh * " + this.canvasRatio + ")";
        } else {
            this.canvas.style.height = this.PortraitCanvasSize + "dvh";
            this.canvas.style.width = "calc(" + this.PortraitCanvasSize + "dvh * " + this.canvasRatio + ")"
        }
    }

    private sizeBomb() {
        if (!this.isPortrait) {
            this.canvasBomb.style.height = this.LandscapeCanvasBombSize + "dvh";
            this.canvasBomb.style.width = "calc(" + this.LandscapeCanvasBombSize + "dvh * " + this.canvasBombRatio + ")";
        } else {
            this.canvasBomb.style.height = this.PortraitCanvasBombSize + "dvh";
            this.canvasBomb.style.width = "calc(" + this.PortraitCanvasBombSize + "dvh * " + this.canvasBombRatio + ")"
        }
    }

    private sizeWindow() {
        if (typeof window !== "undefined") {
            this.isPortrait = (window.innerHeight > window.innerWidth);

            const handleResize = () => {
                this.isPortrait = (window.innerHeight > window.innerWidth);
                this.sizeHilda();
                this.sizeBomb();
            };

            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }
}