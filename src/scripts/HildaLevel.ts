export class HildaLevel {
    level: number;
    levelSide: boolean = false;
    stateInAnimation: boolean = false;

    levelState: (num: number) => void;

    constructor({ state }: { state: (num: number) => void }) {
        this.levelState = state;
        this.level = 0;
        this.levelState(this.level)
    }

    levelUp(): void {
        if (this.stateInAnimation) return;
        this.level--;
        this.levelSide = true;
        this.levelState(this.level)

        console.log(this.level)
    }

    levelDown(): void {
        if (this.stateInAnimation) return;
        this.level++;
        this.levelSide = false;
        this.levelState(this.level)

        console.log(this.level)
    }

    setInAnimation(value: boolean) {
        this.stateInAnimation = value;
    }
}