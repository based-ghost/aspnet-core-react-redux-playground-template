import { FormActionType } from './types';
import { DROPDOWN_TEST_DATA } from '../../config';

import type { ReduxAction } from '../';
import type { IFormState } from './types';

const initialState: IFormState = {
  count: 0,
  checked: false,
  selectedOption: DROPDOWN_TEST_DATA[0]
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
      const { selectedOption } = action.payload;

      return {
        ...state,
        selectedOption
      };
    }
    case FormActionType.CHECKBOX_CHECK: {
      const { checked } = action.payload;

      return {
        ...state,
        checked
      };
    }
    default:
      return state;
  }
};