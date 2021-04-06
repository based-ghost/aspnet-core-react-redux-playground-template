import { useState, useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';

const useTextInput = (
  initial: string = '',
  type: 'text' | 'password' = 'text',
) => {
  const [value, setValue] = useState<string>(initial);
  const clear = useCallback(() => setValue(''), []);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value), []);

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

export default useTextInput;
