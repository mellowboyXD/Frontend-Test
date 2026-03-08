import { useEffect, useState } from "react";

/* Custom hook that can be used the same way as useState.
 * Used specifically to store data on localStorage. */

export default function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        return getLocalStorage(key, initialValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue] as const;
}

function getLocalStorage<T>(key: string, initialValue: T) {
    if (typeof window === 'undefined') return initialValue; /* localStorage is not defined on the server */

    const val = localStorage.getItem(key);
    if (val)
        return JSON.parse(val) as T; /* make sure to return it as the correct type */

    if (initialValue instanceof Function) return initialValue();

    return initialValue;
}

