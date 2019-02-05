import * as React from 'react';
import { toastContent } from '../config/constants';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Function that returns a JSX.Element - referenced in toastify methods to format messages with icon
 */
export const renderToastContent = (message: string, icon: string = toastContent.DEFAULT_ICON): React.ReactNode => (
    <div>
        <span className='icon' style={toastContent.ICON_STYLE}>
            <FontAwesomeIcon icon={icon as IconProp} />
        </span>
        <span style={toastContent.MSG_STYLE}>{message}</span>
    </div>
);
