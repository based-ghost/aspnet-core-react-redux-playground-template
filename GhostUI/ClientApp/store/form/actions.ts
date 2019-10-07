import { ActionType, IDropdownOption, IFormAction } from './types';

export const actionCreators = {
    increment: (): IFormAction => ({ type: ActionType.INCREMENT }),
    decrement: (): IFormAction => ({ type: ActionType.DECREMENT }),
    handleOnCheck: (checked: boolean): IFormAction => ({ type: ActionType.CHECK_SAMPLE_BOX, checked: checked }),
    selectOption: (option: IDropdownOption): IFormAction => ({ type: ActionType.DROPDOWN_SELECT, option: option })
};