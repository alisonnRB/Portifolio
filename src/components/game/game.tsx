"use client";

import "./game.css";

import { Animations } from "@/scripts/Animations";
import { useRef, useEffect, useContext, useState } from "react";
import { viewContext } from "@/scripts/viewContext";
import { useInView } from "react-intersection-observer";

import Image from "next/image";
import arrow from "../source/arrowKey.svg";
import play from "./source/Play.svg";

export default function Game() {
    const { changeView, currentView, toNext } = useContext(viewContext);
    const [tutorial, setTutorial] = useState<boolean>(false);
    const [hud, setHud] = useState<boolean>(false);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    useEffect(() => {
        // changeView("game"); 
        if (inView) setTutorial(true);

        const canvas = canvasRef.current;

        if (canvas) {
            animation.current = new Animations(canvas, '/resources/tutorial_spriteSheet.png', 45);
        }

    }, [inView])

    useEffect(() => {
        if (!tutorial) return;
        handleAnimation();
    }, [tutorial]);

    const handleAnimation = () => {
        const canvas = canvasRef.current;

        if (canvas) {
            animation.current?.loop(false, 60, () => { setHud(true) });
        }

        return () => {
            animation.current?.stopAnimation(true);
        };

    }

    return (
        <section className="section-container game-tutorial flex justify-center w-[100vw] h-[100vh]" id="game" ref={ref}>

            <div className="w-[65vw] max-md:w-[90vw] overflow-x-hidden overflow-y-scroll flex flex-col items-center py-[5vh] games">

                <div className="w-full flex justify-center items-center relative">
                    <h1 className="text-white font-luck title">TUTORIAL</h1>
                </div>

                <div className="paper-back w-full aspect-[16/9] object-contain p-[3vh] max-md:p-[1vh] relative left-[50%]">
                    <canvas ref={canvasRef} className="w-full aspect-[16/9] object-contain">
                    </canvas>

                    <div className="absolute inset-0 flex items-center justify-center p-[5%]">
                        <div className={`grid grid-cols-3 grid-rows-2 gap-4 w-[80%] h-[70%] max-w-[100%] max-h-[100%] font-maven font-bold text-white ${hud ? "hud" : "opacity-0"}`}>

                            {[
                                { key: "SPACE", label: "JUMP" },
                                { key: "SHIFT", label: "DASH" },
                                { arrows: true, label: "MOVE" },
                                { key: "C", label: "LOCK" },
                                { key: "N", label: "SHOOT" },
                                { arrows: true, label: "AIM" },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center p-2 rounded-xl w-full h-full justify-center">
                                    {item.arrows ? (
                                        <div className="flex gap-2">
                                            <div className="bg-dark aspect-square w-10 flex items-center justify-center rounded">
                                                <Image src={arrow} alt="" className="w-4 aspect-square" />
                                            </div>
                                            <div className="bg-dark aspect-square w-10 flex items-center justify-center rounded">
                                                <Image src={arrow} alt="" className="w-4 aspect-square" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-dark px-4 py-2 rounded">
                                            <p className="text-white text-lg">{item.key}</p>
                                        </div>
                                    )}
                                    <h2 className="text-dark mt-2 text-center text-xs sm:text-sm md:text-base">{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


                <h2 className="w-[60%] sub-title font-luck text-white relative text-center mt-[1vh]">
                    IF YOU ARE USING A TOUCH DEVICE A HUD WILL APAIR IN GAME!
                </h2>

                <h1 className="w-[60%] title font-luck text-white relative text-center mt-[8vh]">
                    IF YOU ALRIGTH GO
                </h1>

                <div className="w-full aspect-[16/10] bg-dark relative rounded-4xl text-white font-luck flex flex-col justify-center items-center gap-[5vh] cursor-pointer mt-[5vh]">
                    <Image src={play} alt="" />

                    <p>press to play a game
                        with me</p>
                </div>

            </div>

        </section>
    );
}