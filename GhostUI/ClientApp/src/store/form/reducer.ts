import { ReduxAction } from '../';
import { FormActionType, IFormState } from './types';
import { DROPDOWN_TEST_DATA } from '../../config/constants';

const initialState: IFormState = {
  count: 0,
  checkboxValue: false,
  selectedDropdownOption: DROPDOWN_TEST_DATA[0]
};

export const reducer = (
  state: IFormState = initialState,
  action: ReduxAction<any>
): IFormState => {
  switch (action.type) {
    case FormActionType.INCREMENT: {
      return {
        ...state,
        count: (state.count + 1)
      };
    }
    case FormActionType.DECREMENT: {
      return {
        ...state,
        count: (state.count - 1)
      };
    }
    case FormActionType.DROPDOWN_SELECT: {
      const { option = DROPDOWN_TEST_DATA[0] } = action.payload;

      return {
        ...state,
        selectedDropdownOption: option
      };
    }
    case FormActionType.CHECKBOX_CHECK: {
      const { checked } = action.payload;

      return {
        ...state,
        checkboxValue: !!checked
      };
    }
    default:
      return state;
  }
};