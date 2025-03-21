"use client";

import { useEffect } from "react";
import { StaticImageData } from "next/image";

export default function CamadaRepeat({ img, container, section, zIndex }: { img: StaticImageData; container: String; section: String; zIndex: number }) {
    useEffect(() => {
        const backgroundContainer = document.querySelector('.' + container) as HTMLDivElement | null;
        const background = document.querySelector('.' + section) as HTMLDivElement | null;

        if (!backgroundContainer || !background) return;

        const imgF = new Image();
        imgF.src = img.src;

        imgF.onload = () => {
            const imgWidth = imgF.width;

            backgroundContainer.style.width = `${imgWidth * 2}px`;
            background.style.width = `${imgWidth}px`;

            const clone = background.cloneNode(true) as HTMLDivElement;
            backgroundContainer.appendChild(clone);
        };

    }, []);

    return (
        <div className={`absolute ${container} overflow-hidden flex h-[100dvh] shrink-0`} style={{ zIndex }}>
            <div className={`${section} shrink-0`}></div>
            <div className={`${section} shrink-0`}></div>
        </div>
    )
}