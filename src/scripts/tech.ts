import { StaticImageData } from "next/image";

import csharp from "@/app/icons/csharp.png";
import css from "@/app/icons/css.png";
import git from "@/app/icons/git.png";
import html from "@/app/icons/html.png";
import java from "@/app/icons/java.png";
import typescript from "@/app/icons/typescript.png";
import javascript from "@/app/icons/javascript.png";
import laravel from "@/app/icons/laravel.png";
import mysql from "@/app/icons/mysql.png";
import php from "@/app/icons/php.png";
import postgresql from "@/app/icons/postgreesql.png";
import python from "@/app/icons/python.png";
import react from "@/app/icons/react.png";
import sass from "@/app/icons/sass.png";
import tailwind from "@/app/icons/tailwind.png";
import next from "@/app/icons/next.png";

export type Tech = {
    name: string;
    image: StaticImageData;
    type: string;
    description: string;
}

const technologies: Tech[] = [
    {
        name: "csharp",
        image: csharp,
        type: "programming language",
        description: "C# é uma linguagem de programação moderna e orientada a objetos desenvolvida pela Microsoft, amplamente utilizada no desenvolvimento de aplicações desktop, jogos com Unity e sistemas empresariais."
    },
    {
        name: "css",
        image: css,
        type: "styling language",
        description: "CSS é uma linguagem de estilos usada para definir a aparência de documentos HTML, permitindo customizar cores, layouts, fontes e animações, tornando os sites mais atraentes e responsivos."
    },
    {
        name: "git",
        image: git,
        type: "version control system",
        description: "Git é um sistema de controle de versões distribuído que permite rastrear mudanças no código-fonte, facilitar colaboração entre desenvolvedores e gerenciar diferentes versões de um projeto."
    },
    {
        name: "html",
        image: html,
        type: "markup language",
        description: "HTML é a linguagem de marcação utilizada para estruturar páginas web, definindo elementos como títulos, parágrafos, imagens e links, servindo como base para o desenvolvimento de sites."
    },
    {
        name: "java",
        image: java,
        type: "programming language",
        description: "Java é uma linguagem de programação popular, orientada a objetos e multiplataforma, amplamente utilizada para desenvolvimento de aplicações web, desktop, mobile e sistemas empresariais."
    },
    {
        name: "javascript",
        image: javascript,
        type: "programming language",
        description: "JavaScript é uma linguagem de programação utilizada para manipulação do DOM, tornando websites dinâmicos e interativos. Atua no lado cliente e também no servidor com Node.js."
    },
    {
        name: "typescript",
        image: typescript,
        type: "programming language",
        description: "TypeScript é um superset do JavaScript que adiciona tipagem estática e recursos avançados, facilitando a manutenção e escalabilidade de aplicações web."
    },
    {
        name: "laravel",
        image: laravel,
        type: "framework",
        description: "Laravel é um framework PHP que simplifica o desenvolvimento web ao fornecer ferramentas poderosas para autenticação, roteamento, banco de dados e segurança."
    },
    {
        name: "mysql",
        image: mysql,
        type: "database",
        description: "MySQL é um sistema de gerenciamento de banco de dados relacional amplamente utilizado para armazenar e manipular dados em aplicações web e empresariais."
    },
    {
        name: "php",
        image: php,
        type: "programming language",
        description: "PHP é uma linguagem de programação server-side usada para o desenvolvimento de sites dinâmicos e aplicações web, sendo amplamente compatível com bancos de dados."
    },
    {
        name: "postgresql",
        image: postgresql,
        type: "database",
        description: "PostgreSQL é um sistema de gerenciamento de banco de dados relacional avançado, conhecido por sua confiabilidade, extensibilidade e suporte a SQL avançado."
    },
    {
        name: "python",
        image: python,
        type: "programming language",
        description: "Python é uma linguagem de programação versátil, fácil de aprender e amplamente usada em ciência de dados, automação, desenvolvimento web e inteligência artificial."
    },
    {
        name: "react",
        image: react,
        type: "library",
        description: "React é uma biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas, sendo amplamente utilizada no desenvolvimento de aplicações web modernas."
    },
    {
        name: "Sass",
        image: sass,
        type: "preprocessor",
        description: "Sass é um pré-processador CSS que adiciona funcionalidades como variáveis, aninhamento e mixins, tornando o código CSS mais organizado e reutilizável."
    },
    {
        name: "tailwind",
        image: tailwind,
        type: "CSS framework",
        description: "Tailwind CSS é um framework de estilos utilitário que permite construir interfaces modernas e responsivas rapidamente, sem a necessidade de escrever CSS tradicional."
    },
    {
        name: "next",
        image: next,
        type: "framework",
        description: "Tailwind CSS é um framework de estilos utilitário que permite construir interfaces modernas e responsivas rapidamente, sem a necessidade de escrever CSS tradicional."
    }
];

export { technologies };