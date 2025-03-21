"use client";

import { useEffect } from "react";
import { widthAdjuster } from "@/scripts/widthAdjuster";
import { StaticImageData } from "next/image";

export default function Camada({
    img,
    camada,
    zIndex,
    bottom,
    num
}: {
    img: StaticImageData;
    camada: string;
    zIndex: number;
    bottom: number;
    num: number;
}) {

    useEffect(() => {
        widthAdjuster("." + camada, img);
    }, [camada, img]);

    return (
        <span className="absolute flex flex-col justify-end h-full w-full" style={{ zIndex }}>
            <div
                className={`absolute overflow-hidden ${camada} ${num ? "num" + num : null} shrink-0`}
                style={{ zIndex, bottom: `${bottom}dvh` }}
            ></div>
        </span>
    );
}

