import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastContent = (msg: string, icon?: string): React.ReactNode => (
    <div>
        <span className='icon' style={_iconStyle}>
            <FontAwesomeIcon icon={(icon || _defaultIcon) as IconProp} />
        </span>
        <span style={_msgStyle}>{msg || ''}</span>
    </div>
);

const _defaultIcon: string = 'info';

const _iconStyle: React.CSSProperties = {
    fontSize: '1.5rem'
};

const _msgStyle: React.CSSProperties = {
    marginLeft: '.65rem',
    fontSize: '1.1rem'
};
