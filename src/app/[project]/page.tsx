"use client";
import "./work.css";

import { useParams, useRouter } from "next/navigation";
import { projects } from "@/scripts/projects";
import { useEffect, useRef, useState } from "react";
import { Animations } from "@/scripts/Animations";
import SkillExplain from "@/components/skillExplain/skillExplain";

import Image from "next/image";
import link from "../icons/link.png";
import github from "../icons/github.png";

import arrow from "@/components/source/arow.png";

export default function WorkProject() {
    const params = useParams();
    const animation = useRef<Animations | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isPortrait, setIsPortrait] = useState<boolean>(false);
    const router = useRouter();

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
        if (!canvasRef.current) return;

        if (isPortrait) {
            canvasRef.current.style.height = "20dvh";
            canvasRef.current.style.width = "calc(20dvh * 0.7115)";
        } else {
            canvasRef.current.style.height = "35dvh";
            canvasRef.current.style.width = "calc(35dvh * 0.7115)";
        }

        let frameRate = 0;

        if (Number(params.project) % 2 == 0) {
            animation.current = new Animations(canvasRef.current, '/resources/player1_dancing_spriteSheet.png', 14);
            frameRate = 100
        } else {
            animation.current = new Animations(canvasRef.current, '/resources/player2_dancing_spriteSheet.png', 28);
            frameRate = 50
        }

        animation.current.loop(true, frameRate);

        return () => {
            animation.current?.stopAnimation(true);
        };

    }, [canvasRef, isPortrait])

    const keywordsGenerator = () => {
        return projects[Number(params.project)].keywords.map((keyword, index) => (
            <p className="keywords" key={index}>{keyword}</p>
        ));
    };

    return (
        <div className="h-[100dvh] w-[100dvw] work-project-content">
            <div className="h-[100dvh] w-[100dvw] work-project-container py-[10dvh] text-white font-luck flex flex-col items-center">

                <span className="w-[60dvw] max-md:w-[95vw] flex flex-row items-center justify-between">
                    <h1 className="title w-[50%] mt-[8vh]">{projects[Number(params.project)].title}</h1>

                    <canvas ref={canvasRef} className="canvas">
                    </canvas>
                </span>

                <h2 className="sub-title w-[60dvw] max-md:w-[95vw]">DESCRIPTION</h2>

                <p className="font-maven text mt-[3vh] w-[60dvw] max-md:w-[95vw]" dangerouslySetInnerHTML={{ __html: projects[Number(params.project)].description.replace(/\n/g, "<br/>") }}></p>

                <div className="w-[60dvw] max-md:w-[95vw] capa p-[3%] mt-[7vh]">
                    <Image src={projects[Number(params.project)].image} alt="" className="h-full" />
                </div>

                <span className="w-[60dvw] max-md:w-[95vw] h-[5vh] flex flex-row link">
                    <Image src={link} alt="" className="icon cursor-pointer" />
                    <Image src={github} alt="" className="icon cursor-pointer" />
                </span>

                <span className="w-[60dvw] max-md:w-[95vw]">
                    <SkillExplain title="USED SKILLS" techs={projects[Number(params.project)].skills} />
                </span>

                <span className="w-[60dvw] max-md:w-[95vw] mt-[13dvh] flex flex-col">
                    <h1 className="title">KEYWORDS</h1>
                    {keywordsGenerator()}
                </span>

            </div>

            <div className="comeback fixed left-0 bottom-[15dvh] py-1.5 px-2 w-[10vw] max-md:w-[20vw] max-sm:w-[30vw] rounded-r-[50px] flex justify-end cursor-pointer" onClick={() => { setTimeout(() => router.push(`/#works`), 100) }}>
                <Image src={arrow} alt="" className="arrow-back" />
            </div>

        </div>
    );
}
