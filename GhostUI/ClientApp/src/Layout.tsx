import { Fragment, type FunctionComponent } from 'react';
import { Footer, Navbar, Settings } from './components';

const Layout: FunctionComponent = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;