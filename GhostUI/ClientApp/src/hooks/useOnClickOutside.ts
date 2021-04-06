import { useRef, useEffect } from 'react';

import type { RefObject } from 'react';

// Events to addEventListener for if not specified
const _defaultEvents = ['mousedown', 'touchstart'];

const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (...args: any[]) => any,
  events: string[] = _defaultEvents
): void => {
  const onClickAwayRef = useRef(onClickAway);

  useEffect(() => {
    onClickAwayRef.current = onClickAway;
  }, [onClickAway]);

  useEffect(() => {
    const onClickHandler = (event: Event): void => {
      const { current: el } = ref;
      !el?.contains(event.target as Node) && onClickAwayRef.current(event);
    };

    events.forEach((e) => document.addEventListener(e, onClickHandler));

    return () => {
      events.forEach((e) => document?.removeEventListener(e, onClickHandler));
    };
  }, [ref, events]);
};

export default useOnClickOutside;
