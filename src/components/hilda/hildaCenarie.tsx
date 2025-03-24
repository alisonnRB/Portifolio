"use client";

import "./hilda.css";

import Camada from "../camada";
import CamadaRepeat from "../camadaRepeated";

import primeiraCamada from "./source/primeiraCamada.png";
import segundaCamada from "./source/segundaCamada.png";
import terceiraCamada from "./source/terceiraCamada.png";
import quartaCamada from "./source/quartaCamada.png";
import Hilda from "./hilda";


import { useEffect, useContext, useState } from "react";
import { useInView } from "react-intersection-observer";
import { viewContext } from "@/scripts/viewContext";

export default function HildaCenarie() {
    const { currentView, changeView } = useContext(viewContext)
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    useEffect(() => {
        if (inView) changeView("hilda");
    }, [inView])


    return (
        <section className="section-container" ref={ref}>
            <div className="relative background-hilda overflow-hidden z-0 shrink-0 h-[100dvh] w-[100dvw]">
                {/* camada 1 */}
                <Camada img={primeiraCamada} camada="camada1-hilda" num={0} zIndex={10} bottom={-10} />
                <Camada img={primeiraCamada} camada="camada1-hilda" num={1} zIndex={10} bottom={-5} />

                {/* camada 2 */}
                <CamadaRepeat container={"hilda-container"} section={"hilda-part"} img={segundaCamada} zIndex={20} />

                {/* camada 3 */}
                <Camada img={terceiraCamada} camada="camada3-hilda" num={0} zIndex={40} bottom={0} />

                {/* camada 4 */}
                <Camada img={quartaCamada} camada="camada4-hilda" num={0} zIndex={50} bottom={-10} />

                {/* hilda */}
                {currentView == "hilda" ? <Hilda currentView={currentView} changeView={changeView} /> : <></>}
            </div>
        </section>
    );
}