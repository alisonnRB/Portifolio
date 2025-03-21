"use client";

import "./hilda.css";

import Camada from "../camada";
import CamadaRepeat from "../camadaRepeated";
import HildaText from "./hildaText";

import primeiraCamada from "./source/primeiraCamada.png";
import segundaCamada from "./source/segundaCamada.png";
import terceiraCamada from "./source/terceiraCamada.png";
import quartaCamada from "./source/quartaCamada.png";


import { useEffect, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import { viewContext } from "@/scripts/viewContext";

export default function HildaCenarie() {
    const { currentView, changeView } = useContext(viewContext)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });
    const [text1, setText1] = useState("");

    useEffect(() => {
        if (inView) changeView("hilda_init");
    }, [inView])

    useEffect(() => {
        if (currentView == "hilda_init") {
            setText1("apier")
            setTimeout(() => {
                setText1("desapier")
            }, 2000)
        }
    }, [currentView]);

    useEffect(() => {
        if (text1 == "apier") {

        }
    }, [text1])


    return (
        <section className="section-container" ref={ref}>
            <div className="relative background-hilda overflow-hidden z-0 shrink-0 h-[100dvh] w-[100dvw]">
                {/* camada 1 */}
                <Camada img={primeiraCamada} camada="camada1-hilda" num={0} zIndex={10} bottom={-10} />
                <Camada img={primeiraCamada} camada="camada1-hilda" num={1} zIndex={10} bottom={-5} />

                {/* camada 2 */}
                <CamadaRepeat container={"hilda-container"} section={"hilda-part"} img={segundaCamada} zIndex={20} />

                {/* camada 3 */}
                <Camada img={terceiraCamada} camada="camada3-hilda" num={0} zIndex={30} bottom={0} />

                {/* camada 4 */}
                <Camada img={quartaCamada} camada="camada4-hilda" num={0} zIndex={40} bottom={-10} />

                {/* title 1 */}
                {text1 == "apier" ? <HildaText title={"WHO AM I?"} text={"I'm a software engineer passionate about crafting intuitive and creative solutions. I blend clean code with thoughtful design, always striving to build seamless digital experiences."} /> : <></>}
            </div>
        </section>
    );
}