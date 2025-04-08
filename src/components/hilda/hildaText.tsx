"use client";

import { useEffect, useState } from "react";

export default function HildaText({ title, text, apair }: { title: String; text: String; apair: boolean; }) {
    const [animatinTitle, setAnimationTitle] = useState<boolean>(false);

    useEffect(() => {
        if (animatinTitle == true) return;

        setAnimationTitle(true);

        const timeOut = setTimeout(() => {
            setAnimationTitle(false);
        }, 2000)

        return () => { clearTimeout(timeOut) }
    }, [])

    return (
        <div className={`absolute z-50 h-[75dvh] w-[45dvw] font-luck left-[5%] top-[10%] text-white hilda-title-content portrait:left-[2%] portrait:top-[20%] portrait:w-[65dvw] ${apair ? "text-move" : ""}`}>
            <h1 className={`hilda-title ${animatinTitle ? "hilda-title-animation" : ""}`}>{title}</h1>
            <p className="opacity-75 hilda-text">{text}</p>
        </div>
    );
}