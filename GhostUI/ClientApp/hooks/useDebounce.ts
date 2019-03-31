import { useEffect, useState } from 'react';

/**
 * Name: useDebounce
 * Use: Use to debounce fast changing values - a debounced value will only reflect the latest value 
 *      when the useDebounce hook has not been called for the specified time period.
 * Example: const [searchTerm, setSearchTerm] = useState('');
 *          const debouncedSearchTerm = useDebounce(searchTerm, 500);
 */
export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};