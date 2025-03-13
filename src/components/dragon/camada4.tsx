"use client";
import { useEffect } from "react";
import quartaCamada from './source/quartaCamada.png';
import { widthAdjuster } from "@/scripts/widthAdjuster";


export default function Camada4() {
    useEffect(() => {
        widthAdjuster('.camada4', quartaCamada);
    }, [])

    return (
        <span className="absolute h-full w-full z-30">
            <div className='h-[40%] absolute top-[68%] overflow-hidden camada4 z-30'></div>
            <div className='h-[40%] absolute top-[68%] overflow-hidden camada4 z-30 camada4-1'></div>
        </span>
    );

}