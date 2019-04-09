import { useEffect, useState } from 'react';

interface IOptions {
    src?: string;
    async?: boolean;
    container?: string;
}

const defaults: IOptions = {
    async: true,
    container: 'body'
};

let cachedScripts = [];

export function useDynamicScript(options: IOptions = {}) {
    const [state, setState] = useState({
        loaded: false,
        error: false
    });

    useEffect(() => {
        if (cachedScripts.includes(options.src)) {
            setState({
                loaded: true,
                error: false
            });
            return;
        }

        cachedScripts.push(options.src);

        const containerElem = options.container || defaults.container;
        const loadAsync = options.hasOwnProperty('async') ? options.async !== false : defaults.async;

        let script = document.createElement('script');
        script.src = options.src;
        script.async = loadAsync;

        const onScriptLoad = () => {
            setState({
                loaded: true,
                error: false
            });
        };

        const onScriptError = () => {
            const scriptIndex = cachedScripts.indexOf(options.src);
            if (scriptIndex >= 0) {
                cachedScripts.splice(scriptIndex, 1);
            }

            script.remove();

            setState({
                loaded: true,
                error: true
            });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        if (containerElem === defaults.container) {
            document.body.appendChild(script);
        } else {
            document.head.appendChild(script);
        }

        return () => {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
        };
    }, [options.src]);

    return [state.loaded, state.error];
}