import { useState, useCallback, useMemo, ChangeEvent } from 'react';

export const useTextInput = (
  initial: string = '',
  type: 'text' | 'password' = 'text',
) => {
  const [value, setValue] = useState<string>(initial);
  const clear = useCallback((): void => setValue(''), []);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => setValue(e.currentTarget.value), []);

  return useMemo(() => ({
    value,
    clear,
    hasValue: !!value?.trim(),
    bindToInput: {
      type,
      value,
      onChange
    }
  }), [value, type, onChange, clear]);
};
