import { useEffect, MutableRefObject } from 'react';

// Wrap the handleOutsideClick & handleInsideClick in useCallback prior to passing to this hook to optimize ...
// ... otherwise the event listeners will be created and torn down on every render
export const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handlerFn: (...args: any[]) => any
): void => {
  useEffect(() => {
    const onClickHandler = (e: Event) => !ref.current?.contains(e.target as Node) && handlerFn();

    document.addEventListener('click', onClickHandler);
    document.addEventListener('touchend', onClickHandler);

    return () => {
      document.removeEventListener('click', onClickHandler);
      document.removeEventListener('touchend', onClickHandler);
    };
  }, [ref, handlerFn]);
};
