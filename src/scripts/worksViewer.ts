import { HildaLevel } from "./HildaLevel";

export class WorksScrollViewer {
    lastTouchY: number = 0;
    lastExecutionTime: number = 0;
    threshold: number = 40;
    debounceTime: number = 2000;
    index: number;
    toNext: (index: number) => void;

    constructor({ toNext, section, index }: { toNext: (index: number) => void; section: HTMLElement; index: number }) {

        this.index = index;
        this.toNext = toNext;

        section.addEventListener("wheel", this.handleScroll.bind(this));
        section.addEventListener("touchstart", this.handleTouchStart.bind(this));
        section.addEventListener("touchmove", this.handleTouchMove.bind(this));
        section.addEventListener("keydown", this.handleKeydown.bind(this));

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
            event.deltaY > 0 ? this.toNext(this.index) : this.toNext(this.index - 2);
            this.destroy()

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
            currentY < this.lastTouchY ? this.toNext(this.index) : this.toNext(this.index - 2);
            this.lastTouchY = currentY;

            this.destroy()

        }
    };

    handleKeydown = (event: KeyboardEvent) => {
        if (!this.canExecute()) return;

        if (event.key === "ArrowDown" || event.key === "PageDown") {
            this.toNext(this.index);
        }
        if (event.key === "ArrowUp" || event.key === "PageUp") {
            this.toNext(this.index - 2);
        }

        this.destroy()

    };

    destroy() {
        window.removeEventListener("wheel", this.handleScroll);
        window.removeEventListener("touchstart", this.handleTouchStart);
        window.removeEventListener("touchmove", this.handleTouchMove);
        window.removeEventListener("keydown", this.handleKeydown);
    }
}