import React, { CSSProperties } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const msgStyle: CSSProperties = {
    marginLeft: '.4rem',
    fontSize: '1.1rem'
};

const iconStyle: CSSProperties = {
    fontSize: '1.25rem'
};

export const renderToastifyMsg = (message: string, icon: string = 'info'): React.ReactNode => (
    <div>
        <span className='icon' style={iconStyle}>
            <FontAwesomeIcon icon={icon as IconProp} />
        </span>
        <span style={msgStyle}>{message}</span>
    </div>
);
