import React, { Fragment, ReactNode } from 'react';
import { Footer, NavBar, Settings } from './components';

type LayoutProps = {
  readonly children?: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Fragment>
    <NavBar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);