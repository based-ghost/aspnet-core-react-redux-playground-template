import React, { Fragment, ReactNode } from 'react';
import Footer from '../footer/Footer';
import { NavBar, Settings } from '../nav';

const AppLayout: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <Fragment>
    <NavBar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default AppLayout;