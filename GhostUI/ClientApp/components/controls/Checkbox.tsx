import * as React from 'react';

type CheckboxProps = {
    checked: boolean;
    disabled?: boolean;
    wrapperClass?: string;
    controlClass?: string;
    trailingLabel?: string;
    dispatchHandler: Function;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const handleCheckboxClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
        props.dispatchHandler(!!e.currentTarget.checked);
    };

    return (
        <div className={`control ${props.wrapperClass || ''}`}>
            <p className={`checkbox-control ${props.controlClass || ''}`}>
                <label>
                    <input type='checkbox'
                           disabled={props.disabled}
                           defaultChecked={!!props.checked}
                           onClick={handleCheckboxClick} />
                    <i className='helper'></i>
                    { props.trailingLabel && <span>{props.trailingLabel}</span> }
                </label>
            </p>
        </div>
    );
};

export default Checkbox;

/**
 * ORIGINAL CLASS IMPLEMENTATION
 */

//export default class Checkbox extends React.PureComponent<CheckboxProps> {
//    static defaultProps = {
//        wrapperClass: '',
//        controlClass: ''
//    };

//    public render(): React.ReactNode {
//        return (
//            <div className={`control ${this.props.wrapperClass}`}>
//                <p className={`checkbox-control ${this.props.controlClass}`}>
//                    <label>
//                        <input type='checkbox'
//                               disabled={this.props.disabled}
//                               defaultChecked={!!this.props.checked}
//                               onClick={this.handleCheckboxClick} />
//                        <i className='helper'></i>
//                        { this.props.trailingLabel && <span>{this.props.trailingLabel}</span> }
//                    </label>
//                </p>
//            </div>
//        );
//    }

//    private handleCheckboxClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
//        this.props.dispatchHandler(!!e.currentTarget.checked);
//    }
//}