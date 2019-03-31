import React, { useEffect, useRef, useState } from 'react';
import { checkIsArrayOfObjects } from '../../utils/validation';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

type DropdownProps = {
    options: any[];
    placeholder?: string;
    disabled?: boolean;
    buttonClass?: string;
    wrapperClass?: string;
    labelKey: string;
    selectedOptionLabel?: string;
    dispatchHandler: (option: any) => void;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
    let clickHandlerCache = {};
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [isArrayOfObjects, setIsArrayOfObjects] = useState(checkIsArrayOfObjects(props.options));

    useOnClickOutside(buttonRef, () => setOpen(false), () => setOpen(open => !open));

    useEffect(() => {
        clickHandlerCache = {};
        setIsArrayOfObjects(checkIsArrayOfObjects(props.options));
    }, [props.options]);

    const getOptionLabelName = (option: any): string => {
        return isArrayOfObjects ? (option[props.labelKey] || option[0]) : option;
    };

    const getCachedClickHandler = (option: any, key: any): any => {
        // If no click handler exists for this unique identifier, create one.
        if (!Object.prototype.hasOwnProperty.call(clickHandlerCache, key)) {
            clickHandlerCache[key] = () => props.dispatchHandler(option);
        }
        return clickHandlerCache[key];
    };

    const keyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            // up and down keys
            e.preventDefault();
            setOpen(open => !open);
        } else if (e.keyCode === 27) {
            // Esc key
            buttonRef.current.focus();
            setOpen(false);
        } else if (e.keyCode === 9) {
            // Tab key
            setOpen(false);
        }
    };

    return (
        <div className={`dropdown ${props.wrapperClass || ''} ${open ? 'is-active' : ''}`}>
            <button className={`button ${props.buttonClass || ''}`}
                    type='button'
                    disabled={props.disabled}
                    ref={buttonRef}
                    onKeyDown={keyDownHandler}
                    aria-haspopup='true'
                    aria-controls='dropdown-menu'>
                <span>{props.selectedOptionLabel || props.placeholder}</span>
                <span className='caret-select'></span>
            </button>
            <div className='dropdown-menu' role='menu'>
                <ul className='dropdown-content'>
                    {props.options.map((option: any) => {
                        const optionLbl = getOptionLabelName(option);
                        return (
                            <li key={optionLbl}>
                                <a role='button'
                                   className={`dropdown-item ${optionLbl === props.selectedOptionLabel ? 'selected-option' : ''}`}
                                   onClick={getCachedClickHandler(option, optionLbl)}>
                                    {optionLbl}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;

/**
 * ORIGINAL CLASS IMPLEMENTATION
 */

//type DropdownProps = {
//    options: any[];
//    placeholder?: string;
//    disabled?: boolean;
//    buttonClass?: string;
//    wrapperClass?: string;
//    labelKey?: string;
//    selectedOptionLabel?: string;
//    dispatchHandler: (option: any) => void;
//};

//type DropdownState = typeof initialState;

//const initialState = Object.freeze({
//    open: false,
//    isArrayOfObjects: false
//});

//export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
//    static defaultProps = {
//        labelKey: 'label',
//        wrapperClass: '',
//        buttonClass: '',
//        placeholder: ''
//    };

//    // Object that holds cached functions for onClick handler in options list (avoids rebuilding each re-render)
//    private _clickHandlerCache: any = {};

//    // Element references (ref attribute)
//    private readonly _buttonRef: React.RefObject<HTMLButtonElement>;
//    private readonly _dropdownDivRef: React.RefObject<HTMLDivElement>;

//    constructor(props: DropdownProps) {
//        super(props);

//        // May want to eval isArrayOfObjects in a getDerivedStateFromProps hook to handle dynamic changes to options prop
//        this.state = {
//            ...initialState,
//            isArrayOfObjects: isArrayOfObjects(this.props.options)
//        };

//        this._buttonRef = React.createRef<HTMLButtonElement>();
//        this._dropdownDivRef = React.createRef<HTMLDivElement>();
//    }

//    public componentDidMount(): void {
//        document.addEventListener('click', this.handleClick);
//    }

//    public componentWillUnmount(): void {
//        document.removeEventListener('click', this.handleClick);
//    }

//    public render(): React.ReactNode {
//        return (
//            <div className={`dropdown ${this.props.wrapperClass} ${this.state.open ? 'is-active' : ''}`}>
//                <button className={`button ${this.props.buttonClass}`}
//                    type='button'
//                    disabled={this.props.disabled}
//                    ref={this._buttonRef}
//                    onKeyDown={this.keyDownHandler}
//                    aria-haspopup='true'
//                    aria-controls='dropdown-menu'>
//                    <span>{this.props.selectedOptionLabel || this.props.placeholder}</span>
//                    <span className='caret-select'></span>
//                </button>
//                <div className='dropdown-menu'
//                    role='menu'
//                    ref={this._dropdownDivRef}>
//                    <ul className='dropdown-content'>
//                        {this.props.options.map((option: any) => this.renderListOption(option))}
//                    </ul>
//                </div>
//            </div>
//        );
//    }

//    private renderListOption(option: any): React.ReactNode {
//        const optionLabel = this.getOptionLabelName(option);
//        return (
//            <li key={optionLabel}>
//                <a role='button'
//                    className={`dropdown-item ${optionLabel === this.props.selectedOptionLabel ? 'selected-option' : ''}`}
//                    onClick={this.getCachedClickHandler(option, optionLabel)}>
//                    {optionLabel}
//                </a>
//            </li>
//        );
//    }

//    private toggleOpenState(newValue: boolean): void {
//        this.setState({ open: newValue });
//    }

//    private getOptionLabelName(option: any): string {
//        return this.state.isArrayOfObjects ? (option[this.props.labelKey!] || option[0]) : option;
//    }

//    // Generate and/or return a click handler, given a unique identifier.
//    private getCachedClickHandler(option: any, key: any): any {
//        // If no click handler exists for this unique identifier, create one.
//        if (!Object.prototype.hasOwnProperty.call(this._clickHandlerCache, key)) {
//            this._clickHandlerCache[key] = () => this.props.dispatchHandler(option);
//        }
//        return this._clickHandlerCache[key];
//    }

//    // Bound a mousedown event listener to the doc, and if the target is the button or immediate child, toggle open - otherwise set !open if open
//    private handleClick = (e: MouseEvent): void => {
//        if (this._buttonRef.current && this._buttonRef.current.contains(e.target as HTMLElement)) {
//            this.toggleOpenState(!this.state.open);
//        } else if (this.state.open) {
//            this.toggleOpenState(false);
//        }
//    }

//    private keyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
//        if (e.keyCode === 38 || e.keyCode === 40) {
//            // up and down keys
//            e.preventDefault();
//            this.toggleOpenState(!this.state.open);
//        } else if (e.keyCode === 27) {
//            // Esc key
//            this._buttonRef.current!.focus();
//            this.toggleOpenState(false);
//        } else if (e.keyCode === 9) {
//            // Tab key
//            this.toggleOpenState(false);
//        }
//    }
//}