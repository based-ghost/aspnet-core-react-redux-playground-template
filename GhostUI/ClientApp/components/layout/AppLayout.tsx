import React, { Fragment, ReactNode } from 'react';
import Footer from '../footer/Footer';
import { NavBar, Settings } from '../nav';

type AppLayoutProps = {
  readonly children?: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <Fragment>
    <NavBar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default AppLayout;