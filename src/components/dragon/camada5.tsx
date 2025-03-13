"use client";

import { useEffect } from "react";
import quintaCamada from './source/quintaCamada.png';
import {widthAdjuster} from "@/scripts/widthAdjuster";

export default function Camada5() {
    useEffect(()=>{
        widthAdjuster('.camada5', quintaCamada);
    },[])

    return (
        <span className='absolute z-20 h-full w-full'>
            <div className='absolute h-[40%] overflow-hidden bg-pink-700 camada5 camada5-2'></div>
            <div className='absolute h-[40%] overflow-hidden bg-pink-700 camada5 top-[30%]'></div>
            <div className='absolute h-[40%] overflow-hidden bg-pink-700 camada5 top-[20%] camada5-1'></div>
        </span>
    )
}