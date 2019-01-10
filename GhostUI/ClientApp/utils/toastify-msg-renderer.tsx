import * as React from 'react';

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastContent = (msg: string, icon?: string): React.ReactNode => (
    <div>
        <span className='icon' style={_iconStyle}>
            <i className={`fa ${icon || _defaultIcon}`}></i>
        </span>
        <span style={_msgStyle}>{msg || ''}</span>
    </div>
);

const _defaultIcon: string = 'fa-info';

const _iconStyle: React.CSSProperties = {
    fontSize: '1.75rem'
};

const _msgStyle: React.CSSProperties = {
    marginLeft: '.65rem',
    fontSize: '1.1rem'
};
