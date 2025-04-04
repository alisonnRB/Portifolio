import IHM from "@/components/myWorks/source/bg1.png";
import { StaticImageData } from "next/image";

export type Project = {
    name: string;
    title: string;
    resume: string;
    description: string;
    image: StaticImageData;
    skills: string[];
    keywords: string[];
    github: string;
    site: string;
    figmaPrototype: string;
};

const projects: Project[] = [
    {
        name: "IHM",
        title: "IHM - A SOCIAL MEDIA TO WRITERS",
        resume: "A social media for readers and writers",
        description:
            "O IHM (Indicação, História e Memória) é uma rede social voltada para leitores, criada como projeto de conclusão do meu curso técnico. A plataforma permite que os usuários descubram novos livros, compartilhem resenhas, troquem recomendações e interajam em comunidades literárias. Desenvolvi funcionalidades como perfis personalizados, feed de postagens, sistema de comentários e um algoritmo simples de sugestões de leitura, focando em promover uma experiência dinâmica e envolvente para amantes da literatura.\n \n A criação do IHM me proporcionou grande aprendizado em desenvolvimento web, banco de dados, lógica de programação e design de interfaces — reforçando minha habilidade de transformar ideias em soluções digitais.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "react", "php"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
    {
        name: "MODERN SPACE",
        title: "MODERN SPACE - MÓVEIS MODERNOS",
        resume: "Modern Space um e-commerce de móveis contemporâneos.",
        description:
            "ModernSpace é um e-commerce de móveis contemporâneos, oferecendo design elegante e funcionalidade para todos os ambientes. Descubra peças exclusivas e transforme seus espaços com sofisticação e estilo.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "react", "tailwind"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
    {
        name: "CATCH BEER",
        title: "CATCH BEER - DELIVERY DE BEBIDAS",
        resume: "Cacthe Beer é um site de delivery de bebidas",
        description:
            "Cacthe Beer é um site de delivery de bebidas que facilita a compra online com um catálogo diversificado. Com design intuitivo e navegação fácil, oferece uma experiência prática e eficiente para os amantes de bebidas.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "next", "tailwind"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },

    {
        name: "ANALIST COLOR",
        title: "ANALIST COLOR - EXTRATOR DE CORES",
        resume: "Ferramenta capaz de extrair cores de imagens.",
        description:
            "Uma ferramenta para capturar informações de cores em imagens, feita para auxiliar no designs, usando calculos como proporção aurea.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "vue", "sass", "php", "laravel"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
    {
        name: "MY QUEST",
        title: "MY QUEST - GERADOR DE QUIZ COM IA",
        resume: "Ferramenta que gera quiz sobre qualquer tema usando IA.",
        description:
            "Uma ferramenta para capturar informações de cores em imagens, feita para auxiliar no designs, usando calculos como proporção aurea.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "react", "tailwind"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
    {
        name: "LIGTHS",
        title: "LIGTHS - JOGO DA MEMÓRIA",
        resume: "Jogo de memórizar as cores e luzes",
        description:
            "Lights é um jogo de memorização que tem como objetivo estimular o aspecto visual em função das luzes.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "react", "sass"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
    {
        name: "PALABRARIA",
        title: "PALABRARIA - DICIONÁRIO DE ESPANHOL",
        resume: "O palabraria é um dicionário virtual livre e acessivel de lingua espanhola",
        description:
            "o palabraria é um dicionário virtual livre e acessivel de lingua espanhola, criado para ser alimentado com trabalho mutuo entre instituições.",
        image: IHM,
        skills: ["javascript", "html", "css", "git", "react", "sass", "php", "mysql"],
        keywords: ["API", "Responsive", "JWT", "Axios", "WebSocket", "Cryptography"],
        github: "https://github.com/alisonnRB",
        site: "https://ihm.vercel.app",
        figmaPrototype: "https://figma.com/prototipo"
    },
];

export { projects };
