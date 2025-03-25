export class ScrollViewer {
    callbackUp: () => void;
    callbackDown: () => void;
    lastTouchY: number = 0;
    lastExecutionTime: number = 0;
    threshold: number = 40;
    debounceTime: number = 2300;

    constructor({ callbackUp, callbackDown }: { callbackUp: () => void; callbackDown: () => void; }) {
        this.callbackUp = callbackUp;
        this.callbackDown = callbackDown;

        window.addEventListener("wheel", this.handleScroll.bind(this));
        window.addEventListener("touchstart", this.handleTouchStart.bind(this));
        window.addEventListener("touchmove", this.handleTouchMove.bind(this));
        window.addEventListener("keydown", this.handleKeydown.bind(this));
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
            event.deltaY > 0 ? this.callbackDown() : this.callbackUp();
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
            currentY < this.lastTouchY ? this.callbackDown() : this.callbackUp();
            this.lastTouchY = currentY;
        }
    };

    handleKeydown = (event: KeyboardEvent) => {
        if (!this.canExecute()) return;

        if (event.key === "ArrowDown" || event.key === "PageDown") {
            this.callbackDown();
        }
        if (event.key === "ArrowUp" || event.key === "PageUp") {
            this.callbackUp();
        }
    };
}