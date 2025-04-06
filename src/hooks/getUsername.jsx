"use client";
import { useState, useEffect } from "react";

export default function getUsername(key, initialValue) {

    const [name, setName] = useState(() => {
        const response = localStorage.getItem(key);
        if (response !== "undefined")
            return response ? JSON.parse(response) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(name));
    }, [key, name]);

    return [name, setName];
};