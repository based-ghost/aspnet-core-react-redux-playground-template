import React, { Fragment, ReactNode } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Settings from './Settings';

type LayoutProps = {
  readonly children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Fragment>
    <NavBar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;