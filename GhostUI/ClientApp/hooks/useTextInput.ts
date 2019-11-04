import { useState, useCallback, useMemo, ChangeEvent } from 'react';

export type TextInputType = 'text' | 'password';

export type TextInput = {
  readonly value: string;
  readonly hasValue: boolean;
  readonly clear: () => void;
  readonly bindToInput: {
    value: string;
    type: TextInputType;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

export const useTextInput = (
  initial: string = '',
  type: TextInputType = 'text',
): TextInput => {
  const [value, setValue] = useState(initial);
  const clear = useCallback(() => setValue(''), []);
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => setValue(e.currentTarget.value), []);

  const textInput = useMemo<TextInput>(() => ({
    value,
    clear,
    hasValue: !!(value && value.trim()),
    bindToInput: {
      type,
      value,
      onChange,
    },
  }), [value, type, onChange, clear]);

  return textInput;
};
