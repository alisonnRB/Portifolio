"use client";

import "./myWork.css";

import { useRef, useEffect, useContext, useState, ReactElement } from "react";
import { useInView } from "react-intersection-observer";
import { viewContext } from "@/scripts/viewContext";
import { WorksScrollViewer } from "@/scripts/worksViewer";
import { projects, Project } from "@/scripts/projects";
import MyProjects from "./myProjects";

export default function MyWork() {
    const scroller = useRef<WorksScrollViewer | null>(null);
    const [AllProjects, setProjects] = useState<Project[]>([])
    const { currentView, changeView, toNext } = useContext(viewContext)

    const sectionRef = useRef<HTMLElement | null>(null)
    const { ref: inViewRef, inView } = useInView({
        triggerOnce: false,
        threshold: 1,
    });

    useEffect(() => {
        if (inView) changeView("works");
        if (!sectionRef.current) return;
        scroller.current = new WorksScrollViewer({
            toNext,
            section: sectionRef.current,
        });
    }, [inView]);

    useEffect(() => {
        if (!projects) return;

        setProjects(projects);
    }, [projects])

    const ProjectGenerator = (): ReactElement[] => {
        return AllProjects.map((project, index) => <MyProjects project={project} key={index} index={index} />);
    };

    const setRefs = (node: HTMLElement | null) => {
        sectionRef.current = node;
        inViewRef(node);
    };

    return (
        <section className="section-container non bg-[#347ABE]" ref={setRefs}>
            <div className="relative works overflow-hidden z-0 shrink-0 h-[100dvh] w-[100dvw] pb-[2vh]">
                <div className="flow relative pt-[10vh] h-[100%] w-[100%] project-content flex flex-col items-center gap-[5dvh] portrait:gap-[3svh]">
                    <span className="flex w-[60vw] max-md:w-[95vw] flex-row items-start">
                        <h1 className="text-white font-luck title">MY WORKS</h1>
                    </span>
                    {ProjectGenerator()}
                </div>
            </div>
        </section>

    );
}