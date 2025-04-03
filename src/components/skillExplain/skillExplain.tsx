"use client";
import "./skillExplain.css";

import Image from "next/image";
import { useState } from "react";
import { Tech, technologies } from "@/scripts/tech";

export default function SkillExplain({ title, techs }: { title: string; techs: string[] }) {
    const [select, setSelect] = useState<string>("")
    const [techFounded, setTechFounded] = useState<Tech | null>(null)

    const skillGenerator = () => {
        return techs.map((technology: string, index) => {
            const foundTech: Tech | undefined = technologies.find((t) => t.name === technology);
            return foundTech ?
                <span className={`content-tech ${select == foundTech.name ? "selected" : null} relative z-10 rounded-full`} key={index}>
                    <Image src={foundTech.image} alt="" className="icon relative z-20 cursor-pointer" onClick={() => { setTechFounded(foundTech); setSelect(foundTech.name) }} />
                </span> : null;

        }).filter(Boolean);
    };


    return (
        <div className="skill-content w-full font-luck text-white mt-[13vh]">
            <span className="w-full flex justify-center items-center title-content py-[1%]">
                <h1 className="title mt-3">{title}</h1>
            </span>

            <div className="flex flex-wrap gap-[3vw] py-[5vh] justify-center items-center">
                {skillGenerator()}
            </div>

            <span className="w-full flex flex-col items-center text-dark">
                <h2 className="">{select === "" && !techFounded ? "SELECT A SKILL" : techFounded?.name}</h2>
                <h3 className="">{select === "" && !techFounded ? "click e descubra" : techFounded?.type}</h3>
                <p className="min-h-[20vh] text-center p-[5%] font-maven font-semibold">{select === "" && !techFounded ? "" : techFounded?.description}</p>
            </span>
        </div>
    );
}