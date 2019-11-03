import React, { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderToastifyMsg = (message: string, icon: string = 'info'): ReactNode => (
  <div className='toastify-msg'>
    <FontAwesomeIcon icon={icon as IconProp} />
    <span>{message}</span>
  </div>
);

export const isNullOrUndefined = (test: any): boolean => (test === null || test === undefined);
export const isArrayWithLength = (test: any): boolean => (Array.isArray(test) && !!test.length);