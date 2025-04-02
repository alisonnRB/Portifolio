"use client";

import { useEffect, useState, useRef } from "react";

import { Project } from "@/scripts/projects";
import { Animations } from "@/scripts/Animations";

import Image from "next/image";
import player1Unselect from "./source/player1_unselect.png";
import player2Unselect from "./source/player2_unselect.png";
import player1Select from "./source/player1_select.png";
import player2Select from "./source/player2_select.png";

export default function MyProjects({ project, index }: { project: Project; index: number }) {
    const [hover, setHover] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animation = useRef<Animations | null>(null);

    useEffect(() => {
        if (!selected || !canvasRef.current) return;

        if (index % 2 == 0) {
            animation.current = new Animations(canvasRef.current, '/resources/player1_spriteSheet.png', 8);
        } else {
            animation.current = new Animations(canvasRef.current, '/resources/player2_spriteSheet.png', 8);
        }

        animation.current.loop(false, 100, () => { });

        return () => {
            animation.current?.stopAnimation(true);
        };

    }, [selected])

    return (
        <div className="card-works w-[60%] min-h-[17dvh] flex flex-row justify-between px-[3%] text-dark font-luck border-dark border-solid border-2">
            <span className="w-[25%]">
                <h2 className="sub-title h-[35%] flex items-center">PROJECT</h2>
                <h1 className="h-[65%] flex items-center name">{project.name}</h1>
            </span>

            <span className="w-[65%]">
                <h2 className="sub-title h-[35%] flex items-center">DESCRIPTION</h2>
                <h1 className="h-[65%] flex items-center desc">{project.resume}</h1>
            </span>

            <span className="w-[15%] flex justify-center items-center">

                {!selected ? (
                    !hover ? (
                        <Image
                            src={index % 2 === 0 ? player1Unselect : player2Unselect}
                            alt=""
                            className="w-[70%] cursor-pointer"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        />
                    ) : (
                        <Image
                            src={index % 2 === 0 ? player1Select : player2Select}
                            alt=""
                            className="w-[70%] cursor-pointer"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={() => setSelected(true)}
                        />
                    )
                ) :
                    <canvas ref={canvasRef} className="w-[85%] h-[85%]">
                    </canvas>
                }

            </span>

        </div>
    );
}