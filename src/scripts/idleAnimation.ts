export class IdleAnimation {
    private position: number = 0;
    private direction: number = 1;
    private velocity: number = 0.5;
    private animationFrame: number | null = null;
    private isMovingToEnd: boolean = false;

    startAnimation(canvas: HTMLCanvasElement) {

        const animate = () => {
            if (this.isMovingToEnd) return;

            if (this.position <= -35) this.direction = 1;
            if (this.position >= 0) this.direction = -1;

            this.position += this.direction * this.velocity;
            this.updateTransform(canvas);

            this.animationFrame = requestAnimationFrame(animate);
        };

        this.animationFrame = requestAnimationFrame(animate);
    }

    private updateTransform(canvas: HTMLCanvasElement) {
        canvas.style.transform = `translateY(${this.position}dvh)`;
    }

    public moveToEnd(canvas: HTMLCanvasElement) {
        if (this.isMovingToEnd) return;
        this.isMovingToEnd = true;

        const startPos = this.position;
        const endPos = -35;
        let progress = 0;

        const moveTo = () => {
            if (progress >= 1) return;
            progress += 0.02;
            this.position = startPos + (endPos - startPos) * progress;
            this.updateTransform(canvas);
            requestAnimationFrame(moveTo);
        };

        moveTo();
    }

    public stop() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
            this.position = 0
        }
    }
}
