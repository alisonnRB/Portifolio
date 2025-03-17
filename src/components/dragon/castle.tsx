"use client";

import { useEffect, useRef, useState } from "react";
import { Animations } from "@/scripts/Animations";

const Castle = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);
    const [isPortrait, setIsPortrait] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsPortrait(window.innerHeight > window.innerWidth);

            const handleResize = () => {
                setIsPortrait(window.innerHeight > window.innerWidth);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            if (isPortrait) {
                canvas.style.height = "50dvh";
                canvas.style.width = "calc(50dvh * 0.390625)";
            } else {
                canvas.style.height = "95dvh";
                canvas.style.width = "calc(95dvh * 0.390625)";
            }
        }
    }, [isPortrait]);

    useEffect(() => {
        if (canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/castle_spriteSheet.png', 179);
            animation.current.loop(true, 70);

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, []);


    return (
        <canvas ref={canvasRef} className="castle-canvas" style={{ height: '95dvh', width: 'calc(95dvh * 0.390625)' }}>
        </canvas>
    );
};

export default Castle;
