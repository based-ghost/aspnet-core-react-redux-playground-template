import React, { Fragment } from 'react';
import Footer from '../footer/Footer';
import { NavBar, Settings } from '../nav';

const AppLayout: React.FC<{}> = (props) => (
  <Fragment>
    <NavBar />
    <Settings />
    {props.children}
    <Footer />
  </Fragment>
);

export default AppLayout;