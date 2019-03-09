import * as React from 'react';
import Footer from '../components/footer/Footer';
import { NavBar, Settings } from '../components/nav';

const Layout: React.FC<{}> = (props) => (
    <React.Fragment>
        <NavBar />
        <Settings />
        { props.children }
        <Footer />
    </React.Fragment>
);

export default Layout;