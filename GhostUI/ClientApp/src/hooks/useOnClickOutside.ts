import { useEffect, MutableRefObject } from 'react';
import { CallbackFunction } from '../types';

// Wrap the handleOutsideClick & handleInsideClick in useCallback prior to passing to this hook to optimize ...
// ... otherwise the event listeners will be created and torn down on every render
export const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handlerFn: CallbackFunction
): void => {
  useEffect(() => {
    const onClickHandler = (e: Event): any => !ref.current?.contains(e.target as Node) && handlerFn();

    document.addEventListener('click', onClickHandler);
    document.addEventListener('touchend', onClickHandler);

    return () => {
      document.removeEventListener('click', onClickHandler);
      document.removeEventListener('touchend', onClickHandler);
    };
  }, [ref, handlerFn]);
};
