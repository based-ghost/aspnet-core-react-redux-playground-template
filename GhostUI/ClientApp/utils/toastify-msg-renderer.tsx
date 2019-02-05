import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toastDefaultIcon, toastIconStyle, toastMsgStyle } from '../config/constants';

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastContent = (msg: string, icon?: string): React.ReactNode => (
    <div>
        <span className='icon' style={toastIconStyle}>
            <FontAwesomeIcon icon={(icon || toastDefaultIcon) as IconProp} />
        </span>
        <span style={toastMsgStyle}>{msg || ''}</span>
    </div>
);
