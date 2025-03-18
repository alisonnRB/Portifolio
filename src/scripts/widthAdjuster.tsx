export function widthAdjuster(selector: string, image: { src: string }) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        const img = new Image();
        img.src = image.src;

        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            (element as HTMLDivElement).style.width = `${imgWidth}px`;
            (element as HTMLDivElement).style.height = `${imgHeight}px`;
        };
    });
}
