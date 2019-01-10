export interface IActionType {
    INCREMENT: string;
    DECREMENT: string;
    DROPDOWN_SELECT: string;
    CHECK_SAMPLE_BOX: string;
}

export const ActionType: IActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    DROPDOWN_SELECT: 'DROPDOWN_SELECT',
    CHECK_SAMPLE_BOX: 'CHECK_SAMPLE_BOX'
};

export interface DropdownOption {
    value: number;
    label: string;
}

export interface FormState {
    readonly count: number;
    readonly checkboxValue: boolean;
    readonly selectedDropdownOption: DropdownOption;
}

export interface FormAction {
    readonly type: string;
    readonly option?: DropdownOption;
    readonly checked?: boolean;
}