"use client"

import { useState, createContext, useEffect } from "react";

type View = {
    currentView: string;
    changeView: (name: string) => void;
    toNext: (index: number) => void;
}

//contexto
const viewContext = createContext<View>({} as View);

//provedor
const ViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentView, setCurrentView] = useState<string>("loading");
    const [sections, setSections] = useState<HTMLElement[]>([]);

    useEffect(() => {
        const sectionElements = document.querySelectorAll("section");
        setSections(Array.from(sectionElements) as HTMLElement[]);
    }, []);

    const changeView = (name: string) => {
        setCurrentView(name);
    }

    const toNext = (index: number) => {
        sections[index + 1]?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        console.log(currentView)
        const home = document.querySelector(".home");
        if (home instanceof HTMLElement) {
            if (currentView == "loading" || currentView == "dragon" || currentView == "dragon_idle" || currentView == "hilda" || currentView == "works") home.style.overflow = "hidden";
            else home.style.overflow = "scroll";
        }
    }, [currentView])

    return (
        <viewContext.Provider value={{
            currentView,
            changeView,
            toNext,
        }}>
            <>
                {children}
            </>
        </viewContext.Provider>
    );
}

export { ViewProvider, viewContext };