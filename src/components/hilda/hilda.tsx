"use client";

import { useState, useEffect } from "react";
import { ScrollViewer } from "@/scripts/ScrollViewer";

import HildaIntro from "./hilda_intro";
import HildaText from "./hildaText";
import HildaExplosion from "./hilda_explosion";
import HildaLoop from "./hilda_idle";
import HildaClose from "./hilda_close";
import HildaGemini from "./hilda_gemini";

import Level from "./level";

export default function Hilda({ currentView, changeView }: { currentView: String; changeView: (name: String) => void; }) {
    const [viewerController, setViewerController] = useState<boolean>(false);
    const [inAnimation, setInAnimation] = useState<boolean>(false);

    const [hildaIntro, setHildaIntro] = useState<boolean>(false);
    const [hildaLoop, setHildaLoop] = useState<boolean>(false);
    const [hildaClose, setHildaClose] = useState<boolean>(false);

    const [geminiLoop, setGeminiLoop] = useState<boolean>(false);

    const [HildaExplosionIntro, setHildaExplosionIntro] = useState<boolean>(false);
    const [HildaExplosionClose, setHildaExplosionClose] = useState<boolean>(false);

    const [level, setLevel] = useState<number>(0);

    const levelUp = (): void => {
        if (inAnimation) return;
        setLevel((prevState) => prevState + 1);
        console.log(level)
    };

    const levelDown = (): void => {
        if (inAnimation) return;
        setLevel((prevState) => prevState - 1);
        console.log(level)
    }

    /* seta o scrollerViewer */
    useEffect(() => {
        if (viewerController) return;

        new ScrollViewer({
            callbackUp: levelDown,
            callbackDown: levelUp,
        });

        setViewerController(true)
    }, [])

    console.log(level)

    /* verifica se deve iniciar, mostra texto1 */
    useEffect(() => {
        if (currentView !== "hilda" && level !== 0) return;

        setInAnimation(true);

        const timeOut = setTimeout(() => {
            setInAnimation(false)
        }, 2000);

        return () => { clearTimeout(timeOut) };

    }, [currentView]);

    useEffect(() => {
        switch (level) {
            case 1:
                setHildaIntro(true);
                return

            case 2:
                setHildaClose(true);
                return

            case 3:
                const TimeOut = (setTimeout(() => {
                    if (level != 3) return;
                    setLevel((prevState) => prevState + 1);
                }, 3000))

                return () => { clearTimeout(TimeOut) }

            case 4:
                setHildaIntro(true)
                return
        }
    }, [level])

    /* verifica o fim o init, inica o idle da hilda dps 2.1s, seta como sem animação */
    useEffect(() => {
        if (!hildaIntro) return;

        setInAnimation(true);
        setHildaExplosionIntro(true)
        setHildaExplosionClose(false)

        const timeOut = setTimeout(() => {
            setHildaIntro(false);
            if (level <= 3) {
                setHildaLoop(true);
            } else if (level <= 6) {
                setGeminiLoop(true);
            }

            setInAnimation(false);
        }, 2100)

        return () => { clearInterval(timeOut) }
    }, [hildaIntro])

    useEffect(() => {
        if (!hildaClose) return;

        setHildaExplosionIntro(false)
        setHildaExplosionClose(true);

        const timeOut = setTimeout(() => {
            setLevel((prevState) => prevState + 1);
            setHildaLoop(false);
        }, 1600);

        return () => { clearTimeout(timeOut) }

    }, [hildaClose])

    return (
        <>
            {/* Level 0 */}

            {level == 0 ? <HildaText title={"WHO AM I?"} text={"Keep scrolling to find out"} apair={false} /> : <></>}

            {/* Level 1*/}

            {level > 0 && level <= 3 ? <div className={`${HildaExplosionClose ? "text-close" : ""}`}><HildaText title={"A SOFTWARE ENGINEER"} text={"I'm a software engineer passionate about crafting intuitive and creative solutions. I blend clean code with thoughtful design, always striving to build seamless digital experiences."} apair={true} /></div> : <></>}
            {hildaIntro ? <HildaIntro /> : <></>}
            {HildaExplosionIntro ? <HildaExplosion ms={2000} bottom={7} key={1} /> : <></>}
            {hildaLoop ? <HildaLoop close={hildaClose} /> : <></>}

            {/* Transition */}
            {level == 3 ? <HildaClose /> : <></>}
            {HildaExplosionClose ? <HildaExplosion ms={1500} bottom={40} key={2} /> : <></>}

            {/* Level 2 */}
            {level > 3 && level <= 6 ? <div className={`${HildaExplosionClose ? "text-close" : ""}`}><HildaText title={"A CREATIVE COFFEE LOVER"} text={"Fueled by coffee and creativity, I craft playful yet polished digital experiences. Just like in a good game, every pixel and line of code has a purpose — and a bit of magic."} apair={true} /></div> : <></>}
            {geminiLoop ? <HildaGemini close={hildaClose} /> : <></>}

            {<Level level={1} />}
        </>
    );
}