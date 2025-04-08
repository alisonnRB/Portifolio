"use client";

import { useEffect, useState, useRef } from "react";

import { Project } from "@/scripts/projects";
import { Animations } from "@/scripts/Animations";

import Image from "next/image";
import { useRouter } from 'next/navigation'

import player1Unselect from "./source/player1_unselect.png";
import player2Unselect from "./source/player2_unselect.png";
import player1Select from "./source/player1_select.png";
import player2Select from "./source/player2_select.png";

export default function MyProjects({ project, index }: { project: Project; index: number }) {
    const [hover, setHover] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!selected || !canvasRef.current) return;


        if (index % 2 == 0) {
            animation.current = new Animations(canvasRef.current, '/resources/player1_spriteSheet.png', 8);
        } else {
            animation.current = new Animations(canvasRef.current, '/resources/player2_spriteSheet.png', 8);
        }

        animation.current.loop(false, 100, () => setTimeout(() => router.push(`/${index}`), 100));


        return () => {
            animation.current?.stopAnimation(true);
        };

    }, [selected])

    return (
        <div
            className={`card-works ${hover || selected ? (index % 2 == 0 ? "player1" : "player2") : "nonSelect"} w-[60vw] max-md:w-[95vw] min-h-[17dvh] portrait:min-h-[12dvh] flex flex-row justify-between px-[3%] ${hover || selected ? "text-white" : "text-dark"} font-luck border-dark border-solid border-2 cursor-pointer`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setSelected(true)}
        >
            <span className="w-[25%]">
                <h2 className="sub-title h-[35%] flex items-center">PROJECT</h2>
                <h1 className="h-[65%] flex items-center name">{project.name}</h1>
            </span>

            <span className="w-[30%]">
                <h2 className="sub-title h-[35%] flex items-center">DESCRIPTION</h2>
                <h1 className="h-[65%] flex items-center desc">{project.resume}</h1>
            </span>

            <span className="w-[15%] flex justify-center items-center">

                {!selected ? (
                    !hover ? (
                        <Image
                            src={index % 2 === 0 ? player1Unselect : player2Unselect}
                            alt=""
                            className="w-[12vw] max-w-[70px]"
                        />
                    ) : (
                        <Image
                            src={index % 2 === 0 ? player1Select : player2Select}
                            alt=""
                            className="w-[12vw] max-w-[70px]"
                        />
                    )
                ) :
                    <canvas ref={canvasRef} className="w-[13vw] max-w-[75px] h-[13vw] max-h-[75px]">
                    </canvas>
                }

            </span>

        </div>
    );
}