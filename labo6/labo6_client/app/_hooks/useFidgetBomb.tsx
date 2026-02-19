"use client";
import { useState } from "react";

export function useFidgetBomb() {

    const [countdown, setCountdown] = useState(
        Math.floor(Math.random() * 10) + 1
    );

    function bombClick() {
        setCountdown(prev => Math.max(0, prev - 1));
    }
    function getFidgetBomb() {
        return (
            <div className="bomb" onClick={bombClick}>
                {countdown > 0 ? "💣" : "💥"}
            </div>
        );
    }

    return getFidgetBomb;
}