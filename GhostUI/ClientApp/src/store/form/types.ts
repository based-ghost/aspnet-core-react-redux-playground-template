export type IDropdownOption = {
  readonly value: number;
  readonly label: string;
};

export type IFormState = {
  readonly count: number;
  readonly checkboxValue: boolean;
  readonly selectedDropdownOption: IDropdownOption;
};

export enum FormActionType {
  INCREMENT = 'form/increment',
  DECREMENT = 'form/decrement',
  CHECKBOX_CHECK = 'form/checkbox_check',
  DROPDOWN_SELECT = 'form/dropdown_select'
};
