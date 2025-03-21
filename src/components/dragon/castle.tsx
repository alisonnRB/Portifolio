"use client";

import { useEffect, useRef } from "react";
import { Animations } from "@/scripts/Animations";

const Castle = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            animation.current = new Animations(canvasRef.current, '/resources/castle_spriteSheet.png', 179);
            animation.current.loop(true, 110);

            return () => {
                animation.current?.stopAnimation();
            };
        }
    }, []);


    return (
        <canvas ref={canvasRef} className="castle-canvas absolute z-40 bottom-0 left-[50%]" style={{ height: '95dvh', width: 'calc(95dvh * 0.390625)' }}>
        </canvas>
    );
};

export default Castle;
