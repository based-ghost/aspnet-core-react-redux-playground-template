import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * react-toastify npm package constant values for building the inner message html
 */
const _toastDefaultIcon: string = 'info';

const _toastIconStyle: React.CSSProperties = {
    fontSize: '1.25rem'
};

const _toastMsgStyle: React.CSSProperties = {
    marginLeft: '.4rem',
    fontSize: '1.1rem'
};

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastContent = (message: string, icon: string = _toastDefaultIcon): React.ReactNode => (
    <div>
        <span className='icon' style={_toastIconStyle}>
            <FontAwesomeIcon icon={icon as IconProp} />
        </span>
        <span style={_toastMsgStyle}>{message}</span>
    </div>
);
