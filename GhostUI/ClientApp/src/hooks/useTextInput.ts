import { useState, useCallback, useMemo, ChangeEvent } from 'react';

export type TextInputType = 'text' | 'password';

export const useTextInput = (
  initial: string = '',
  type: TextInputType = 'text',
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
