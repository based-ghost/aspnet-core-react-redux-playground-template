import { ReduxAction } from '../';
import { FormActionType, IDropdownOption } from './types';

export const actionCreators = {
  increment: (): ReduxAction => ({
    type: FormActionType.INCREMENT
  }),
  decrement: (): ReduxAction => ({
    type: FormActionType.DECREMENT
  }),
  handleOnCheck: (checked: boolean): ReduxAction<{ checked: boolean }> => ({
    payload: { checked },
    type: FormActionType.CHECKBOX_CHECK
  }),
  selectOption: (option: IDropdownOption): ReduxAction<{ option: IDropdownOption }> => ({
    payload: { option },
    type: FormActionType.DROPDOWN_SELECT
  })
};