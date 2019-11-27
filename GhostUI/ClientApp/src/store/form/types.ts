export interface IActionType {
  readonly INCREMENT: string;
  readonly DECREMENT: string;
  readonly DROPDOWN_SELECT: string;
  readonly CHECK_SAMPLE_BOX: string;
}

export type IDropdownOption = {
  readonly value: number;
  readonly label: string;
};

export type IFormState = {
  readonly count: number;
  readonly checkboxValue: boolean;
  readonly selectedDropdownOption: IDropdownOption;
};

const _namespace = 'form';

export const ActionType = Object.freeze<IActionType>({
  INCREMENT: `${_namespace}/increment`,
  DECREMENT: `${_namespace}/decrement`,
  DROPDOWN_SELECT: `${_namespace}/dropdownSelect`,
  CHECK_SAMPLE_BOX: `${_namespace}/checkSampleBox`
});
