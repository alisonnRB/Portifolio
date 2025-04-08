"use client";
import "./skillExplain.css";

import Image from "next/image";
import texture from "@/components/source/player2_texture.png";
import { useState } from "react";
import { Tech, technologies } from "@/scripts/tech";

export default function SkillExplain({ title, techs }: { title: string; techs: string[] }) {
    const [select, setSelect] = useState<string>("")
    const [techFounded, setTechFounded] = useState<Tech | null>(null)
    const [hover, setHover] = useState<string>("");

    const skillGenerator = () => {
        return techs.map((technology: string, index) => {
            const foundTech: Tech | undefined = technologies.find((t) => t.name === technology);
            return foundTech ?
                <span className={`content-tech ${select == foundTech.name ? "selected" : null} ${hover == foundTech.name ? "selected" : null} relative z-10 rounded-full`} key={index}>
                    <Image src={foundTech.image} alt="" className="icon relative z-20 cursor-pointer" onClick={() => { setTechFounded(foundTech); setSelect(foundTech.name) }} onMouseEnter={() => { setHover(foundTech.name) }} onMouseLeave={() => { setHover("") }} />
                </span> : null;

        }).filter(Boolean);
    };


    return (
        <div className="skill-content w-full font-luck text-white mt-[13vh]">
            <div className="w-full relative flex justify-center items-center py-[1%] h-[20vh]">

                <Image
                    src={texture}
                    alt="background"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover z-0"
                    priority
                />

                <div className="z-10 flex justify-center items-center w-full">
                    <h1 className="title mt-3">{title}</h1>
                </div>
            </div>

            <div className="flex flex-wrap gap-[2vw] py-[5vh] justify-center items-center">
                {skillGenerator()}
            </div>

            <span className="w-full flex flex-col items-center text-dark">
                <h2 className="name-title">{select === "" && !techFounded ? "SELECT A SKILL" : techFounded?.name}</h2>
                <h3 className="type-title">{select === "" && !techFounded ? "click e descubra" : techFounded?.type}</h3>
                <p className="desc-text min-h-[30%] text-center p-[5%]">{select === "" && !techFounded ? "" : techFounded?.description}</p>
            </span>
        </div>
    );
}