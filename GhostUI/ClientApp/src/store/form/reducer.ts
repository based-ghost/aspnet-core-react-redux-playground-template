import { FunctionReturnTypes } from '../';
import { actionCreators } from './actions';
import { FormActionType, IFormState } from './types';
import { DROPDOWN_TEST_DATA } from '../../config/constants';

const initialState: IFormState = {
  count: 0,
  checkboxValue: false,
  selectedDropdownOption: DROPDOWN_TEST_DATA[0]
};

export const reducer = (
  state: IFormState = initialState,
  action: FunctionReturnTypes<typeof actionCreators>
): IFormState => {
  switch (action.type) {
    case FormActionType.INCREMENT:
      return {
        ...state,
        count: (state.count + 1)
      };
    case FormActionType.DECREMENT:
      return {
        ...state,
        count: (state.count - 1)
      };
    case FormActionType.DROPDOWN_SELECT:
      const selectedDropdownOption =
        (action as ReturnType<typeof actionCreators.selectOption>).option ||
        DROPDOWN_TEST_DATA[0];

      return {
        ...state,
        selectedDropdownOption
      };
    case FormActionType.CHECKBOX_CHECK:
      const checkboxValue = !!(action as ReturnType<
        typeof actionCreators.handleOnCheck
      >).checked;

      return {
        ...state,
        checkboxValue
      };
    default:
      return state;
  }
};