import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastifyMsg = (message: string, icon: string = 'info'): React.ReactNode => (
    <div>
        <span className='icon' style={_toastIconStyle}>
            <FontAwesomeIcon icon={icon as IconProp} />
        </span>
        <span style={_toastMsgStyle}>{message}</span>
    </div>
);

const _toastIconStyle: React.CSSProperties = {
    fontSize: '1.25rem'
};

const _toastMsgStyle: React.CSSProperties = {
    marginLeft: '.4rem',
    fontSize: '1.1rem'
};
