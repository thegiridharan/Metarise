"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        const response = localStorage.getItem(key);
        return response ? JSON.parse(response) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};