"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";
import { IdleAnimation } from "@/scripts/idleAnimation";

export default function HildaGemini({ close }: { close: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);
    const idleAnimations = useRef<IdleAnimation | null>(null);
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
                canvas.style.width = "calc(23dvh * 0.97)";
            } else {
                canvas.style.height = "50dvh";
                canvas.style.width = "calc(50dvh * 0.97)";
            }
        }

        if (animatinState == "suspension") {
            setAnimationState('intro');
        }

    }, [isPortrait, animatinState]);

    useEffect(() => {
        if (animatinState == "intro" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/hilda_gemini_spriteSheet.png', 13);
            animation.current.loop(true, 100);

            idleAnimations.current = new IdleAnimation(canvasRef.current);

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, [animatinState]);

    useEffect(() => {
        if (!close) return;
        idleAnimations.current?.moveToEnd()
    }, [close])

    return (
        <>
            <canvas ref={canvasRef} className={`absolute z-30 bottom-[20%] right-[5%] portrait:right-0`} style={{ height: '40dvh', width: 'calc(50dvh * 0.97)' }}>
            </canvas>
        </>
    )
}