import * as React from 'react';
import Footer from '../footer/Footer';
import { NavBar, Settings } from '../nav';

const AppLayout: React.FC<{}> = (props) => (
  <>
    <NavBar />
    <Settings />
    {props.children}
    <Footer />
  </>
);

export default AppLayout;