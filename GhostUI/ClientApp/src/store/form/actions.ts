import { ReduxAction } from '../';
import { ActionType, IDropdownOption } from './types';

export const actionCreators = {
  increment: (): ReduxAction => ({
    type: ActionType.INCREMENT
  }),
  decrement: (): ReduxAction => ({
    type: ActionType.DECREMENT
  }),
  handleOnCheck: (checked: boolean): ReduxAction => ({
    checked: checked,
    type: ActionType.CHECK_SAMPLE_BOX
  }),
  selectOption: (option: IDropdownOption): ReduxAction => ({
    option: option,
    type: ActionType.DROPDOWN_SELECT
  })
};