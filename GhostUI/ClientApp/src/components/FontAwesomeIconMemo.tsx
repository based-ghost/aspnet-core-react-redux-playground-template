import React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

/**
 * FontAwesomeIcon component wrapped in React.memo().
 * FontAwesomeIcon component is typically not the cheapest to rerender.
 */
const FontAwesomeIconMemo = React.memo<FontAwesomeIconProps>((props) => (
  <FontAwesomeIcon {...props} />
));

FontAwesomeIconMemo.displayName = 'FontAwesomeIconMemo';

export default FontAwesomeIconMemo;
