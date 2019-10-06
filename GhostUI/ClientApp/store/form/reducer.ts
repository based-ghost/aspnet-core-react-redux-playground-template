import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { ActionType, IFormState } from './types';
import { DROPDOWN_TEST_DATA } from '../../config/constants';

const initialState = (): IFormState => {
    return {
        count: 0,
        checkboxValue: false,
        selectedDropdownOption: {
            value: 1,
            label: 'Option 1'
        }
    };
};

export const reducer = (state: IFormState = initialState(), action: FunctionReturnTypes<typeof actionCreators>) => {
    if (!action.type.startsWith(ActionType.NAMESPACE)) {
        return state;
    }

    switch (action.type) {
        case ActionType.INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            };
        case ActionType.DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        case ActionType.DROPDOWN_SELECT:
            return {
                ...state,
                selectedDropdownOption: action.option || DROPDOWN_TEST_DATA[0]
            };
        case ActionType.CHECK_SAMPLE_BOX:
            return {
                ...state,
                checkboxValue: !!action.checked,
            };
        default:
            return state;
    }
};