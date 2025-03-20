"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";
import cloud from "../dragon/source/DragonsCloud.png";
import Image from "next/image";

export default function Dragon({ currentView, changeView }: { currentView: String; changeView: (name: String) => void; }) {
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
        if (canvas && currentView == "dragon_intro") {
            if (isPortrait) {
                canvas.style.height = "30dvh";
                canvas.style.width = "calc(30dvh * 1.133)";
            } else {
                canvas.style.height = "100dvh";
                canvas.style.width = "calc(100dvh * 1.133)";
            }
        }

        if (animatinState == "suspension") {
            setAnimationState('intro');
        }

    }, [isPortrait, animatinState, currentView]);

    useEffect(() => {
        if (animatinState == "intro" && canvasRef.current && currentView == "dragon_intro") {
            animation.current = new Animations(canvasRef.current, '/resources/dragon_intro_spriteSheet.png', 48);
            animation.current.loop(false, 45, () => { setAnimationState("idle") });

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, [animatinState]);

    useEffect(() => {
        if (animatinState == "idle" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/dragon_idle_spriteSheet.png', 16);
            animation.current.loop(true, 60);
            changeView("dragon_idle")

            return () => {
                animation.current?.stopAnimation();
            };
        }

    }, [animatinState])

    return (
        <>
            <canvas ref={canvasRef} className="dragon-canvas" style={{ height: '100dvh', width: 'calc(100dvh * 1.133)' }}>
            </canvas>

            <Image
                src={cloud}
                className="dragons-cloud"
                alt="Cloud of dragon"
                priority
            />

        </>
    )
}