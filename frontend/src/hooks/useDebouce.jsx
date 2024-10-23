import { useEffect, useState } from "react";

export default function useDebouce(initializeValue = "", delay = 500) {
    const [debouce, setDebouceValue] = useState(initializeValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouceValue(initializeValue)
        }, delay)

        return () => clearTimeout(timer);
    }, [delay, initializeValue]);

    return debouce
}