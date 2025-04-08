"use client";

import "./myWork.css";

import { useEffect, useContext, useState, ReactElement } from "react";
import { useInView } from "react-intersection-observer";
import { viewContext } from "@/scripts/viewContext";
import { projects, Project } from "@/scripts/projects";
import { technologies, Tech } from "@/scripts/tech";

import SkillExplain from "../skillExplain/skillExplain";

import Image from "next/image";

import MyProjects from "./myProjects";
import player from "./source/player_layout.svg";


export default function MyWork() {
    const [AllProjects, setProjects] = useState<Project[]>([])
    const { changeView } = useContext(viewContext)
    const technology = Object.freeze(["javascript", "php", "next", "git"])
    const Alltechnology = Object.freeze(["javascript", "php", "next", "git", "csharp", "css", "html", "java", "typescript", "laravel", "mysql", "postgreesql", "python", "react", "sass", "tailwind"])

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 1,
    });

    useEffect(() => {
        if (inView) changeView("works");
    }, [inView]);

    useEffect(() => {
        if (!projects) return;

        setProjects(projects);
    }, [projects])

    const ProjectGenerator = (): ReactElement[] => {
        return AllProjects.map((project, index) => <MyProjects project={project} key={index} index={index} />);
    };

    const tech = () => {
        return technology.map((technology: string, index) => {
            const foundTech: Tech | undefined = technologies.find((t) => t.name === technology);
            return foundTech ?
                <span className={`content-tech relative z-10 rounded-full`} key={index}>
                    <Image src={foundTech.image} alt="" className="icon relative z-20 col-span-1" />
                </span> : null;

        }).filter(Boolean);
    };

    return (
        <section className="section-container bg-[#347ABE]" id="works" ref={ref}>
            <div className="relative works overflow-hidden z-0 shrink-0 h-[100dvh] w-[100dvw] pb-[2vh]">
                <div className="flow relative pt-[10vh] h-[110%] w-[100%] project-content flex flex-col items-center gap-[5dvh] portrait:gap-[3svh] py-[10vh]">
                    <span className="flex w-[60vw] max-md:w-[95vw] flex-row items-start">
                        <h1 className="text-white font-luck title">MY WORKS</h1>
                    </span>
                    {ProjectGenerator()}

                    <span className="w-[45vw] max-md:w-[95vw] mt-[20dvh]">
                        <Image src={player} alt="" className="w-full" />
                        <span className="w-full techs-main grid grid-cols-5 gap-[1%] max-md:gap-[0] max-md:px-[6vw] px-[3vw]">
                            {tech()}
                            <div className="col-span-1"></div>
                        </span>


                        <SkillExplain title="MY SKILLS KIT" techs={[...Alltechnology]} />
                    </span>

                    <span className="w-[45vw] max-md:w-[95vw] mt-[20dvh] mb-[20dvh]">
                        <button className="w-full rounded-[50px] font-luck text-white button-play pt-[5vh] pb-[3vh] cursor-pointer">LET'S PLAY</button>
                    </span>

                </div>
            </div>


        </section>

    );
}