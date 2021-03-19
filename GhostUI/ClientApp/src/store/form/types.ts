/* eslint-disable @typescript-eslint/no-redeclare */

export const FormActionType = {
  INCREMENT: 'form/increment',
  DECREMENT: 'form/decrement',
  CHECKBOX_CHECK: 'form/checkbox_check',
  DROPDOWN_SELECT: 'form/dropdown_select'
} as const;

export type FormActionType = typeof FormActionType[keyof typeof FormActionType];

export type IDropdownOption = Readonly<{
  value: number;
  label: string;
}>;

export type IFormState = Readonly<{
  count: number;
  checkboxValue: boolean;
  selectedDropdownOption: IDropdownOption;
}>;