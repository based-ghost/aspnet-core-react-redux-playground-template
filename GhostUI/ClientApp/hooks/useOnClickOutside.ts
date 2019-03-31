import { useEffect } from 'react';
import { CallbackFunction } from '../types/index';

/**
 * Name: useOnClickOutside
 * Use: handles if a click event occurred on or within a specific node, otherwise click happened outside.
 */
export const useOnClickOutside = (ref: any, onOutsideClick: CallbackFunction, onInsideClick: CallbackFunction) => {
    const handleClick = (e) => {
        if (!ref.current) return;

        if (ref.current.contains(e.target)) {
            onInsideClick && onInsideClick();
        } else {
            onOutsideClick && onOutsideClick();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('touchend', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchend', handleClick);
        };
    }, [ref]);
};