"use client";

import { useEffect, useRef, useState } from "react";

import { Animations } from "@/scripts/Animations";

export default function HildaExplosion({ ms, bottom }: { ms: number; bottom: number; }) {
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
                canvas.style.height = "40dvh";
                canvas.style.width = "calc(40dvh * 1.083)";
            } else {
                canvas.style.height = "75dvh";
                canvas.style.width = "calc(75dvh * 1.083)";
            }
        }

        if (animatinState == "suspension") {

            const timeOut = setTimeout(() => { setAnimationState('explode'); }, ms)

            return () => { clearInterval(timeOut) };
        }

    }, [isPortrait, animatinState]);

    useEffect(() => {
        if (animatinState == "explode" && canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/hilda_explosion_spriteSheet.png', 15);
            animation.current.loop(false, 150, () => { setAnimationState("final") });

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, [animatinState]);

    return (
        <>
            {animatinState != "final" ? <canvas ref={canvasRef} className={`absolute z-40 right-[-4%] portrait:right-[-30%]`} style={{ height: '75dvh', width: 'calc(75dvh * 1.083)', bottom: `${bottom + 5}%` }}>
            </canvas> : <></>}
        </>
    )
}