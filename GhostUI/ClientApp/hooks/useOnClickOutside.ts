import React, { useEffect } from 'react';
import { CallbackFunction } from '../types';

// Wrap the handleOutsideClick & handleInsideClick in useCallback prior to passing to this hook to optimize ...
// ... otherwise the event listeners will be created and torn down on every render
export const useOnClickOutside = (
    ref: React.MutableRefObject<HTMLElement | null>,
    handleOutsideClick: CallbackFunction,
    handleInsideClick: CallbackFunction
): void => {
    useEffect(() => {
        const handleClick = (e: any): void => {
            if (!ref.current)
                return;

            if (ref.current.contains(e.target)) {
                handleInsideClick && handleInsideClick();
            } else {
                handleOutsideClick && handleOutsideClick();
            }
        };

        document.addEventListener('click', handleClick);
        document.addEventListener('touchend', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchend', handleClick);
        };
    }, [ref, handleOutsideClick, handleInsideClick]);
};