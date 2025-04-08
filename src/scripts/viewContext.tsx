"use client"

import { useState, createContext, useEffect, useCallback } from "react";

type View = {
    currentView: string;
    changeView: (name: string) => void;
    toNext: (index: number) => void;
}

const viewContext = createContext<View>({} as View);

const ViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentView, setCurrentView] = useState<string>("loading");
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const blockedViews = ["loading", "dragon", "hilda_start"];

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (blockedViews.includes(currentView)) {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' ||
                e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, [currentView]);

    useEffect(() => {
        const sectionElements = document.querySelectorAll("section");
        setSections(Array.from(sectionElements) as HTMLElement[]);

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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
            if (blockedViews.includes(currentView)) {
                home.style.overflow = "hidden";
            } else {
                home.style.overflow = "scroll";
            }
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