import { ActionType, DropdownOption, FormAction } from './types';

export const actionCreators = {
    increment: (): FormAction => ({ type: ActionType.INCREMENT }),
    decrement: (): FormAction => ({ type: ActionType.DECREMENT }),
    doCheck: (checked: boolean): FormAction => ({ type: ActionType.CHECK_SAMPLE_BOX, checked: checked }),
    selectOption: (option: DropdownOption): FormAction => ({ type: ActionType.DROPDOWN_SELECT, option: option })
};