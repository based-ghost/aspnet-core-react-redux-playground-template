import { ReduxAction } from '../';
import { ActionType, IDropdownOption } from './types';

export const actionCreators = {
    increment: (): ReduxAction => ({ type: ActionType.INCREMENT }),
    decrement: (): ReduxAction => ({ type: ActionType.DECREMENT }),
    handleOnCheck: (checked: boolean): ReduxAction => ({ type: ActionType.CHECK_SAMPLE_BOX, checked: checked }),
    selectOption: (option: IDropdownOption): ReduxAction => ({ type: ActionType.DROPDOWN_SELECT, option: option })
};