"use client"

import { useState, createContext, useEffect } from "react";

type View = {
    currentView: String;
    changeView: (name: String) => void;
}
//contexto
const viewContext = createContext<View>({} as View);

//provedor
const ViewProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentView, setCurrentView] = useState<String>("loading");

    const changeView = (name: String) => {
        setCurrentView(name);
    }

    useEffect(() => {
        const home = document.querySelector(".home");
        if (home instanceof HTMLElement) {
            if (currentView == "dragon_intro") home.style.overflow = "hidden";
            else home.style.overflow = "scroll";
        }
    }, [currentView])

    return (
        <viewContext.Provider value={{
            currentView,
            changeView,
        }}>
            <>
                {children}
            </>
        </viewContext.Provider>
    );
}

export { ViewProvider, viewContext };