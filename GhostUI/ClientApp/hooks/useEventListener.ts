import { useRef, useEffect } from 'react';

/**
 * Name: useEventListener
 * Use: handles checking if addEventListener is supported for element, adding the event listener, and removal on cleanup.
 */
export const useEventListener = (eventName: string, handler: any, element: HTMLElement | Document | null = document) => {
    // Create a ref that stores handler (Setting initial to null to get rid of annoting reference is possibly undefined TypeScript warning)
    const savedHandler = useRef(null);

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // Make sure element supports addEventListener
        const isSupported = element && element.addEventListener;
        if (!isSupported) {
            const warnMsg = element ? `${element.nodeName} does not support addEventListener` : 'element is null or undefined'; 
            console.warn(`[useEventListener:] ${warnMsg}`);
            return;
        }

        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);

        // Add event listener
        element.addEventListener(eventName, eventListener);

        // Remove event listener on cleanup
        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]); // Re-run if eventName or element changes
};