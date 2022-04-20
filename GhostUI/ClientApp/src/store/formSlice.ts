import { DROPDOWN_TEST_DATA } from '../config';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type IDropdownOption = Readonly<{
  value: number;
  label: string;
}>;

export type IFormState = Readonly<{
  count: number;
  checked: boolean;
  selectedOption: IDropdownOption;
}>;

const initialState: IFormState = {
  count: 0,
  checked: false,
  selectedOption: DROPDOWN_TEST_DATA[0]
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    handleOnCheck: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
    selectOption: (state, action: PayloadAction<IDropdownOption>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { increment, decrement, handleOnCheck, selectOption } = formSlice.actions;

export default formSlice.reducer;