"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";

export default function HildaLoop() {
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
                canvas.style.height = "18dvh";
                canvas.style.width = "calc(18dvh * 0.911)";
            } else {
                canvas.style.height = "40dvh";
                canvas.style.width = "calc(40dvh * 0.911)";
            }
        }

        if (animatinState == "suspension") {
            setAnimationState('intro');
        }

    }, [isPortrait, animatinState]);

    useEffect(() => {
        if (animatinState == "intro" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/hilda_idle_spriteSheet.png', 21);
            animation.current.loop(true, 100);

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, [animatinState]);

    return (
        <>
            <canvas ref={canvasRef} className="hilda-canvas-idle absolute z-30 bottom-[20%] right-[5%] portrait:right-0" style={{ height: '40dvh', width: 'calc(40dvh * 0.911)' }}>
            </canvas>
        </>
    )
}