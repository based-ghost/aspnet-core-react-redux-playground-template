import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToastifyMsg = styled.div`
  span { font-size: 1.075rem; }
  svg {
    font-size: 1.25rem;
    margin: 0 .75rem 0 .5rem;
  }
`;

const renderToastifyMsg = (message: string, icon?: IconProp): ReactNode => (
  <ToastifyMsg>
    {icon && <FontAwesomeIcon icon={icon} />}
    <span>{message}</span>
  </ToastifyMsg>
);

export {
  renderToastifyMsg
};