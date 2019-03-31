import React from 'react';

const Footer: React.FC<{}> = () => (
    <footer className='footer'>
        <hr />
        <div className='content has-text-centered'>&copy; 2019 based-ghost LLC</div>
    </footer>
);

export default React.memo(Footer);