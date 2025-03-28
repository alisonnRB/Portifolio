"use client";

import { useState, useEffect, useRef } from "react";
import { HildaController } from "@/scripts/HildaController";

import HildaIntro from "./hilda_intro";
import HildaText from "./hildaText";
import HildaExplosion from "./hilda_explosion";
import HildaLoop from "./hilda_idle";
import HildaClose from "./hilda_close";
import HildaGemini from "./hilda_gemini";

import Level from "./level";

export default function Hilda({ currentView, changeView }: { currentView: String; changeView: (name: String) => void; }) {
    const hilda = useRef<HildaController | null>(null);
    const [level, setLevel] = useState<number | null>(null);

    const [text1, setText1] = useState<boolean>(false);
    const [text2, setText2] = useState<boolean>(false);
    const [text3, setText3] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
        if (hilda.current instanceof HildaController) return;
        hilda.current = new HildaController({ state: setLevel });
    }, [hilda.current]);

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function playAnimationSequence() {
        if (!hilda.current) return;

        const side = hilda.current.levelSide;
        hilda.current.setInAnimation(true);

        switch (level) {
            case 0:
                if (side) {
                    hilda.current.moveToClose();
                    await delay(1500);
                    hilda.current.hildaClose();
                    setClose(true);

                    await delay(4500);
                    setText2(false);
                    setClose(false);
                    setText1(true);
                } else {
                    setText1(true);
                    hilda.current.setInAnimation(false);
                }
                break;

            case 1:
                if (side) {
                    hilda.current.moveToClose();
                    await delay(1500);
                    hilda.current.hildaClose();
                    setClose(true);

                    await delay(4500);
                    hilda.current.hildaApair();
                    setText3(false);
                    setClose(false);
                    setText2(true);

                    await delay(2000);
                    hilda.current.hildaIdle();
                } else {
                    hilda.current.hildaApair();
                    setText1(false);
                    setText2(true);
                    setClose(false);

                    await delay(2000);
                    hilda.current.hildaIdle();
                }
                break;

            case 2:
                if (!side) {
                    hilda.current.moveToClose();
                    await delay(1500);
                    hilda.current.hildaClose();
                    setClose(true);

                    await delay(4500);
                    hilda.current.hildaApair();
                    setText2(false);
                    setClose(false);
                    setText3(true);

                    await delay(2000);
                    hilda.current.hildaGeminiIdle();
                }
                break;
        }

        hilda.current.setInAnimation(false);
    }

    useEffect(() => {
        if (hilda.current?.stateInAnimation) return;

        playAnimationSequence();

        return () => {
            hilda.current?.setInAnimation(false);
        };
    }, [level]);

    // const [viewerController, setViewerController] = useState<boolean>(false);
    // const [inAnimation, setInAnimation] = useState<boolean>(false);
    // const [initText, setInitText] = useState<boolean>(false);

    // const [hildaIntro, setHildaIntro] = useState<boolean>(false);
    // const [hildaLoop, setHildaLoop] = useState<boolean>(false);
    // const [hildaClose, setHildaClose] = useState<boolean>(false);

    // const [geminiLoop, setGeminiLoop] = useState<boolean>(false);
    // const [geminiClose, setGeminiClose] = useState<boolean>(false);

    // const [HildaExplosionIntro, setHildaExplosionIntro] = useState<boolean>(false);
    // const [HildaExplosionClose, setHildaExplosionClose] = useState<boolean>(false);

    // const [level, setLevel] = useState<number>(0);
    // const [levelSide, setLevelSide] = useState<boolean>(false); /* false = descendo */


    /* seta o scrollerViewer */
    // useEffect(() => {
    //     if (viewerController) return;

    //     new ScrollViewer({
    //         callbackUp: levelDown,
    //         callbackDown: levelUp,
    //     });

    //     setViewerController(true)
    // }, [])

    // console.log(level)

    /* verifica se deve iniciar, mostra texto1 */
    // useEffect(() => {
    //     if (currentView !== "hilda" && level !== 0) return;

    //     setInAnimation(true);

    //     const timeOut = setTimeout(() => {
    //         setInAnimation(false)
    //     }, 2000);

    //     return () => { clearTimeout(timeOut) };

    // }, [currentView]);

    // useEffect(() => {
    //     if (!levelSide && level < 0) {
    //         changeView("dragon_idle")
    //         return
    //     }

    //     switch (level) {
    //         case 0:
    //             setInitText(true);
    //             return

    //         case 1:
    //             setHildaIntro(true);
    //             return

    //         case 2:
    //             setHildaClose(true);
    //             return

    //         case 3:
    //             const TimeOut = (setTimeout(() => {
    //                 if (level != 3) return;
    //                 setLevel((prevState) => prevState + 1);
    //             }, 3000))

    //             return () => { clearTimeout(TimeOut) }

    //         case 4:
    //             setHildaIntro(true)
    //             return
    //     }
    // }, [level])

    /* verifica o fim o init, inica o idle da hilda dps 2.1s, seta como sem animação */
    // useEffect(() => {
    //     if (!hildaIntro) return;

    //     if (levelSide) {

    //         setInAnimation(true);
    //         setHildaExplosionIntro(true)
    //         setHildaExplosionClose(false)

    //         const timeOut = setTimeout(() => {
    //             setHildaIntro(false);
    //             if (level <= 3) {
    //                 setHildaLoop(true);
    //             } else if (level <= 6) {
    //                 setGeminiLoop(true);
    //             }

    //             setInAnimation(false);
    //         }, 2100)

    //         return () => { clearInterval(timeOut) }

    //     }

    // }, [hildaIntro])

    // useEffect(() => {
    //     if (!hildaClose) return;

    //     setHildaExplosionIntro(false)
    //     setHildaExplosionClose(true);

    //     const timeOut = setTimeout(() => {
    //         setLevel((prevState) => prevState + 1);
    //         setHildaLoop(false);
    //     }, 1600);

    //     return () => { clearTimeout(timeOut) }

    // }, [hildaClose])

    return (
        <>
            {/* Level 0 */}

            {text1 ? <HildaText title={"WHO AM I?"} text={"Keep scrolling to find out"} apair={false} /> : <></>}

            {/* Level 1*/}

            {text2 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"A SOFTWARE ENGINEER"} text={"I'm a software engineer passionate about crafting intuitive and creative solutions. I blend clean code with thoughtful design, always striving to build seamless digital experiences."} apair={true} /></div> : <></>}

            {/* {hildaIntro ? <HildaIntro /> : <></>}
            {HildaExplosionIntro ? <HildaExplosion ms={2000} bottom={7} key={1} /> : <></>}
            {hildaLoop ? <HildaLoop close={hildaClose} /> : <></>} */}

            {/* Transition */}
            {/* {level == 3 ? <HildaClose /> : <></>}
            {HildaExplosionClose ? <HildaExplosion ms={1500} bottom={40} key={2} /> : <></>} */}

            {/* Level 2 */}
            {text3 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"A CREATIVE COFFEE LOVER"} text={"Fueled by coffee and creativity, I craft playful yet polished digital experiences. Just like in a good game, every pixel and line of code has a purpose — and a bit of magic."} apair={true} /></div> : <></>}

            {<Level level={1} />}
        </>
    );
}