
import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean = false): [boolean, (() => void)] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((prevState) => !prevState), []);

  return [state, toggle];
};