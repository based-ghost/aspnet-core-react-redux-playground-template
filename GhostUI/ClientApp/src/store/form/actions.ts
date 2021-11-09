import { FormActionType } from './types';

import type { ReduxAction } from '../';
import type { FormPayload, IDropdownOption } from './types';

export const actionCreators = {
  increment: (): ReduxAction => ({
    type: FormActionType.INCREMENT,
  }),
  decrement: (): ReduxAction => ({
    type: FormActionType.DECREMENT,
  }),
  handleOnCheck: (checked: boolean): ReduxAction<FormPayload> => ({
    payload: { checked },
    type: FormActionType.CHECKBOX_CHECK,
  }),
  selectOption: (
    selectedOption: IDropdownOption
  ): ReduxAction<FormPayload> => ({
    payload: { selectedOption },
    type: FormActionType.DROPDOWN_SELECT,
  }),
};