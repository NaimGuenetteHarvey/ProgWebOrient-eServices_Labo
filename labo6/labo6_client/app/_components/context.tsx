"use client";

import { createContext, useState } from "react";

// Déclaration du context
export const CounterContext = createContext<any>(undefined);

// ContextWrapper va recevoir les children du layout racine et les intégrer dans son HTML à la place du layout racine.
export function ContextWrapper({ children } : { children : React.ReactNode }){

    // Déclaration d'un état qui sera mis dans le CounterContext. Valeur de départ à 0.
    const [counter, setCounter] = useState<number>(0);
    const [quiz, setQuiz] = useState<number>(0);
    const [survie, setSurvie] = useState<number>(0);

    return (
         <CounterContext.Provider 
            value={{ 
                counter, 
                setCounter, 
                quiz, 
                setQuiz, 
                survie, 
                setSurvie 
            }}
        >
            {children}
        </CounterContext.Provider>
    );

}