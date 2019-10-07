export interface IActionType {
    readonly NAMESPACE: string;
    readonly INCREMENT: string;
    readonly DECREMENT: string;
    readonly DROPDOWN_SELECT: string;
    readonly CHECK_SAMPLE_BOX: string;
}

export const ActionType: IActionType = {
    NAMESPACE: 'form',
    INCREMENT: 'form/increment',
    DECREMENT: 'form/decrement',
    DROPDOWN_SELECT: 'form/dropdownSelect',
    CHECK_SAMPLE_BOX: 'form/checkSampleBox'
};

export interface IDropdownOption {
    value: number;
    label: string;
}

export interface IFormState {
    readonly count: number;
    readonly checkboxValue: boolean;
    readonly selectedDropdownOption: IDropdownOption;
}

export interface IFormAction {
    readonly type: string;
    readonly option?: IDropdownOption;
    readonly checked?: boolean;
}