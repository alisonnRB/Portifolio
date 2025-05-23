"use client";

import { useState, useEffect, useRef } from "react";
import { HildaController } from "@/scripts/HildaController";

import HildaText from "./hildaText";

import Level from "./level";

export default function Hilda({ currentView, changeView, toNext }: { currentView: string; changeView: (name: string) => void; toNext: (index: number) => void }) {
    const hilda = useRef<HildaController | null>(null);
    const [start, setStart] = useState<boolean>(false);
    const [level, setLevel] = useState<number | null>(null);

    const [text1, setText1] = useState<boolean>(true);
    const [text2, setText2] = useState<boolean>(false);
    const [text3, setText3] = useState<boolean>(false);
    const [text4, setText4] = useState<boolean>(false);
    const [text5, setText5] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
        if (start) {
            const element = document.querySelector("#hilda");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                changeView("hilda_start");
            }

            hilda.current = new HildaController({ state: setLevel, currentView, toNext });

            hilda.current?.levelDown();

            return () => {
                hilda.current?.destroy();
                hilda.current = null;
            };
        }
    }, [start]);

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

                    await delay(3000);
                    setText2(false);
                    setClose(false);
                    setText1(true);

                    changeView("hilda");
                    setStart(false)
                    hilda.current.destroy();

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

                    await delay(3000);
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
                if (side) {
                    hilda.current?.hildaMoonUntransform();
                    await delay(3500);

                    hilda.current?.hildaIdle()
                    await delay(1000);

                    hilda.current?.moveToClose()
                    await delay(1500);

                    hilda.current.hildaClose();
                    setClose(true);
                    await delay(3000);

                    hilda.current.hildaApair();
                    setText4(false);
                    setClose(false);
                    setText3(true);

                    await delay(2000);
                    hilda.current.hildaGeminiIdle();


                } else {
                    hilda.current.moveToClose();
                    await delay(1500);
                    hilda.current.hildaClose();
                    setClose(true);

                    await delay(3000);
                    hilda.current.hildaApair();
                    setText2(false);
                    setClose(false);
                    setText3(true);

                    await delay(2000);
                    hilda.current.hildaGeminiIdle();
                }
                break;

            case 3:
                if (side) {
                    setClose(true);
                    await delay(3000);
                    setText5(false);
                    setClose(false)
                    setText4(true);

                    hilda.current.hildaMoonIdle();
                } else {
                    hilda.current.moveToClose();
                    await delay(1500);
                    hilda.current.hildaClose();
                    setClose(true);

                    await delay(3000);
                    hilda.current.hildaApair();
                    setText3(false);
                    setClose(false);
                    setText4(true);

                    await delay(2000);
                    hilda.current.hildaMoonTransform();
                }
                break;

            case 4:
                if (side) {

                } else {
                    hilda.current.hildaDie()
                    setText4(false);
                    setText5(true);
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

    useEffect(() => {
        if (!hilda.current) return;
        hilda.current?.updateCurrentView(currentView);
    }, [currentView])

    return (
        <>
            {/* Level 0 */}
            {text1 ? <>
                <HildaText title={"WHO AM I?"} text={"Click and Keep scrolling to find out about me"} apair={false} />
                <button onClick={() => { setStart(true) }} className="absolute z-50 font-luck text-white left-[4%] top-[35%] max-sm:top-[45%] butoon-start px-20 max-md:px-[3rem] pb-1 pt-3 cursor-pointer">START</button>
            </> : null}


            {/* Level 1*/}
            {text2 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"A SOFTWARE ENGINEER"} text={"I'm a software engineer passionate about crafting intuitive and creative solutions. I blend clean code with thoughtful design, always striving to build seamless digital experiences."} apair={true} /></div> : <></>}

            {/* Level 2 */}
            {text3 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"A CREATIVE COFFEE LOVER"} text={"Fueled by coffee and creativity, I craft playful yet polished digital experiences. Just like in a good game, every pixel and line of code has a purpose — and a bit of magic."} apair={true} /></div> : <></>}

            {/* Level 3 */}
            {text4 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"WHAT I HAVE BEEN DOING?"} text={"I've been on a journey of crafting code, designing ideas, and building digital experiences. From creative personal projects to exciting collaborations, every line of code is a step forward — and the adventure is just beginning"} apair={true} /></div> : <></>}

            {/* Level 4 */}
            {text5 ? <div className={`${close ? "text-close" : ""}`}><HildaText title={"WHAT CAN I DO?"} text={"Need a creative coder? I build interactive websites, design seamless user experiences, and solve digital puzzles — all with a sprinkle of creativity and clean code."} apair={true} /></div> : <></>}

            {<Level level={level} callback={() => {
                hilda.current?.cleanCanvas();
                hilda.current?.destroy();
                hilda.current = null;
                toNext(1);
            }} />}
        </>
    );
}