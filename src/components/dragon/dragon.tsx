"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";
import cloud from "../dragon/source/DragonsCloud.png";
import Image from "next/image";

export default function Dragon({ currentView, changeView }: { currentView: string; changeView: (name: string) => void; }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);
    const [isPortrait, setIsPortrait] = useState<boolean>(false);
    const [animatinState, setAnimationState] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsPortrait(window.innerHeight > window.innerWidth);

            const handleResize = () => {
                setIsPortrait(window.innerHeight > window.innerWidth);
            };

            window.addEventListener("resize", handleResize);
            setAnimationState("suspension")

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            if (isPortrait) {
                canvas.style.height = "30dvh";
                canvas.style.width = "calc(30dvh * 1.133)";
            } else {
                canvas.style.height = "100dvh";
                canvas.style.width = "calc(100dvh * 1.133)";
            }
        }

        if (animatinState == "suspension" && currentView == "loading") {
            setAnimationState('intro');
        }

    }, [isPortrait, animatinState, currentView]);

    useEffect(() => {
        if (animatinState == "intro" && canvasRef.current && currentView == "dragon") {
            animation.current = new Animations(canvasRef.current, '/resources/dragon_intro_spriteSheet.png', 48);
            animation.current.loop(false, 45, () => { setAnimationState("idle") });

            return () => {
                animation.current?.stopAnimation(true);
            };
        }
    }, [animatinState, currentView]);

    useEffect(() => {
        if (animatinState == "idle" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/dragon_idle_spriteSheet.png', 16);
            animation.current.loop(true, 50);
            changeView("dragon_idle");

            return () => {
                animation.current?.stopAnimation();
            };
        }

    }, [animatinState])

    return (
        <>
            <canvas ref={canvasRef} className="dragon-canvas absolute z-60 bottom-[50%] right-[-3%]" style={{ height: '100dvh', width: 'calc(100dvh * 1.133)' }}>
            </canvas>

            <Image
                src={cloud}
                className="dragons-cloud absolute z-60 bottom-[39%] right-0"
                alt="Cloud of dragon"
                priority
            />

        </>
    )
}