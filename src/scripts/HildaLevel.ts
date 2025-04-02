export class HildaLevel {
    level: number;
    levelSide: boolean = false;
    stateInAnimation: boolean = false;
    currentView: string;

    levelState: (num: number) => void;
    toNext: (index: number) => void;

    constructor({ state, currentView, toNext }: { state: (num: number) => void; currentView: string; toNext: (index: number) => void }) {
        this.levelState = state;
        this.level = 0;
        this.levelState(this.level)
        this.currentView = currentView;
        this.toNext = toNext;
    }

    levelUp(): void {
        if (this.stateInAnimation || this.currentView != "hilda") return;

        if (this.currentView == "hilda" && this.level == 0) {
            this.toNext(-1);
            this.currentView = "dragon";
            return
        }

        this.level--;
        this.levelSide = true;
        this.levelState(this.level)

        console.log(this.level)
    }

    levelDown(): void {
        if (this.stateInAnimation || this.currentView != "hilda") return;

        if (this.currentView == "hilda" && this.level == 4) {
            return
        }

        this.level++;
        this.levelSide = false;
        this.levelState(this.level)

        console.log(this.level)
    }

    updateCurrentView(currentView: string): void {
        this.currentView = currentView;
    }

    setInAnimation(value: boolean) {
        this.stateInAnimation = value;
    }

    destroy() {
        this.levelState = () => { };
        this.toNext = () => { };
    }
}