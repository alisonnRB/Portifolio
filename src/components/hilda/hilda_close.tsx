"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";

export default function HildaClose() {
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
                canvas.style.height = "23dvh";
                canvas.style.width = "calc(23dvh * 2.03)";
            } else {
                canvas.style.height = "45dvh";
                canvas.style.width = "calc(45dvh * 2.03)";
            }
        }

        if (animatinState == "suspension") {
            setAnimationState('intro');
        }

    }, [isPortrait, animatinState]);

    useEffect(() => {
        if (animatinState == "intro" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/hilda_close_spriteSheet.png', 27);
            animation.current.loop(true, 100);

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, [animatinState]);

    return (
        <>
            <canvas ref={canvasRef} className="hilda-canvas-close absolute z-30 bottom-[56%] right-[5%] portrait:right-0" style={{ height: '100dvh', width: 'calc(100dvh * 2.03)' }}>
            </canvas>
        </>
    )
}