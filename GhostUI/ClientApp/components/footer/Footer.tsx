import * as React from 'react';
import { FOOTER_TEXT } from '../../config/constants';

const Footer: React.SFC<{}> = () => (
    <div id='app-footer'>
        <div>{FOOTER_TEXT}</div>
    </div>
);

export default Footer;