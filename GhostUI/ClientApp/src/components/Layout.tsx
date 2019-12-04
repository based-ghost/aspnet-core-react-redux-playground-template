import React, { Fragment } from 'react';
import { Footer, Navbar, Settings } from '.';

const Layout: React.FC = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;