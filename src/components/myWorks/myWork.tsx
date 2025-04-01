"use client";

import "./myWork.css";

import { useRef, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { viewContext } from "@/scripts/viewContext";

export default function MyWork() {
    const { currentView, changeView } = useContext(viewContext)
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 1,
    });

    useEffect(() => {
        if (inView) changeView("works");
    }, [inView])

    return (
        <section className="section-container non bg-pink-900 mt-[27vh]" ref={ref}>

        </section>

    );
}