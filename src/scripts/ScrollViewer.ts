import { HildaLevel } from "./HildaLevel";

export class ScrollViewer extends HildaLevel {
    private lastTouchY: number = 0;
    private touchStartY: number = 0;
    private lastExecutionTime: number = 0;
    private threshold: number = 50;
    private debounceTime: number = 1000;
    private isTouchActive: boolean = false;

    constructor({ state, currentView, toNext }: { state: (num: number) => void; currentView: string; toNext: (index: number) => void; }) {
        super({ state, currentView, toNext });

        window.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: false });
        window.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: false });
        window.addEventListener("touchend", this.handleTouchEnd.bind(this));
        window.addEventListener("wheel", this.handleScroll.bind(this));
        window.addEventListener("keydown", this.handleKeydown.bind(this));
    }

    private canExecute(): boolean {
        const now = Date.now();
        return now - this.lastExecutionTime >= this.debounceTime;
    }

    private handleTouchStart = (event: TouchEvent) => {
        this.isTouchActive = true;
        this.touchStartY = event.touches[0].clientY;
        this.lastTouchY = this.touchStartY;
    };

    private handleTouchMove = (event: TouchEvent) => {
        if (!this.isTouchActive || !this.canExecute()) return;

        event.preventDefault();
        const currentY = event.touches[0].clientY;
        const deltaY = currentY - this.touchStartY;

        if (Math.abs(deltaY) >= this.threshold) {
            this.lastExecutionTime = Date.now();
            deltaY > 0 ? this.levelUp() : this.levelDown();
            this.isTouchActive = false;
        }

        this.lastTouchY = currentY;
    };

    private handleTouchEnd = () => {
        this.isTouchActive = false;
    };

    handleScroll = (event: WheelEvent) => {
        if (!this.canExecute()) return;

        if (Math.abs(event.deltaY) >= this.threshold) {
            event.deltaY > 0 ? this.levelDown() : this.levelUp();
            this.lastExecutionTime = Date.now();
        }
    };

    handleKeydown = (event: KeyboardEvent) => {
        if (!this.canExecute()) return;

        if (event.key === "ArrowDown" || event.key === "PageDown") {
            this.levelDown();
            this.lastExecutionTime = Date.now();
        }
        if (event.key === "ArrowUp" || event.key === "PageUp") {
            this.levelUp();
            this.lastExecutionTime = Date.now();
        }
    };

    destroy() {
        window.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("touchmove", this.handleTouchMove);
        window.removeEventListener("touchend", this.handleTouchEnd);
        window.removeEventListener("wheel", this.handleScroll);
        window.removeEventListener("keydown", this.handleKeydown);

        super.destroy();
    }
}