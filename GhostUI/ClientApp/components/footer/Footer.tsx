import * as React from 'react';
import { FOOTER_TEXT } from '../../config/constants';

const Footer: React.SFC<{}> = () => (
    <footer className='footer'>
        <hr />
        <div className='content has-text-centered'>
            {FOOTER_TEXT}
        </div>
    </footer>
);

export default Footer;