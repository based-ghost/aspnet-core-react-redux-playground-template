import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, FormState } from './types';
import { DROPDOWN_TEST_DATA } from '../../config/constants';

const initialState = () => {
    return {
        count: 0,
        checkboxValue: false,
        selectedDropdownOption: {
            value: 1,
            label: 'Option 1'
        }
    } as FormState;
};

export const reducer = (state: FormState = initialState(), action: FunctionReturnTypes<typeof actionCreators>) => {
    // If current action is not pertinent to this reducer, skip remainder of checks
    if (!action.type.startsWith(ActionType.NAMESPACE)) {
        return state;
    }

    switch (action.type) {
        case ActionType.INCREMENT:
            return {
                count: state.count + 1,
                checkboxValue: state.checkboxValue,
                selectedDropdownOption: state.selectedDropdownOption
            };
        case ActionType.DECREMENT:
            return {
                count: state.count - 1,
                checkboxValue: state.checkboxValue,
                selectedDropdownOption: state.selectedDropdownOption
            };
        case ActionType.DROPDOWN_SELECT:
            return {
                count: state.count,
                checkboxValue: state.checkboxValue,
                selectedDropdownOption: action.option || DROPDOWN_TEST_DATA[0]
            };
        case ActionType.CHECK_SAMPLE_BOX:
            return {
                count: state.count,
                checkboxValue: !!action.checked,
                selectedDropdownOption: state.selectedDropdownOption
            };
        default:
            return state;
    }
};