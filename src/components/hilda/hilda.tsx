"use client";

import { useState, useEffect } from "react";
import HildaIntro from "./hilda_intro";
import HildaText from "./hildaText";

export default function Hilda({ currentView, changeView }: { currentView: String; changeView: (name: String) => void; }) {
    const [text1, setText1] = useState<boolean>(false);
    const [hildaIntro, setHildaIntro] = useState<boolean>(false);

    /* verifica se deve iniciar, mostra texto1 e tira depois de 2 segundos, inicia proxima animação */
    useEffect(() => {
        if (currentView !== "hilda") return;

        setText1(true);

        const timeOut = setTimeout(() => {
            setText1(false);
            setHildaIntro(true);
        }, 2000);

        return () => { clearTimeout(timeOut) };

    }, [currentView]);

    return (
        <>
            {text1 ? <HildaText title={"WHO AM I?"} text={"Keep scrolling to find out"} apair={false} /> : <></>}
            {hildaIntro ? <span><HildaText title={"A SOFTWARE ENGINEER"} text={"I'm a software engineer passionate about crafting intuitive and creative solutions. I blend clean code with thoughtful design, always striving to build seamless digital experiences."} apair={true} /></span> : <></>}
            {hildaIntro ? <HildaIntro /> : <></>}
        </>
    );
}