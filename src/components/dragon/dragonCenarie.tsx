import './dragon.css';

import Image from 'next/image';
import arrow from './source/arow.png';


import background from './source/fundo.png';
import CamadaRepeat from '../camadaRepeated';
import Camada from '../camada';

import quintaCamada from "./source/quintaCamada.png";
import quartaCamada from "./source/quartaCamada.png";
import terceiraCamada from "./source/terceiraCamada.png";
import segundaCamada from "./source/segundaCamada.png";
import primeiraCamada from "./source/primeiraCamada.png";

import Title from './title';
import Castle from './castle';
import Dragon from './dragon';

import { useContext, useEffect } from 'react';
import { viewContext } from "@/scripts/viewContext";
import { useInView } from 'react-intersection-observer';

export default function DragonCenarie() {
    const { changeView, currentView } = useContext(viewContext);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1,
    });

    useEffect(() => {
        if (inView) changeView("dragon_intro");
    }, [inView])

    return (
        <section className='section-container' ref={ref}>
            <div className="h-full w-full relative overflow-hidden">
                {/* fundo */}
                <CamadaRepeat container={"background-container"} img={background} section={"background"} zIndex={10} />

                {/* camada5 */}
                <Camada img={quintaCamada} camada="camada5" num={0} zIndex={20} bottom={40} />
                <Camada img={quintaCamada} camada="camada5" num={1} zIndex={20} bottom={30} />
                <Camada img={quintaCamada} camada="camada5" num={2} zIndex={20} bottom={25} />

                {/* camada4 */}
                <Camada img={quartaCamada} camada="camada4" num={0} zIndex={30} bottom={2} />
                <Camada img={quartaCamada} camada="camada4" num={1} zIndex={30} bottom={3} />
                <Camada img={quartaCamada} camada="camada4" num={2} zIndex={30} bottom={1} />

                {/* castle */}
                <Castle />

                {/* camada3 */}
                <Camada img={terceiraCamada} camada="camada3" num={0} zIndex={25} bottom={2} />
                <Camada img={terceiraCamada} camada="camada3" num={1} zIndex={25} bottom={5} />
                <Camada img={terceiraCamada} camada="camada3" num={2} zIndex={25} bottom={3} />

                {/* camada2 */}
                <Camada img={segundaCamada} camada="camada2" num={0} zIndex={60} bottom={-1.5} />
                <Camada img={segundaCamada} camada="camada2" num={1} zIndex={60} bottom={-1.5} />
                <Camada img={segundaCamada} camada="camada2" num={2} zIndex={60} bottom={-1.5} />

                <Camada img={segundaCamada} camada="camada25" num={0} zIndex={60} bottom={-2} />
                <Camada img={segundaCamada} camada="camada25" num={1} zIndex={60} bottom={-2} />
                <Camada img={segundaCamada} camada="camada25" num={2} zIndex={60} bottom={-2} />

                {/* camada1 */}
                <Camada img={primeiraCamada} camada="camada1" num={0} zIndex={70} bottom={-0.5} />
                <Camada img={primeiraCamada} camada="camada1" num={1} zIndex={70} bottom={-0.5} />
                <Camada img={primeiraCamada} camada="camada1" num={2} zIndex={70} bottom={-0.5} />

                {/* Dragon */}
                <Dragon currentView={currentView} changeView={changeView} />

                {/* Title */}
                {currentView == "dragon_intro" ? <Title /> : <></>}

                {/* To bottom */}
                <Image
                    src={arrow}
                    className="absolute z-90 arrow"
                    alt="arrow to bottom"
                    priority
                />
            </div>
        </section>
    );
}