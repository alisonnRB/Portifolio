"use client";
import { useEffect } from "react";
import fundo from './source/fundo.png';

export default function Background() {
    useEffect(() => {
        const backgroundContainer = document.querySelector('.background-container') as HTMLDivElement | null;
        const background = document.querySelector('.background') as HTMLDivElement | null;

        if (!backgroundContainer || !background) return;

        // Configura o fundo (background)
        const imgF = new Image();
        imgF.src = fundo.src;

        imgF.onload = () => {
            const imgWidth = imgF.width;

            backgroundContainer.style.width = `${imgWidth * 2}px`;
            background.style.width = `${imgWidth}px`;

            const clone = background.cloneNode(true) as HTMLDivElement;
            backgroundContainer.appendChild(clone);
        };

    }, []);
    return (
        <div className='absolute background-container overflow-hidden z-10'>
            <div className="background"></div>
            <div className="background"></div>
        </div>
    )
}