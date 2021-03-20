import { Fragment } from 'react';
import { Footer, Navbar, Settings } from './components';

import type { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({ children }) => (
  <Fragment>
    <Navbar />
    <Settings />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;