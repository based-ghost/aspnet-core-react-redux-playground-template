import * as React from 'react';

type CheckboxProps = {
    checked: boolean;
    disabled?: boolean;
    parentClass?: string;
    controlClass?: string;
    trailingLabel?: string;
    dispatchHandler: Function;
};

export default class Checkbox extends React.PureComponent<CheckboxProps> {
    static defaultProps = {
        parentClass: '',
        controlClass: ''
    };

    public render(): React.ReactNode {
        return (
            <div className={`control ${this.props.parentClass}`}>
                <p className={`checkbox-control ${this.props.controlClass}`}>
                    <label>
                        <input type='checkbox'
                               disabled={this.props.disabled}
                               defaultChecked={!!this.props.checked}
                               onClick={this.handleCheckboxClick} />
                        <i className='helper'></i>
                        { this.props.trailingLabel ? <span>{this.props.trailingLabel}</span> : null }
                    </label>
                </p>
            </div>
        );
    }

    private handleCheckboxClick: React.MouseEventHandler<HTMLInputElement> = (e) => this.props.dispatchHandler(!!e.currentTarget.checked);
}