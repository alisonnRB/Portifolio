import { Animations } from "./Animations";
import { ScrollViewer } from "./ScrollViewer";
import { IdleAnimation } from "./idleAnimation";

export class HildaController extends ScrollViewer {
    mainElement: HTMLDivElement;
    canvas: HTMLCanvasElement;
    canvasBomb: HTMLCanvasElement;

    animation!: Animations | null;
    animationBomb!: Animations | null;

    LandscapeCanvasSize: number = 0;
    PortraitCanvasSize: number = 0;
    canvasRatio: number = 0;
    bottomBomb: number = 0;

    LandscapeCanvasBombSize: number = 0;
    PortraitCanvasBombSize: number = 0;
    canvasBombRatio: number = 0;

    isPortrait: boolean = false;

    constructor({ state, currentView, toNext }: { state: (num: number) => void; currentView: string; toNext: (index: number) => void }) {
        super({ state, currentView, toNext });
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
        this.animation.loop(true, 60);
    }

    hildaBomb() {
        this.LandscapeCanvasBombSize = 75;
        this.canvasBombRatio = 1.083;
        this.PortraitCanvasBombSize = 45;

        this.sizeBomb();

        this.canvasBomb.classList.add('absolute', 'z-40', "right-[-4%]", "portrait:right-[-30%]");
        this.canvasBomb.style.bottom = `${this.bottomBomb}%`;

        this.animationBomb = new Animations(this.canvasBomb, "/resources/hilda_explosion_spriteSheet.png", 15);

        this.mainElement.appendChild(this.canvasBomb);
        this.cleanCanvas();

        this.animationBomb.loop(false, 150, () => {
            this.animationBomb?.stopAnimation();
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
        this.animation?.moveToEnd(this.canvas);
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
        this.animation.loop(false, 105);
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

    hildaMoonTransform() {
        this.hildaBomb();

        this.LandscapeCanvasSize = 100;
        this.canvasRatio = 0.9349;
        this.PortraitCanvasSize = 43;
        this.bottomBomb = 7;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-transform', 'absolute', 'z-30', 'bottom-[-35%]', "right-[5%]", "portrait:right-0", "portrait:bottom-[-25%]");
        this.animation = new Animations(this.canvas, "/resources/hilda_transform_spriteSheet.png", 33);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(false, 100, () => { this.hildaMoonIdle() });
    }

    hildaMoonUntransform() {
        this.cleanCanvas(true);

        this.LandscapeCanvasSize = 100;
        this.canvasRatio = 0.9349;
        this.PortraitCanvasSize = 43;
        this.bottomBomb = 7;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-transform', 'absolute', 'z-30', 'bottom-[-35%]', "right-[5%]", "portrait:right-0", "portrait:bottom-[-25%]");
        this.animation = new Animations(this.canvas, "/resources/hilda_Untransform_spriteSheet.png", 33);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(false, 100, () => { });
    }

    hildaMoonIdle() {
        this.cleanCanvas(true)

        this.LandscapeCanvasSize = 100;
        this.canvasRatio = 0.9349;
        this.PortraitCanvasSize = 43;
        this.bottomBomb = 7;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-transform', 'absolute', 'z-30', 'bottom-[-35%]', "right-[5%]", "portrait:right-0", "portrait:bottom-[-25%]");
        this.animation = new Animations(this.canvas, "/resources/hilda_lua_idle_spriteSheet.png", 16);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(true, 100);
    }

    hildaDie() {
        this.cleanCanvas(true)

        this.LandscapeCanvasSize = 100;
        this.canvasRatio = 0.9349;
        this.PortraitCanvasSize = 43;
        this.bottomBomb = 7;

        this.sizeHilda()

        this.canvas.classList.add('hilda-canvas-transform', 'absolute', 'z-30', 'bottom-[-35%]', "right-[5%]", "portrait:right-0", "portrait:bottom-[-25%]");
        this.animation = new Animations(this.canvas, "/resources/hilda_die_spriteSheet.png", 16);

        this.mainElement.appendChild(this.canvas);
        this.animation.loop(true, 100);
    }

    cleanCanvas(continuos: boolean = false) {
        if (this.canvas.parentElement === this.mainElement) {
            this.canvas.className = "";
            this.mainElement.removeChild(this.canvas);
        }

        try {
            this.animation?.stop();
            this.animation?.stopAnimation(continuos);
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

    destroy() {
        window.removeEventListener("resize", this.sizeWindow);

        this.animation = null;
        this.animationBomb = null;

        super.destroy();
    }
}