import * as React from 'react';

type DropdownProps = {
    options: any[];
    placeholder?: string;
    disabled?: boolean;
    buttonClass?: string;
    parentClass?: string;
    labelKey?: string;
    selectedOptionLabel?: string;
    dispatchHandler: Function;
};

type DropdownState = typeof initialState;

const initialState = Object.freeze({
    open: false
});

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
    static defaultProps = {
        labelKey: 'label',
        parentClass: '',
        buttonClass: '',
        placeholder: ''
    };

    private readonly _buttonRef: React.RefObject<HTMLButtonElement>;
    private readonly _dropdownDivRef: React.RefObject<HTMLDivElement>;

    constructor(props: DropdownProps) {
        super(props);
        this.state = initialState;
        this._buttonRef = React.createRef<HTMLButtonElement>();
        this._dropdownDivRef = React.createRef<HTMLDivElement>();
    }

    public componentDidMount(): void {
        document.addEventListener('click', this.handleClick, false);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('click', this.handleClick, false);
    }

    public render(): React.ReactNode {
        return (
            <div className={`dropdown ${this.props.parentClass} ${this.state.open ? 'is-active' : ''}`}>
                <button className={`button ${this.props.buttonClass}`}
                        type='button'
                        disabled={this.props.disabled}
                        ref={this._buttonRef}
                        onKeyDown={this.keyDownHandler}
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'>
                    <span>{this.props.selectedOptionLabel || this.props.placeholder}</span>
                    <span className='caret-select'></span>
                </button>
                <div className='dropdown-menu'
                     role='menu'
                     ref={this._dropdownDivRef}>
                    <ul className='dropdown-content'>
                        { this.props.options.map((option: any, index: number) => this.renderListOption(option, index)) }
                    </ul>
                </div>
            </div>
        );
    }

    private renderListOption(option: any, index: number): React.ReactNode {
        const optionLabel = this.getOptionLabelName(option);
        return (
            <li key={index}>
                <a role='button'
                   className={`dropdown-item ${optionLabel === this.props.selectedOptionLabel ? 'selected-option' : ''}`}
                   onClick={() => { this.props.dispatchHandler(option); }}>
                      { optionLabel }
                </a>
            </li>
        );
    }

    private toggleOpenState(): void {
        this.setState({
            open: !this.state.open
        });
    }

    private setOpenStateFalse(): void {
        this.setState({
            open: false
        });
    }

    private get isArrayOfObjects(): boolean {
        return this.props.options && (this.props.options[0] === Object(this.props.options[0]));
    }

    private getOptionLabelName(option: any): string {
        return this.isArrayOfObjects ? (option[this.props.labelKey!] || option[0]) : option;
    }

    private handleClick: { (e: MouseEvent): void } = (e: MouseEvent) => {
        // Bound a mousedown event listener to the doc, and if the target is the button or immediate child, toggle open - otherwise set !open if open
        if (this._buttonRef.current && this._buttonRef.current.contains(e.target as HTMLElement)) {
            this.toggleOpenState();
        } else if (this.state.open) {
            this.setOpenStateFalse();
        }
    }

    private keyDownHandler: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (e.keyCode === 38 || e.keyCode === 40) { // up and down keys
            this.toggleOpenState();
            e.preventDefault();
        } else if (e.keyCode === 27) { // Esc key
            this._buttonRef.current!.focus();
            this.setOpenStateFalse();
        } else if (e.keyCode === 9 && this.state.open) { // Tab key
            this.setOpenStateFalse();
        }
    }
}