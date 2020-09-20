import { FormActionType, IDropdownOption } from './types';

export const actionCreators = {
  increment: () => ({
    type: FormActionType.INCREMENT
  }),
  decrement: () => ({
    type: FormActionType.DECREMENT
  }),
  handleOnCheck: (checked: boolean) => ({
    checked,
    type: FormActionType.CHECKBOX_CHECK
  }),
  selectOption: (option: IDropdownOption) => ({
    option,
    type: FormActionType.DROPDOWN_SELECT
  })
};