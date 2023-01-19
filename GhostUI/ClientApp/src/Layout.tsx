import { Footer, Navbar, Settings } from './components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;