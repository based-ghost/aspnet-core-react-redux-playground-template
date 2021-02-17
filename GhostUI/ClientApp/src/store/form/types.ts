import { actionCreators } from './actions';

const { increment, decrement, handleOnCheck, selectOption } = actionCreators;

export type FormPayload =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof handleOnCheck>
  | ReturnType<typeof selectOption>;

export enum FormActionType {
  INCREMENT = 'form/increment',
  DECREMENT = 'form/decrement',
  CHECKBOX_CHECK = 'form/checkbox_check',
  DROPDOWN_SELECT = 'form/dropdown_select'
};

export type IDropdownOption = Readonly<{
  value: number;
  label: string;
}>;

export type IFormState = Readonly<{
  count: number;
  checkboxValue: boolean;
  selectedDropdownOption: IDropdownOption;
}>;