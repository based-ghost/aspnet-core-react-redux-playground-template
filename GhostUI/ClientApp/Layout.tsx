import React, { Fragment, ReactNode } from 'react';
import { Footer, Navbar, Settings } from './components';

type LayoutProps = {
  readonly children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);