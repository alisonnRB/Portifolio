import { HildaLevel } from "./HildaLevel";

export class ScrollViewer extends HildaLevel {
    lastTouchY: number = 0;
    lastExecutionTime: number = 0;
    threshold: number = 40;
    debounceTime: number = 2000;

    constructor({ state, currentView, toNext }: { state: (num: number) => void; currentView: string; toNext: (index: number) => void; }) {
        super({ state, currentView, toNext, })

        window.addEventListener("wheel", this.handleScroll.bind(this));
        window.addEventListener("touchstart", this.handleTouchStart.bind(this));
        window.addEventListener("touchmove", this.handleTouchMove.bind(this));
        window.addEventListener("keydown", this.handleKeydown.bind(this));

        this.canExecute();
    }

    private canExecute() {
        const now = Date.now();
        if (now - this.lastExecutionTime >= this.debounceTime) {
            this.lastExecutionTime = now;
            return true;
        }
        return false;
    }

    handleScroll = (event: WheelEvent) => {
        if (!this.canExecute()) return;

        if (Math.abs(event.deltaY) >= this.threshold) {
            event.deltaY > 0 ? this.levelDown() : this.levelUp();
        }
    };

    handleTouchStart = (event: TouchEvent) => {
        this.lastTouchY = event.touches[0].clientY;
    };

    handleTouchMove = (event: TouchEvent) => {
        if (!this.canExecute()) return;

        const currentY = event.touches[0].clientY;
        const delta = Math.abs(currentY - this.lastTouchY);

        if (delta >= this.threshold) {
            currentY < this.lastTouchY ? this.levelDown() : this.levelUp();
            this.lastTouchY = currentY;
        }
    };

    handleKeydown = (event: KeyboardEvent) => {
        if (!this.canExecute()) return;

        if (event.key === "ArrowDown" || event.key === "PageDown") {
            this.levelDown();
        }
        if (event.key === "ArrowUp" || event.key === "PageUp") {
            this.levelUp();
        }
    };

    destroy() {
        window.removeEventListener("wheel", this.handleScroll);
        window.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("touchmove", this.handleTouchMove);
        window.removeEventListener("keydown", this.handleKeydown);

        super.destroy()
    }
}