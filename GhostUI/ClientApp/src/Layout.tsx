import { Footer, Navbar, Settings } from './components';
import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<unknown>;

const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;