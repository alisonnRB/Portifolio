import { StaticImageData } from "next/image";

import javascript from "@/app/icons/javascript.png";
import php from "@/app/icons/php.png";

export type Tech = {
    name: string;
    image: StaticImageData;
    type: string;
    description: string;
}

const technologies: Tech[] = [
    {
        name: "javascript",
        image: javascript,
        type: "programing language",
        description: "Javascript é uma linguegem de programação utilizADA PARA MANIPULAÇÃO DO dom, POSSUI UMA FUNÇÃO IMPORTANTE COMPLEXIFICANDO WEBSITES E PRODUZINDO INFORMAÇÕES QUE PRECISA DE MAIS LÓGICA, ATUA NO LADO CLIENTE DO SISTEMA."
    },
    {
        name: "php",
        image: php,
        type: "programing language",
        description: "Javascript é uma linguegem de programação utilizADA PARA MANIPULAÇÃO DO dom, POSSUI UMA FUNÇÃO IMPORTANTE COMPLEXIFICANDO WEBSITES E PRODUZINDO INFORMAÇÕES QUE PRECISA DE MAIS LÓGICA, ATUA NO LADO CLIENTE DO SISTEMA."
    }
];

export { technologies };