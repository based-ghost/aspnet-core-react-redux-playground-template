import React, { Fragment } from 'react';
import { Footer, Navbar, Settings } from './components';

const Layout: React.FC = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;