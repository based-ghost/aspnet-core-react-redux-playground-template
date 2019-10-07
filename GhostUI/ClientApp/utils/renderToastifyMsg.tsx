import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderToastifyMsg = (message: string, icon: string = 'info'): JSX.Element => (
  <div className='toastify-msg'>
    <FontAwesomeIcon icon={icon as IconProp} />
    <span>{message}</span>
  </div>
);
