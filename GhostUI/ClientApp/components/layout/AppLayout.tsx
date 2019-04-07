import React from 'react';
import Footer from '../footer/Footer';
import { NavBar, Settings } from '../nav';

const AppLayout: React.FC<{}> = (props) => (
    <React.Fragment>
        <NavBar />
        <Settings />
        {props.children}
        <Footer />
    </React.Fragment>
);

export default AppLayout;